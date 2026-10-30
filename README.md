# Miracle 的技术手记

基于 Hexo + Stellar 的中文技术博客，部署到 **https://leng125172-code.github.io/**。

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
- `_config.stellar.yml`：主题与导航。
- `source/_posts/`：文章。
- `source/about/`：关于我。
- `source/projects/`：公开项目。
- `source/images/`：本地静态资源。

首页头像来自本人 GitHub 公开头像的本地副本，插画均为内置 imagegen 生成的原创二次元场景。评论与访客统计暂未接入外部服务。

## 参考

- [Hexo](https://hexo.io/)
- [Stellar](https://xaoxuu.com/wiki/stellar/)
- [GitHub Pages](https://docs.github.com/en/pages)

## 星空主题与特效

背景位于 `source/images/anime-skyline.png`。首页首屏的 Canvas 星光、闪烁与流星由 `source/js/atmosphere.js` 提供，不显示悬浮开关。尊重系统减少动画偏好；滚出首屏或页面隐藏时暂停，手机减少粒子数。侧栏底部保留 GitHub、RSS 文字链接及 Stellar 自带的唯一设置入口。

生成方式：内置 imagegen。提示词概要：宽幅二次元星空未来城市，右侧白发成年少女背影，靛蓝与薰衣草紫光影，中央留出标题空间，无文字、无水印。

## 独立文章封面

两张封面由内置 imagegen 分别生成，保存于 `source/images/covers/`：

- `hello-miracle.png`：暖色日出云海、天空列车与启程的旅人，象征开站。
- `hexo-workflow.png`：青蓝雨夜城市窗景、动漫开发工作台与小机器人，呼应构建与部署。

侧栏背景保留星空城市，文章封面通过各篇 Front Matter 的 `cover` 单独指定。

## 首页全屏封面

首页使用 Stellar 原生 `site-cover` 区域：`scripts/home-cover.js` 只在构建后的根首页填入全屏介绍，向下滚动进入原生文章列表。首屏文案、三个入口与技术方向卡片在该脚本中维护，样式位于 `source/css/custom.css`。封面复用现有原创星空插画，文章仍使用各自的独立封面。主题依赖源码无需修改。
