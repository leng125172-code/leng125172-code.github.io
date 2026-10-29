# Miracle 的技术手记

基于 Hexo + Butterfly 的中文技术博客，部署到 **https://leng125172-code.github.io/**。

## 本地运行

需要 Node.js 22+。

```bash
npm ci
npm run server
```

## 写文章

```bash
npx hexo new post "article-slug"
```

编辑 `source/_posts/article-slug.md`，在 Front Matter 中填写标题、日期、分类和标签。

```bash
npm run build
git add source/
git commit -m "docs: publish a post"
git push
```

推送 `main` 后 GitHub Actions 自动构建并部署。部署记录见仓库 **Actions**；GitHub Pages 的发布源应为 **GitHub Actions**。

## 内容与外观

- `_config.yml`：站点元信息。
- `_config.butterfly.yml`：主题与导航。
- `source/_posts/`：文章。
- `source/about/`：关于我。
- `source/projects/`：公开项目。
- `source/images/`：本地静态资源。

首页头像来自本人 GitHub 公开头像的本地副本，封面为本仓库内的原创 SVG。评论与访客统计暂未接入外部服务。

## 参考

- [Hexo](https://hexo.io/)
- [Butterfly](https://butterfly.js.org/)
- [GitHub Pages](https://docs.github.com/en/pages)
