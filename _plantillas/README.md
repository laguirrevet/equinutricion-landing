# Plantillas de informes

Documentos de trabajo para los servicios pagados. **No se publican en equinutricion.cl**: la carpeta empieza con guion bajo y GitHub Pages (Jekyll) no copia al sitio las carpetas que parten con `_`. Quedan versionadas y respaldadas en el repo, pero fuera del sitio público.

> Si alguna vez se agrega un archivo `.nojekyll` en la raíz, Jekyll deja de procesar el sitio y esta carpeta **sí** quedaría accesible. Hoy no existe ese archivo.

## Archivos

| Archivo | Para qué |
|---|---|
| `revision-a-distancia.html` | Entregable de la revisión de dieta a distancia ($10.000 por caballo). Un caballo por informe. |
| `auditoria-en-terreno.html` | Entregable de la visita en terreno. Plantel completo, con inventario, hallazgos priorizados y costos. |
| `informe.css` | Estilos compartidos por los dos. Tocar acá cambia ambos informes. |

## Cómo se usa

1. Duplica el archivo con el nombre del caso y la fecha: `2026-08-05-relampago.html`, `2026-08-12-criadero-el-maiten.html`.
2. Reemplaza todo lo que esté marcado con `class="x"` (se ve resaltado en amarillo) y borra las filas o secciones que no apliquen.
3. `Ctrl+P` → Guardar como PDF.

La barra negra de instrucciones del comienzo no se imprime. Los resaltados amarillos **sí** se imprimen, a propósito: si queda uno sin llenar, salta a la vista antes de mandar el PDF.

## Cosas que conviene no cambiar

- **El bloque de alcance** (la caja naranja al final). Deja claro que es una revisión de alimentación y no un diagnóstico clínico, y que no reemplaza al veterinario tratante. Es lo que mantiene el servicio dentro de lo que corresponde mientras el título esté en curso.
- **La firma**: "Estudiante de Medicina Veterinaria". No debe decir ni sugerir título.
- **La fórmula de peso** `(perímetro² × largo) ÷ 11900`, que es la misma que usa la calculadora del sitio y la app. Si cambia en un lado, tiene que cambiar en los tres.

## Pendiente

Las referencias vienen con ejemplos de marcador. Vale la pena armar una vez la lista real por tema — la misma bibliografía que ya está citada en las guías del sitio — y dejarla fija en las plantillas, para no rearmarla en cada informe.
