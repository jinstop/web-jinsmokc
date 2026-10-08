#!/usr/bin/env node
/**
 * 为指定版本创建 GitHub Release。
 *
 * 发布说明自动从 修改记录.md 中抽取对应版本的章节，保证 Release 与
 * 仓库内的变更记录始终一致，不需要在两处重复维护内容。
 *
 * 用法：
 *   GH_TOKEN=<token> node scripts/release.mjs v1.2.1
 *   GH_TOKEN=<token> node scripts/release.mjs v1.2.1 --dry-run
 *
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
    // 去掉记录尾部的分隔线
    .replace(/\n---\s*$/, '')
    // 把记录里的小标题降一级，避免与 Release 标题冲突
    .replace(/^### /gm, '#### ')
    .trim();
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const version = args.find((a) => !a.startsWith('--'));

  if (!version) {
    console.error('用法: node scripts/release.mjs vX.Y.Z [--dry-run]');
    process.exit(1);
  }

  const body = extractSection(version);
  if (!body) {
    console.error(
      `未在 ${CHANGELOG} 中找到版本 ${version} 的记录。请先补写变更记录。`,
    );
    process.exit(1);
  }

  // Release 标题取记录中的「类型」字段
  const typeMatch = body.match(/\*\*类型\*\*：(.+)/);
  const name = typeMatch
    ? `${version} — ${typeMatch[1].trim()}`
    : version;

  if (dryRun) {
    console.log(`[dry-run] tag : ${version}`);
    console.log(`[dry-run] name: ${name}`);
    console.log(`[dry-run] body:\n${body}`);
    return;
  }

  const token = process.env.GH_TOKEN;
  if (!token) {
    console.error('缺少 GH_TOKEN 环境变量。需要具备 repo 权限的令牌。');
    process.exit(1);
  }

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/releases`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'release-script',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag_name: version,
        name,
        body,
        draft: false,
        prerelease: false,
      }),
    },
  );

  const json = await res.json();
  if (res.status === 201) {
    console.log(`OK   ${version}  ->  ${json.html_url}`);
  } else {
    console.error(`FAIL ${version}  HTTP ${res.status}  ${json.message ?? ''}`);
    if (json.errors) console.error('     ', JSON.stringify(json.errors));
    process.exit(1);
  }
}

main();
