const container = document.getElementById("petals-container");

// Detecta celular
const isMobile = window.innerWidth <= 768;

// Menos pétalas no celular para performance
const TOTAL = isMobile ? 25 : 40;

class Petal {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = "petal";
    this.reset();
    container.appendChild(this.el);
  }

  reset() {
    // posição inicial
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * -window.innerHeight;

    // ⭐ tamanhos menores para celular
    if (isMobile) {
      this.size = Math.random() * 6 + 3; // 3px até 9px
    } else {
      this.size = Math.random() * 12 + 6; // desktop
    }

    // velocidades suaves
    this.speedY = Math.random() * 1.2 + 0.4;
    this.speedX = Math.random() * 0.6 - 0.3;

    // rotação
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 1.5 - 0.75;

    // leve blur para profundidade
    this.blur = Math.random() * 1.2;

    // opacidade
    this.opacity = Math.random() * 0.4 + 0.6;

    // aplicar estilos
    this.el.style.width = this.size + "px";
    this.el.style.height = this.size + "px";
    this.el.style.filter = `blur(${this.blur}px)`;
    this.el.style.opacity = this.opacity;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    this.rotation += this.rotationSpeed;

    // reinicia quando sai da tela
    if (this.y > window.innerHeight) {
      this.reset();
      this.y = -20;
    }

    this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
  }
}

// criar pétalas
const petals = [];
for (let i = 0; i < TOTAL; i++) {
  petals.push(new Petal());
}

// animação
function animate() {
  petals.forEach((p) => p.update());

  requestAnimationFrame(animate);
}

animate();

// reajusta ao girar celular
window.addEventListener("resize", () => {
  petals.forEach((p) => p.reset());
});