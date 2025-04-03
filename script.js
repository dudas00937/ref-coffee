document.addEventListener('DOMContentLoaded', () => {
    const faixa = document.querySelector('.faixa-carrossel');
    const itens = document.querySelectorAll('.item-carrossel');
    const larguraItem = itens[0].offsetWidth;
    let contadorClones = 0;

    //clone
    itens.forEach(item => {
        const clone = item.cloneNode(true);
        faixa.appendChild(clone);
        contadorClones++;
    });
    
    // velocidadee
    const duracaoBase = 30;
    faixa.style.animationDuration = ${duracaoBase * (contadorClones / itens.length)}s;
    
    // impede o reset por 1 loop
    const duracaoOriginal = faixa.style.animationDuration;

    // reiniciar a animação no final para evitar um salto
    faixa.addEventListener('animationiteration', () => {
        faixa.style.animation = 'none';
        faixa.offsetHeight; // trigger reflow / nao redimensionar a pagina para evitar um refresh
        faixa.style.animation = null;
        faixa.style.animationDuration = duracaoOriginal; // resetar para a duração original
    });

    // pausar a animação como hover
    faixa.addEventListener('mouseover', () => {
        faixa.style.animationPlayState = 'paused';
    });

    // retomar a animação pós hover
    faixa.addEventListener('mouseout', () => {
        faixa.style.animationPlayState = 'running';
    });
});