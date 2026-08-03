# Plantillas de informes

Documentos de trabajo para los servicios pagados. **No se publican en equinutricion.cl**: la carpeta empieza con guion bajo y GitHub Pages (Jekyll) no copia al sitio las carpetas que parten con `_`.

> Si alguna vez se agrega un archivo `.nojekyll` en la raíz, Jekyll deja de procesar el sitio y esta carpeta **sí** quedaría accesible. Hoy no existe ese archivo.

## El flujo

**Los datos y la ración salen de la app.** No hay planilla de por medio: Luis arma la ración en EquiNutrición, la exporta y la pega en el documento. El documento es solo la parte redactada.

Carpeta en Drive: [EquiNutrición — Informes](https://drive.google.com/drive/folders/1-Si4QJ5SskeZ8LXyvOBmcRFCXtj439iM)

| Documento | Para qué |
|---|---|
| [Revisión de dieta a distancia (v2)](https://docs.google.com/document/d/1Fivop8srJmdpya66ZqJNXHr_-TXH6mMW4bJmSq5CjmY/edit) | El servicio de $10.000. Un caballo. |
| [Auditoría en terreno (v2)](https://docs.google.com/document/d/1R6IGaHV1s9-CKadIMr47ivS1EB3pvxGr7fMJ_A3qqXo/edit) | La visita. Plantel completo. |

### Cómo se usa

1. Arma la ración del caballo en la app y expórtala (PDF o PNG).
2. En Drive, **Archivo → Hacer una copia** del documento que corresponda. Nómbralo con el caso y la fecha.
3. Reemplaza todo lo resaltado en amarillo.
4. Donde hay una caja gris, pega la imagen que exportaste de la app.
5. El **costo es opcional**: si no lo incluyes, borra ese bloque completo.
6. **Archivo → Descargar → PDF**.

Los resaltados amarillos se ven también en el PDF, a propósito: si queda uno sin llenar, salta a la vista antes de mandarlo.

## Archivos de este repo

| Archivo | Qué es |
|---|---|
| `doc-revision-a-distancia.html` | Fuente del documento de revisión. |
| `doc-auditoria-en-terreno.html` | Fuente del documento de terreno. |
| `revision-a-distancia.html` · `auditoria-en-terreno.html` · `informe.css` | Versión anterior para llenar en el editor e imprimir. **Superadas**; se dejan como respaldo sin conexión. |

Las copias del repo son el respaldo versionado. La copia que se usa en el día a día es la de Drive. El conector de Drive solo crea archivos, no los edita: para actualizar una plantilla hay que subir una versión nueva y borrar la anterior a mano.

## Cosas que conviene no cambiar

- **El bloque de alcance** al final de cada documento. Deja claro que es una revisión de alimentación y no un diagnóstico clínico, y que no reemplaza al veterinario tratante. Es lo que mantiene el servicio dentro de lo que corresponde mientras el título esté en curso.
- **La firma**: "Estudiante de Medicina Veterinaria". No debe decir ni sugerir título.
- **La escala de condición corporal**: Henneke 1 a 9, ideal 4 a 6, deporte cerca de 5. Es la que está publicada en `condicion-corporal.html`.

## Pendiente

Las referencias bibliográficas vienen con ejemplos. Armar una vez la lista real por tema — la misma que ya está citada en las guías del sitio — y dejarla fija en los dos documentos.
