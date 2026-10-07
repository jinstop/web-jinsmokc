/**
 * 全站数据集中管理
 * 修改站点信息、导航、社交账号只需改这一个文件。
 */

export const SITE = {
  name: '黎金树',
  title: '黎金树 · 数字营销师',
  tagline: 'B2B 数字营销',
  description:
    '9 年数字营销运营经验，擅长独立站、社媒营销、出海品牌策划与广告营销。实用主义的出海营销与品牌增长解决方案。',
  /** 生产域名，用于 canonical / sitemap */
  url: 'https://www.jins.mokc.top',
  locale: 'zh_CN',
  lang: 'zh-CN',
  author: '黎金树',
  /** Email */
  email: 'jinstop365@gmail.com',
  /** 备案/统计用，无则留空 */
  icp: '',
} as const;

export const NAV = [
  { label: '首页', href: '/' },
  { label: '关于我', href: '/about' },
  { label: '服务', href: '/services' },
  { label: '数字营销笔记', href: '/notes' },
  { label: '联系我', href: '/contact' },
] as const;

export const SOCIAL = [
  { label: '个人博客', href: 'https://www.jins.top', external: true },
  { label: 'Email', href: 'mailto:jinstop365@gmail.com', external: false },
] as const;

/** 首页数据条 */
export const HERO_HIGHLIGHTS = [
  '9年数字营销运营经验',
  '擅长独立站、社媒营销、出海品牌策划和广告营销',
  'AI提效实践者',
] as const;
