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

首页头像来自本人 GitHub 公开头像的本地副本，封面为 AI 生成的原创二次元星空城市插画。评论与访客统计暂未接入外部服务。

## 参考

- [Hexo](https://hexo.io/)
- [Butterfly](https://butterfly.js.org/)
- [GitHub Pages](https://docs.github.com/en/pages)

## 星空主题与特效

背景位于 `source/images/anime-skyline.png`。轻量 Canvas 流星、浮光和点击星屑由 `source/js/atmosphere.js` 提供；左下角可关闭，关闭状态保存在本地。尊重系统减少动画偏好，页面隐藏时暂停，手机减少粒子数。

生成方式：内置 imagegen。提示词概要：宽幅二次元星空未来城市，右侧白发成年少女背影，靛蓝与薰衣草紫光影，中央留出标题空间，无文字、无水印。
