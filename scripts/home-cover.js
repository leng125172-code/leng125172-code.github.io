'use strict';

// Fill Stellar's native cover region on the root homepage only.
// Keep the theme package untouched, so upgrades retain the landing page.
hexo.extend.filter.register('after_generate', async function () {
  const stream = hexo.route.get('index.html');
  if (!stream) return;
  let html = '';
  for await (const chunk of stream) html += chunk.toString();
  if (html.includes('id="miracle-home-cover"')) return;
  const cover = `
<section id="miracle-home-cover" class="miracle-home-cover" aria-labelledby="miracle-cover-title">
  <img class="miracle-cover-image" src="/images/anime-skyline.png" alt="" width="1983" height="793" fetchpriority="high" loading="eager">
  <div class="miracle-cover-shade" aria-hidden="true"></div>
  <div class="miracle-cover-wrap">
    <nav class="miracle-cover-nav" aria-label="首页导航">
      <a class="miracle-cover-brand" href="/">MIRACLE <span>技术手记</span></a>
      <a class="miracle-cover-about" href="/about/">关于我 ↗</a>
    </nav>
    <div class="miracle-cover-grid">
      <div class="miracle-cover-intro">
        <span class="miracle-cover-eyebrow">BUILD · RECORD · SHARE</span>
        <h1 id="miracle-cover-title">把想法做成工具，<br>把实践写成记录。</h1>
        <p>我是 Miracle，在这里记录应用开发、工业视觉与实用工具。<br class="miracle-cover-desktop-break">从一次尝试，到可以回看的技术实践。</p>
        <div class="miracle-cover-actions">
          <a class="miracle-cover-button primary" href="#start">阅读文章 <span aria-hidden="true">↓</span></a>
          <a class="miracle-cover-button" href="/projects/">公开项目 <span aria-hidden="true">↗</span></a>
          <a class="miracle-cover-button" href="https://github.com/leng125172-code" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside class="miracle-cover-card" aria-label="关注的技术方向">
        <div class="miracle-cover-card-title"><span class="miracle-cover-dot" aria-hidden="true"></span>技术与实践<span class="miracle-cover-card-mark">M / 01</span></div>
        <div class="miracle-cover-track"><span class="miracle-track-number">01</span><div><strong>应用开发</strong><span>.NET · Vue · Python</span></div></div>
        <div class="miracle-cover-track"><span class="miracle-track-number">02</span><div><strong>工业视觉</strong><span>OpenCV · 图像处理 · 三维视觉</span></div></div>
        <div class="miracle-cover-track"><span class="miracle-track-number">03</span><div><strong>实用工具</strong><span>Linux · 容器 · AI 辅助开发</span></div></div>
        <a class="miracle-cover-card-link" href="/projects/">看看正在构建什么 <span aria-hidden="true">↗</span></a>
      </aside>
    </div>
    <a class="miracle-cover-scroll" href="#start">向下阅读<span aria-hidden="true">↓</span></a>
  </div>
</section>`;
  const slot = /(<div\b[^>]*\bid="site-cover"[^>]*>)(\s*<\/div>)/;
  if (!slot.test(html)) throw new Error('Stellar homepage cover slot not found');
  hexo.route.set('index.html', html.replace(slot, (_, opening, closing) => opening + cover + closing));
});
