<!-- /js/starfield.js -->
<script>
(function initStarfield(){
  // Create or reuse the canvas
let canvas = document.getElementById('starfield');
if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    document.body.prepend(canvas);
  }
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  canvas.style.background = '#020617';

  const ctx = canvas.getContext('2d');
  const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

  function resize(){
    const { innerWidth:w, innerHeight:h } = window;
    canvas.width  = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  const NUM_STARS = 220;
  const stars = Array.from({length: NUM_STARS}).map(() => ({
    x: Math.random() * canvas.width / DPR,
    y: Math.random() * canvas.height / DPR,
    r: Math.random() * 1.6,           // <-- your code had a typo `1,6`
    s: Math.random() * 0.5 + 0.2
  }));

  (function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    for (const st of stars) {
      ctx.globalAlpha = 0.6 + Math.sin((st.x + st.y + performance.now()/700)) * 0.25;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
      st.y += st.s;
      if (st.y > canvas.height / DPR) {
        st.y = 0;
        st.x = Math.random() * canvas.width / DPR;
      }
    }
    requestAnimationFrame(loop);
  })();
})();
</script>

