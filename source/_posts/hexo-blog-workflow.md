---
title: 这个博客如何运行：Hexo、Butterfly 与自动发布
date: 2026-10-29 15:50:00
updated: 2026-10-29 15:50:00
categories:
  - 工程实践
tags:
  - Hexo
  - Butterfly
  - GitHub Pages
  - CI/CD
description: 从 Markdown 源文件到 GitHub Pages，整理这个博客的目录结构、写作方式和发布流程。
cover: /images/cover.svg
---

这个站点采用 **Hexo + Butterfly + GitHub Pages**。文章以 Markdown 保存，页面由 Hexo 构建，发布交给 GitHub Actions。

<!-- more -->

## 组成

| 组件 | 用途 |
| --- | --- |
| Hexo | 将文章、分类与标签生成静态页面 |
| Butterfly | 提供导航、文章卡片、目录和明暗模式 |
| GitHub Actions | 在推送后构建、发布站点 |
| GitHub Pages | 托管生成后的 HTML、CSS 和 JavaScript |

## 本地写作

项目目录为 `leng125172-code.github.io`，需要 Node.js 22 或更高版本。

```bash
npm ci
npx hexo new post "my-first-post"
npm run server
```

文章保存在 `source/_posts/`。文件顶部的 Front Matter 用来配置标题、日期、分类与标签：

```yaml
---
title: 一篇技术记录
date: 2026-10-29 16:00:00
categories:
  - 开发实践
tags:
  - .NET
description: 用一句话说明文章解决的问题。
---
```

本地预览默认地址为 `http://localhost:4000`。

## 发布

```bash
npm run build
git add source/
git commit -m "docs: add a new post"
git push
```

推送到 `main` 后，Actions 使用锁文件安装依赖、构建 `public/` 目录，再部署到 GitHub Pages。构建失败时保留上一次成功发布的站点，可以到仓库的 Actions 页面查看日志。

`public/` 是构建产物，不需要手动提交。

## 维护入口

- `_config.yml`：站点标题、域名、语言和文章路径。
- `_config.butterfly.yml`：主题、导航、侧栏和搜索。
- `source/_posts/`：文章。
- `source/about/`、`source/projects/`：独立页面。
- `.github/workflows/pages.yml`：自动发布流程。

参考：[Hexo 官方部署文档](https://hexo.io/docs/github-pages.html)、[Butterfly 官方文档](https://butterfly.js.org/)。
