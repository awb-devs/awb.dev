document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let lastTime = 0;
  let lastTime2 = 0;

  let partials = [
    { frequency: 0.01, phase: 0, amplitude: 5, fade: false },
  ]

  function getCSSColor(varName) {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(varName).trim();
    return color;
  }

  const colors = [
    getCSSColor('--ctp-red'),
    getCSSColor('--ctp-maroon'),
    getCSSColor('--ctp-peach'),
    getCSSColor('--ctp-yellow'),
    getCSSColor('--ctp-green'),
    getCSSColor('--ctp-teal'),
    getCSSColor('--ctp-sky'),
    getCSSColor('--ctp-sapphire'),
    getCSSColor('--ctp-blue'),
    getCSSColor('--ctp-lavender'),
    getCSSColor('--ctp-mauve'),
    getCSSColor('--ctp-pink'),
    getCSSColor('--ctp-flamingo'),
    getCSSColor('--ctp-rosewater')
  ];

  const fmin = 0.005;
  const fmax = 0.4;
  const pmin = 0;
  const pmax = 0.0001;


  function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    const deltaTime2 = currentTime - lastTime2;
    if (deltaTime > 100) {
      lastTime = currentTime;
      let amp = 0.1
      partials.push({ frequency: Math.random() * (fmax - fmin) + fmin, phase: 0, amplitude: amp, fade: false })
    }
    if (deltaTime2 > 10) {
      lastTime2 = currentTime;
      if (partials.length > 3) {
        for (let i = 0; i < Math.floor(partials.length / 2); i++) {
          partials[i].amplitude -= 0.1
        }
        for (let i = Math.floor(partials.length / 2); i < partials.length; i++) {
          partials[i].amplitude += 0.1
        }
      }
      partials = partials.filter(partial => partial.amplitude >= 0.1);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x++) {
      let y = 0;

      for (let partial of partials) {
        partial.frequency += (Math.random() * (fmax - fmin) + fmin) * 0.000001;
        partial.phase += (Math.random() * (pmax - pmin) + pmin);
        partial.phase += 0.00003;
        y += partial.amplitude * Math.sin(partial.frequency * x + partial.phase);
      }

      ctx.lineTo(x, y + canvas.height / 2);
    }

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();


    requestAnimationFrame(animate);
  }

  animate();

});
