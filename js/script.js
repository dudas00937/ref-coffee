<script>
      
    const container = document.getElementById('carrossel');
    const content = document.getElementById('heroImagens');

    const clone= content.cloneNode(true);
    container.appendChild(clone);

     let scrollY = 0;
     const velocidade = 0.7;

    function scrollInfinito() {
    scrollY += velocidade;
    container.scrollTop = scrollY;
    
    if (scrollY >= content.scrollHeight) {
      scrollY = 0;
    }

    requestAnimationFrame(scrollInfinito);
  }

  scrollInfinito();
</script>
