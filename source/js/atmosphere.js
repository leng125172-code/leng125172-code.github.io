/* Original lightweight canvas atmosphere. No external runtime dependencies. */
(() => {
  'use strict';
  if (document.getElementById('miracle-atmosphere')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 600px)');
  const canvas = document.createElement('canvas');
  canvas.id = 'miracle-atmosphere';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const toggle = document.createElement('button');
  toggle.id = 'miracle-effects-toggle';
  toggle.type = 'button';
  toggle.title = '切换流星、浮光与点击星屑';
  document.body.append(canvas, toggle);
  let enabled = true;
  try { enabled = localStorage.getItem('miracle-effects') !== 'off'; } catch (_) { /* Storage is optional. */ }
  let width = 0, height = 0, raf = 0, last = 0, nextMeteor = 0;
  let stars = [], sparks = [], meteor = null;
  const prefersReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active = () => enabled && !prefersReduced() && !document.hidden;
  const random = (a, b) => a + Math.random() * (b - a);
  function resize() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({length: mobile.matches ? 14 : 38}, () => ({x: random(0,width),y: random(0,height),r: random(.6,1.8),phase:random(0,7),speed:random(.2,.6)}));
    sparks = []; meteor = null;
  }
  function draw(time) {
    if (!active()) { raf = 0; return; }
    raf = requestAnimationFrame(draw);
    if (time - last < 33) return;
    const dt = Math.min((time - (last || time)) / 16.67, 3); last = time;
    ctx.clearRect(0,0,width,height);
    stars.forEach(s => {
      s.y -= s.speed * dt; if (s.y < -5) s.y = height+5;
      const alpha = .15 + (Math.sin(time*.0008+s.phase)+1)*.18;
      ctx.fillStyle = `rgba(191,207,255,${alpha})`;
      ctx.beginPath();ctx.arc(s.x+Math.sin(time*.0002+s.phase)*12,s.y,s.r,0,Math.PI*2);ctx.fill();
    });
    if (!meteor && time > nextMeteor) {
      meteor = {x: random(width*.25,width*.9),y:random(0,height*.3),age:0};
      nextMeteor = time + (mobile.matches ? 12000 : 7500);
    }
    if (meteor) {
      meteor.x -= 8*dt; meteor.y += 4*dt; meteor.age += dt;
      const gradient=ctx.createLinearGradient(meteor.x,meteor.y,meteor.x+85,meteor.y-42);
      gradient.addColorStop(0,'rgba(222,228,255,.6)'); gradient.addColorStop(1,'rgba(180,172,255,0)');
      ctx.strokeStyle=gradient;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(meteor.x,meteor.y);ctx.lineTo(meteor.x+85,meteor.y-42);ctx.stroke();
      if (meteor.age>75 || meteor.x < -100) meteor=null;
    }
    sparks = sparks.filter(s=>s.life>0);
    sparks.forEach(s=>{
      s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=.035*dt;s.life-=dt;
      ctx.strokeStyle=`rgba(195,171,255,${Math.max(s.life/34,0)})`;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(s.x-3,s.y);ctx.lineTo(s.x+3,s.y);ctx.moveTo(s.x,s.y-3);ctx.lineTo(s.x,s.y+3);ctx.stroke();
    });
  }
  function sync() {
    cancelAnimationFrame(raf); raf=0;last=0;nextMeteor=performance.now()+2000;
    ctx.clearRect(0,0,width,height);
    const reduced = prefersReduced();
    toggle.disabled=reduced;
    toggle.textContent=reduced ? '✧ 静态模式' : `✧ 星空特效：${enabled ? '开' : '关'}`;
    toggle.setAttribute('aria-pressed', String(enabled && !reduced));
    if(active()) raf=requestAnimationFrame(draw);
  }
  toggle.addEventListener('click',()=>{
    enabled=!enabled;
    try {localStorage.setItem('miracle-effects',enabled?'on':'off');} catch (_) { /* Storage is optional. */ }
    sync();
  });
  document.addEventListener('pointerdown',e=>{
    if(!active() || e.button!==0 || e.target.closest('a,button,input,textarea,select,label,.search,.search-dialog,#toggle-menu') || sparks.length>40)return;
    const count=mobile.matches?5:9;
    for(let i=0;i<count;i++)sparks.push({x:e.clientX,y:e.clientY,vx:random(-2.1,2.1),vy:random(-2.7,.8),life:34});
  },{passive:true});
  addEventListener('resize',resize,{passive:true});
  mobile.addEventListener('change',resize);
  reduce.addEventListener('change', () => sync());
  document.addEventListener('visibilitychange',sync);
  resize();sync();
})();
