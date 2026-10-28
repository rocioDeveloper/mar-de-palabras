const PALABRAS = ["mar","ola","espuma","marea","sal","brisa","arena","coral","ancla","faro",
  "gaviota","horizonte","deriva","oleaje","azul","concha","velero","corriente","bruma","orilla",
  "abismo","nácar","bahía","alga","delfín","muelle","perla","naufragio","isla","viento",
  "estela","salitre","medusa","timón","red","barca","luna","resaca","fondo","calma"];
const FILAS = 9, POR_FILA = 14;

const sea = document.getElementById("sea");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 2. Preparar las palabras: un span por palabra
for (let f = 0; f < FILAS; f++) {
  const fila = document.createElement("div");
  fila.className = "row";
  for (let i = 0; i < POR_FILA; i++) {
    const span = document.createElement("span");
    span.className = "word" + ((f + i) % 3 === 0 ? " it" : "");
    span.textContent = PALABRAS[(f * 7 + i * 3) % PALABRAS.length];
    span.tabIndex = 0;
    span.style.opacity = (1 - f * 0.07).toFixed(2); // más profundo, más tenue
    fila.appendChild(span);
  }
  sea.appendChild(fila);
}
const words = gsap.utils.toArray(".word");

const $ = id => document.getElementById(id);
let ola = null, paused = false;

function opciones() {
  return {
    ease: $("ease").value,
    from: $("from").value,
    amp: Number($("amp").value)
  };
}

function mostrarCodigo(o) {
  $("live").textContent =
`gsap.to(".word", {
  y: -${o.amp}, rotation: 4, duration: 1.4, ease: "${o.ease}",
  stagger: { each: 0.07, grid: "auto", from: "${o.from}", repeat: -1, yoyo: true }
});  // timeScale: ${$("speed").value}`;
}

// 4-6. La ola: tween + stagger + repeat/yoyo + ease
function crearOla() {
  const o = opciones();
  if (ola) ola.kill();
  gsap.set(words, { y: 0, rotation: 0 });
  ola = gsap.to(words, {
    y: -o.amp,
    rotation: 4,
    duration: 1.4,
    ease: o.ease,
    stagger: { each: 0.07, grid: "auto", from: o.from, repeat: -1, yoyo: true }
  });
  ola.timeScale(Number($("speed").value));
  if (paused) ola.pause();
  mostrarCodigo(o);
}

// 7. Timeline de entrada
function entrada() {
  if (ola) ola.kill();
  gsap.set(words, { y: 0, rotation: 0 });
  if (reduce) { mostrarCodigo(opciones()); return; }
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(words, { y: 60, autoAlpha: 0, duration: 1, stagger: { each: 0.008, from: "random" } })
    .from(sea, { backgroundPosition: "0 -200px", duration: 1.5 }, "<")
    .add(crearOla, "-=0.3");
}

// 8. Controles
$("play").addEventListener("click", () => {
  paused = !paused;
  if (ola) paused ? ola.pause() : ola.play();
  $("play").textContent = paused ? "Reanudar" : "Pausar";
});
$("speed").addEventListener("input", e => {
  $("speedVal").textContent = e.target.value + "×";
  if (ola) ola.timeScale(Number(e.target.value));
  mostrarCodigo(opciones());
});
$("amp").addEventListener("input", e => {
  $("ampVal").textContent = e.target.value + "px";
  crearOla();
});
$("ease").addEventListener("change", crearOla);
$("from").addEventListener("change", crearOla);
$("replay").addEventListener("click", entrada);

// 9. Salpicadura
const salpicar = w => gsap.fromTo(w, { scale: 1 },
  { scale: 1.7, color: "#ff8a6b", duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out",
    onComplete: () => gsap.set(w, { clearProps: "color" }) });
words.forEach(w => {
  w.addEventListener("click", () => salpicar(w));
  w.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); salpicar(w); } });
});

if (reduce) { paused = true; $("play").textContent = "Reanudar"; }
entrada();
if (reduce) crearOla();
