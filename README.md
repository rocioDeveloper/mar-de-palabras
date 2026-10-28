# Mar de palabras 

Un mar hecho de palabras que suben y bajan como olas, animado con [GSAP](https://gsap.com/). Cada palabra es una gota; GSAP las mueve una tras otra con un pequeño retraso, y ese retraso es lo que dibuja la ola. Si tocas una palabra, salpica.

Es un proyecto de aprendizaje: la página misma trae la explicación paso a paso de cómo esta hecha.

## Qué vas a ver

- Unas 9 filas de palabras del mar ondulando.
- Controles para pausar, cambiar la velocidad, el *ease*, desde donde arranca la ola y su altura.
- Un botón para repetir la entrada en escena.
- La lección "Cómo esta hecho", con el código de cada paso.

## Qué se aprende con GSAP

1. Cargar GSAP
2. Preparar las palabras (un `span` por palabra)
3. El tween: `gsap.to()`, la pieza básica
4. `stagger`: el retraso que hace la ola
5. `repeat` y `yoyo`: que no pare
6. `ease`: el carácter del movimiento
7. `timeline`: la entrada en escena
8. Controlar la animación (pausa, velocidad, reinicio)
9. Bonus: la salpicadura al hacer clic

Referencia: [cheatsheet de GSAP](https://gsap.com/cheatsheet/).

## Cómo verlo

No hace falta instalar nada. Descargalo clona el repositorio y abre `index.html` en el navegador.

```bash
git clone https://github.com/TU-USUARIO/mar-de-palabras.git
cd mar-de-palabras
# abre index.html con doble clic
```

Para verlo online, activa **GitHub Pages** en *Settings ->Pages -> Branch: main / (root)*.

## Estructura

```
mar-de-palabras/
	-> index.html      # la página y la lección
	-> css/estilos.css # colores, tipografías, modo claro/oscuro
	-> js/mar.js      # las palabras y todas las animaciones GSAP
	README.md
```

## Tecnologías

- HTML, CSS y JavaScript sin frameworks
- [GSAP 3.12.5](https://gsap.com/) desde CDN
- TipografÃ­as de Google Fonts: Instrument Serif, Bricolage Grotesque, Literata y JetBrains Mono

Respeta `prefers-reduced-motion`: si tu sistema pide menos movimiento, la ola arranca en pausa.

## Proximamente

- Versión personalizable: tus propias palabras y colores.
- Versión Fibonacci: las palabras ordenadas en espiral de girasol con el Ã¡ngulo Ã¡ureo.

---


