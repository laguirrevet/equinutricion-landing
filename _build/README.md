# _build/ — las partes repetidas del sitio

El `<head>`, el `<nav>` y el `<footer>` son el mismo bloque en las 9 páginas.
Antes estaban copiados a mano, y ya se habían desincronizado: las 7 guías
habían perdido el enlace a **"Quiénes somos"** y enlazaban *La app* donde la
portada enlazaba *Cómo se usa*. Nadie lo hizo mal — es lo que pasa cuando el
mismo bloque se mantiene en nueve lugares.

Ahora cada bloque vive una sola vez, acá.

## Uso

```sh
node _build/build.js           # escribe los cambios en las 9 páginas
node _build/build.js --check   # no escribe; falla si algo quedó desfasado
```

Sin dependencias: Node puro, nada que instalar.

## Cómo cambiar algo

| Qué quieres cambiar | Dónde se toca |
|---|---|
| Un enlace del menú | `partials/nav.html` |
| Un enlace del pie | `partials/footer.html` |
| El ID de Analytics, las fuentes, el CSS | `partials/head.html` |
| Agregar una página al sitio | `PAGES` en `build.js` |
| La fecha de una página en el sitemap | `lastmod` en `build.js` |

Después de tocar cualquiera de esos, **corre el build**. Si no, el cambio no
llega a las páginas.

## Lo que NO hay que hacer

**No editar el nav, el head ni el footer directo en los `.html`.** Esos bloques
están entre marcas:

```html
<!-- build:nav · generado por _build/build.js — no editar acá -->
   ...
<!-- /build:nav -->
```

Lo que quede ahí adentro lo sobrescribe la próxima corrida, sin avisar. El
cambio va en `partials/`.

## Detalles que conviene saber

**Por qué la carpeta empieza con `_`.** GitHub Pages corre Jekyll, y Jekyll no
publica las carpetas que empiezan con guion bajo — igual que `_plantillas/`.
Por eso el build no se sube al sitio. **Si algún día alguien agrega un archivo
`.nojekyll` a la raíz, eso deja de ser cierto** y `_build/` pasaría a servirse
públicamente.

**El `lastmod` del sitemap es a mano, a propósito.** Se podría sacar de git,
pero entonces cualquier commit de mantención pondría "hoy" en las 9 páginas sin
que el lector vea nada distinto. Un `lastmod` que miente es un `lastmod` que
Google termina ignorando. Se sube la fecha cuando cambia el *contenido* de una
página, no cuando se toca el andamiaje.

**La salida sigue siendo HTML plano en la raíz.** Mismas rutas, mismas URLs,
mismo despliegue. GitHub Pages no se entera de que existe un build: no hay paso
de compilación en el servidor y nada se puede romper al publicar.
