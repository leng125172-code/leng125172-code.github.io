/* Original, dependency-free atmosphere limited to the homepage cover. */
(() => {
  'use strict';
  const hero = document.getElementById('miracle-home-cover');
  if (!hero || hero.querySelector('canvas')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 600px)');
  const canvas = document.createElement('canvas');
  canvas.id = 'miracle-atmosphere';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  hero.prepend(canvas);
  let width = 0, height = 0, raf = 0, last = 0, nextMeteor = 0, visible = false;
  let stars = [], meteors = [];
  const random = (a, b) => a + Math.random() * (b - a);
  const active = () => visible && !reduce.matches && !document.hidden && hero.isConnected;
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({length: mobile.matches ? 42 : 90}, (_, i) => ({
      x: random(0, width), y: random(0, height), r: random(.8, 2),
      phase: random(0, 7), speed: random(.08, .25), glint: i % 7 === 0
    }));
    meteors = [];
  }
  function draw(time) {
    if (!active()) { raf = 0; return; }
    raf = requestAnimationFrame(draw);
    if (time - last < 33) return;
    const dt = Math.min((time - (last || time)) / 16.67, 3); last = time;
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.y -= s.speed * dt; if (s.y < -8) s.y = height + 8;
      const alpha = .4 + (Math.sin(time * .0014 + s.phase) + 1) * .28;
      ctx.fillStyle = `rgba(225,239,255,${alpha})`;
      ctx.shadowColor = '#c0d9ff'; ctx.shadowBlur = s.glint ? 12 : 5;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      if (s.glint) {
        const size = s.r * (2.5 + Math.sin(time * .0014 + s.phase));
        ctx.strokeStyle = `rgba(225,239,255,${alpha * .8})`; ctx.lineWidth = .8;
        ctx.beginPath(); ctx.moveTo(s.x-size,s.y); ctx.lineTo(s.x+size,s.y);
        ctx.moveTo(s.x,s.y-size); ctx.lineTo(s.x,s.y+size); ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;
    if (time > nextMeteor) {
      meteors.push({x: random(width * .35, width), y: random(0, height * .4), age: 0});
      nextMeteor = time + random(2600, mobile.matches ? 5200 : 4000);
    }
    meteors.forEach(m => {
      m.x -= 9 * dt; m.y += 4.5 * dt; m.age += dt;
      const length = Math.min(width * .35, 170);
      const gradient = ctx.createLinearGradient(m.x,m.y,m.x+length,m.y-length/2);
      gradient.addColorStop(0,'rgba(244,249,255,.95)'); gradient.addColorStop(.2,'rgba(185,216,255,.65)'); gradient.addColorStop(1,'rgba(180,172,255,0)');
      ctx.strokeStyle=gradient; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(m.x,m.y); ctx.lineTo(m.x+length,m.y-length/2); ctx.stroke();
    });
    meteors = meteors.filter(m => m.age < 100 && m.x > -180);
  }
  function sync() {
    cancelAnimationFrame(raf); raf = 0; last = 0; nextMeteor = performance.now() + 500;
    ctx.clearRect(0, 0, width, height);
    if (active()) raf = requestAnimationFrame(draw);
  }
  const visibility = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio > 0; sync();
  }, {threshold: [0, .001]});
  const size = new ResizeObserver(() => { resize(); sync(); });
  visibility.observe(hero); size.observe(hero);
  reduce.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  resize();
})();
