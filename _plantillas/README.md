# Plantillas de informes

Documentos de trabajo para los servicios pagados. **No se publican en equinutricion.cl**: la carpeta empieza con guion bajo y GitHub Pages (Jekyll) no copia al sitio las carpetas que parten con `_`.

> Si alguna vez se agrega un archivo `.nojekyll` en la raíz, Jekyll deja de procesar el sitio y esta carpeta **sí** quedaría accesible. Hoy no existe ese archivo.

## Dónde se trabaja de verdad: Google Drive

El flujo real es **planilla + documento**. La planilla calcula, el documento explica.

Carpeta: [EquiNutrición — Informes](https://drive.google.com/drive/folders/1-Si4QJ5SskeZ8LXyvOBmcRFCXtj439iM)

| Archivo en Drive | Para qué |
|---|---|
| [Calculadora de ración y costos](https://docs.google.com/spreadsheets/d/1oVoy4xV9carRkl3QiXIfak-eacuDTAF0mU5cfzg8iwc/edit) | Peso por huincha, requerimiento de MS, ración, control y costos. Sirve para los dos servicios. |
| [Informe — Revisión de dieta a distancia](https://docs.google.com/document/d/1I9iB2KGMm8zdwKaUAhpKWf5z8VXaR3dKgtwIAKvHu94/edit) | La narrativa del servicio de $10.000. Un caballo. |
| [Informe — Auditoría en terreno](https://docs.google.com/document/d/1SaLP3w2_I2eB0GblwKQdVTrTtbJRtFjhOo52TZ0qh2Y/edit) | La narrativa de la visita. Plantel completo. |

### Cómo se usa

1. En Drive, **Archivo → Hacer una copia** de la planilla y del documento que corresponda. Nómbralos con el caso y la fecha.
2. Llena la planilla: solo la columna B de los bloques 1 a 4. Todo lo demás se calcula solo.
3. Mira el **bloque 5**: si la diferencia está lejos de 0, la ración no calza con el requerimiento y hay que ajustarla antes de seguir.
4. Escribe el documento. Donde dice *"Pega aquí el bloque N de la planilla"*, copias el rango y lo pegas.
5. Reemplaza todo lo resaltado en amarillo.
6. **Archivo → Descargar → PDF**.

Los resaltados amarillos se ven también en el PDF, a propósito: si queda uno sin llenar, salta a la vista antes de mandarlo.

## Archivos de este repo

| Archivo | Qué es |
|---|---|
| `calculadora-informe.csv` | Fuente de la planilla. Si la editas acá, hay que volver a subirla a Drive. |
| `doc-revision-a-distancia.html` | Fuente del documento de revisión. |
| `doc-auditoria-en-terreno.html` | Fuente del documento de terreno. |
| `revision-a-distancia.html` · `auditoria-en-terreno.html` · `informe.css` | Versión anterior, para llenar en el editor e imprimir. **Superadas** por las de Drive; se dejan por si sirven de respaldo sin conexión. |

Las copias del repo son el respaldo versionado. La copia que usas en el día a día es la de Drive.

## Cosas que conviene no cambiar

- **El bloque de alcance** al final de cada documento. Deja claro que es una revisión de alimentación y no un diagnóstico clínico, y que no reemplaza al veterinario tratante. Es lo que mantiene el servicio dentro de lo que corresponde mientras el título esté en curso.
- **La firma**: "Estudiante de Medicina Veterinaria". No debe decir ni sugerir título.
- **La fórmula de peso** `(perímetro² × largo) ÷ 11900`, que es la misma que usa la calculadora del sitio y la app. Si cambia en un lado, tiene que cambiar en los tres.
- **Las fórmulas de la planilla usan solo aritmética y `SUM`**, sin funciones de varios argumentos. Es a propósito: Google Sheets cambia el separador de argumentos según el idioma de la cuenta, y así no se rompen.

## Pendiente

- Los valores de % de materia seca del bloque de referencia son orientativos. Vale la pena reemplazarlos por los tuyos cuando tengas análisis de alimento.
- Las referencias bibliográficas vienen con ejemplos. Armar una vez la lista real por tema — la misma que ya está citada en las guías del sitio — y dejarla fija.
