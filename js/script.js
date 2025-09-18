document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('carrossel');
  const scrollWrap = document.getElementById('scrollWrap');
  const content = document.getElementById('heroImagens');

  if (!container || !scrollWrap || !content) {
    console.warn('Carrossel: elementos não encontrados (ids).');
    return;
  }

  // Clona o conteúdo (cria segunda cópia para loop contínuo)
  const clone = content.cloneNode(true);
  clone.id = content.id + '_clone';
  scrollWrap.appendChild(clone);

  // Espera imagens carregarem (para medir altura correta)
  const imgs = scrollWrap.querySelectorAll('img');
  const imgPromises = Array.from(imgs).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(res => { img.addEventListener('load', res); img.addEventListener('error', res); });
  });

  Promise.all(imgPromises).then(() => {
    let contentHeight = content.getBoundingClientRect().height;
    let pos = 0;
    const pixelsPerSecond = 35; // ajuste a velocidade aqui (maior = mais rápido)
    let paused = false;
    let lastTime = performance.now();

    // pausar no hover
    container.addEventListener('mouseenter', () => paused = false);
    container.addEventListener('mouseleave', () => paused = false);

    // recalcula altura quando redimensionar
    window.addEventListener('resize', () => {
      contentHeight = content.getBoundingClientRect().height;
      // garante que pos esteja dentro do novo tamanho
      pos = pos % contentHeight;
    });

    function step(now) {
      const dt = now - lastTime;
      lastTime = now;
      if (!paused) {
        pos += pixelsPerSecond * (dt / 1000); // movimento por tempo real
        if (pos >= contentHeight) pos -= contentHeight; // loop sem tranco
        scrollWrap.style.transform = `translateY(-${pos}px)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
});