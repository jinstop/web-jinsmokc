#!/usr/bin/env node
/**
 * 为指定版本创建或更新 GitHub Release。
 *
 * 发布说明自动从 修改记录.md 中抽取对应版本的章节，保证 Release 与
 * 仓库内的变更记录始终一致，不需要在两处重复维护内容。
 * 抽取后会回填 Git 章节中的提交号（从远程标签解析），因此无需手工补记。
 *
 * 用法：
 *   GH_TOKEN=<token> node scripts/release.mjs v1.2.2
 *   GH_TOKEN=<token> node scripts/release.mjs v1.2.2 --dry-run
 *
 * 已存在的 Release 会被更新而非报错，可安全重复执行。
 * 令牌只从环境变量读取，不会写入任何文件。需要 repo 权限。
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OWNER = 'jinstop';
const REPO = 'web-jinsmokc';
const CHANGELOG = '修改记录.md';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** 从 修改记录.md 抽取指定版本的章节正文 */
function extractSection(version) {
  const text = readFileSync(join(root, CHANGELOG), 'utf8');
  const lines = text.split('\n');
  const start = lines.findIndex((l) => l.startsWith(`## ${version} `));
  if (start === -1) return null;

  const body = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) break;
    body.push(lines[i]);
  }

  return body
    .join('\n')
    .replace(/\n---\s*$/, '')
    // 记录里的小标题降一级，避免与 Release 标题冲突
    .replace(/^### /gm, '#### ')
    .trim();
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'release-script',
    'Content-Type': 'application/json',
  };
}

async function api(token, path, init = {}) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    ...init,
    headers: headers(token),
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { status: res.status, json };
}

/** 解析标签指向的提交短号，用于回填 Git 章节 */
async function resolveCommit(token, version) {
  const ref = await api(token, `/git/ref/tags/${version}`);
  let sha = ref.json?.object?.sha;
  // 附注标签需再解一层
  if (sha && ref.json?.object?.type === 'tag') {
    const tag = await api(token, `/git/tags/${sha}`);
    sha = tag.json?.object?.sha ?? sha;
  }
  return sha ? sha.slice(0, 7) : null;
}

/** 回填 Git 章节里的占位符 */
function fillGitSection(body, shortSha) {
  let out = body.replace(
    /- Commit：(待推送后补记|待记录)/,
    `- Commit：\`${shortSha ?? '—'}\``,
  );
  out = out.replace(/- Push：(待推送后补记|待记录)/, '- Push：**SUCCESS** → `main`');
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const version = args.find((a) => !a.startsWith('--'));

  if (!version) {
    console.error('用法: node scripts/release.mjs vX.Y.Z [--dry-run]');
    process.exit(1);
  }

  const raw = extractSection(version);
  if (!raw) {
    console.error(
      `未在 ${CHANGELOG} 中找到版本 ${version} 的记录。请先补写变更记录。`,
    );
    process.exit(1);
  }

  const typeMatch = raw.match(/\*\*类型\*\*：(.+)/);
  const name = typeMatch ? `${version} — ${typeMatch[1].trim()}` : version;

  const token = process.env.GH_TOKEN;

  // dry-run 不需要令牌：能解析提交号就带上，不能就跳过
  const shortSha = token ? await resolveCommit(token, version) : null;
  const body = fillGitSection(raw, shortSha);

  if (dryRun) {
    console.log(`[dry-run] tag   : ${version}`);
    console.log(`[dry-run] name  : ${name}`);
    console.log(
      `[dry-run] commit: ${shortSha ?? '(无令牌，未解析 —— 实跑时会从远程标签回填)'}`,
    );
    console.log(`[dry-run] body:\n${body}`);
    return;
  }

  if (!token) {
    console.error('缺少 GH_TOKEN 环境变量。需要具备 repo 权限的令牌。');
    console.error('（仅预览请加 --dry-run，无需令牌）');
    process.exit(1);
  }

  // 已存在则更新，避免重复执行报错
  const existing = await api(token, `/releases/tags/${version}`);
  const payload = JSON.stringify({
    tag_name: version,
    name,
    body,
    draft: false,
    prerelease: false,
  });

  if (existing.status === 200) {
    const res = await api(token, `/releases/${existing.json.id}`, {
      method: 'PATCH',
      body: payload,
    });
    if (res.status === 200) {
      console.log(`UPDATED ${version}  ->  ${res.json.html_url}`);
    } else {
      console.error(`FAIL    ${version}  HTTP ${res.status}  ${res.json?.message ?? ''}`);
      process.exit(1);
    }
    return;
  }

  const res = await api(token, '/releases', { method: 'POST', body: payload });
  if (res.status === 201) {
    console.log(`CREATED ${version}  ->  ${res.json.html_url}`);
  } else {
    console.error(`FAIL    ${version}  HTTP ${res.status}  ${res.json?.message ?? ''}`);
    if (res.json?.errors) console.error('        ', JSON.stringify(res.json.errors));
    process.exit(1);
  }
}

main();
