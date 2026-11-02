#!/usr/bin/env node
// Checks for the Finsplore plugin repo. Node built-ins only: no install, no network.
// Usage: node scripts/check.mjs [manifests|skills|content ...] [--root <dir>]
// With no section it runs all three. Exit code 1 if any check fails.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const rootAt = argv.indexOf('--root');
const root =
  rootAt >= 0 ? argv[rootAt + 1] : join(dirname(fileURLToPath(import.meta.url)), '..');
const wanted = argv.filter((a, i) => !a.startsWith('--') && i !== rootAt + 1);

const SKIP_DIRS = new Set(['.git', 'node_modules']);
const NAMED = [
  'plugin.json',
  '.claude-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.antigravity-plugin/plugin.json',
  'gemini-extension.json',
];
const MCP_FILES = ['mcp.json', '.mcp.json', 'mcp_config.json'];
const MARKETPLACES = ['.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json'];
const JSON_FILES = [...NAMED, ...MCP_FILES, ...MARKETPLACES];

const MAX_SKILLS = 32;
const MAX_FILES = 1000;
const MAX_BYTES = 20 * 1024 * 1024;

const TEXT_EXT = new Set(['.md', '.json', '.yml', '.yaml', '.txt', '.mjs', '.js', '.toml']);
const LEAKS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key id'],
  [/\bsk-[A-Za-z0-9]{20,}/, 'API key (sk-...)'],
  [/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./, 'JWT'],
  [/finsplore-api/i, 'private repo name'],
  [/\.fly\.dev\b/i, 'internal host (fly.dev)'],
  [/\.supabase\.(co|com)\b/i, 'internal host (supabase)'],
  [/\bFIN-\d+\b/, 'Jira key'],
];
const WORDING = [
  [/guarantee[sd]?\s+(returns?|profits?|income|savings?)/i, 'guarantees an outcome'],
  [/risk[- ]free/i, 'risk-free claim'],
  [
    /(?<!not )(?<!n't )(?<!never )\b(moves?|transfers?|sends?|pays?)\s+(your |the |their )?(money|funds)\b/i,
    'says it moves money',
  ],
  [/\byou should (buy|sell|invest)\b/i, 'personal advice'],
  [/\b(we|i) recommend (that you )?(buy|sell|invest)\b/i, 'personal advice'],
];

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
};
const rel = (full) => full.slice(root.length).replace(/^[\\/]+/, '').split('\\').join('/');
const read = (path) => readFileSync(join(root, path), 'utf8');

const parseJson = (path, errors) => {
  try {
    return JSON.parse(read(path));
  } catch (e) {
    errors.push(`${path}: not valid JSON (${e.message})`);
    return undefined;
  }
};

/** Every url, httpUrl and serverUrl inside an mcpServers or servers object. */
const serverUrls = (node, found = []) => {
  if (!node || typeof node !== 'object') return found;
  for (const [key, value] of Object.entries(node)) {
    if ((key === 'mcpServers' || key === 'servers') && value && typeof value === 'object') {
      for (const server of Object.values(value)) {
        for (const k of ['url', 'httpUrl', 'serverUrl']) {
          if (typeof server?.[k] === 'string') found.push(server[k]);
        }
      }
    } else {
      serverUrls(value, found);
    }
  }
  return found;
};

const manifests = () => {
  const errors = [];
  const present = JSON_FILES.filter((p) => existsSync(join(root, p)));
  const parsed = new Map();
  for (const p of present) parsed.set(p, parseJson(p, errors));

  for (const field of ['name', 'version']) {
    const values = new Map();
    for (const p of NAMED) {
      const v = parsed.get(p)?.[field];
      if (typeof v === 'string') values.set(p, v);
    }
    if (new Set(values.values()).size > 1) {
      const list = [...values].map(([p, v]) => `${p}=${v}`).join(', ');
      errors.push(`"${field}" differs across manifests: ${list}`);
    }
  }

  const urls = new Map();
  for (const p of [...NAMED, ...MCP_FILES]) {
    for (const u of serverUrls(parsed.get(p))) {
      urls.set(p + ' -> ' + u, u);
      let ok = false;
      try {
        ok = new URL(u).protocol === 'https:';
      } catch {
        ok = false;
      }
      if (!ok) errors.push(`${p}: MCP URL must be a valid https URL (got "${u}")`);
    }
  }
  if (new Set(urls.values()).size > 1) {
    errors.push(`MCP URL differs across files: ${[...urls.keys()].join('; ')}`);
  }
  const note = present.length ? `${present.length} manifest file(s)` : 'no manifests yet';
  return { errors, note };
};

const front = (text) => {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return undefined;
  const fields = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_-]+):\s*(.*)$/.exec(line);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fields;
};

const skills = () => {
  const errors = [];
  const dir = join(root, 'skills');
  const folders = existsSync(dir)
    ? readdirSync(dir).filter((n) => statSync(join(dir, n)).isDirectory())
    : [];
  if (folders.length > MAX_SKILLS) errors.push(`${folders.length} skills; limit is ${MAX_SKILLS}`);
  for (const folder of folders) {
    const path = `skills/${folder}/SKILL.md`;
    if (!existsSync(join(root, path))) {
      errors.push(`${path}: missing`);
      continue;
    }
    const fm = front(read(path));
    if (!fm) {
      errors.push(`${path}: missing front matter (--- block)`);
      continue;
    }
    if (fm.name !== folder) errors.push(`${path}: name "${fm.name ?? ''}" must equal folder "${folder}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name ?? '') || (fm.name ?? '').length > 64)
      errors.push(`${path}: name must be lowercase-hyphenated, 64 characters or fewer`);
    if (!fm.description) errors.push(`${path}: description is empty`);
  }
  const files = walk(root);
  const bytes = files.reduce((n, f) => n + statSync(f).size, 0);
  if (files.length > MAX_FILES) errors.push(`${files.length} files; limit is ${MAX_FILES}`);
  if (bytes > MAX_BYTES) errors.push(`${(bytes / 1048576).toFixed(1)} MB; limit is 20 MB`);
  return { errors, note: `${folders.length} skill(s), ${files.length} files` };
};

const content = () => {
  const errors = [];
  const files = walk(root).map(rel);
  for (const f of files) {
    const name = basename(f);
    if (/^\.env($|\.)/.test(name) && name !== '.env.example')
      errors.push(`${f}: environment file must not be committed`);
  }
  const userFacing = (f) => f.startsWith('skills/') || JSON_FILES.includes(f);
  for (const f of files) {
    if (f === 'scripts/check.mjs' || f === 'LICENSE' || !TEXT_EXT.has(extname(f))) continue;
    const lines = read(f).split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const [re, what] of LEAKS)
        if (re.test(line)) errors.push(`${f}:${i + 1}: ${what}`);
      if (userFacing(f))
        for (const [re, what] of WORDING)
          if (re.test(line)) errors.push(`${f}:${i + 1}: ${what}`);
    });
  }
  return { errors, note: `${files.length} files scanned` };
};

const SECTIONS = { manifests, skills, content };
const run = wanted.length ? wanted : Object.keys(SECTIONS);
let failed = false;
for (const name of run) {
  if (!SECTIONS[name]) {
    console.error(`Unknown section "${name}". Use: ${Object.keys(SECTIONS).join(', ')}`);
    process.exit(2);
  }
  const { errors, note } = SECTIONS[name]();
  if (errors.length) {
    failed = true;
    console.error(`FAIL ${name} (${note})`);
    for (const e of errors) console.error(`  - ${e}`);
  } else {
    console.log(`ok   ${name} (${note})`);
  }
}
process.exit(failed ? 1 : 0);
