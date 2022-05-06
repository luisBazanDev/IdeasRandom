const tick = () => {
  const circle = document.getElementById('circle');
  const radar = document.createElement('img');
  circle.appendChild(radar);
  radar.style.width = '10%';
  radar.style.height = '10%';
  radar.src = "https://llevatilde.es/imagetexts/2/2b/afuera.png"
  radar.style.position = 'absolute';
  radar.style.top = '45%';
  radar.style.left = '45%';
  radar.style.opacity = '0.5';

  radar.animate([
    {
      transform: 'scale(1)',
      opacity: '0',
    },
    {
      transform: 'scale(1)',
      opacity: '0.5',
    },
    {
      transform: 'scale(10)',
      opacity: '0',
    }
  ], {
    duration: 2000,
    iterations: Infinity,
    easing: 'ease-in-out'
  })
  setTimeout(() => { radar.remove() }, 2000);
}

setInterval(tick, 500);