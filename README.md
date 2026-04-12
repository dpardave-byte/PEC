# Panel PEC - Drive + Google Sheets

Sitio publico del Programa de Economia Circular. El panel se aloja en GitHub Pages y la informacion viva se administra desde Google Drive y Google Sheets.

URL esperada:

https://dpardave-byte.github.io/PEC/

## Estructura recomendada en Drive

Crear la carpeta raiz `PEC - Programa Economia Circular` con estas subcarpetas:

- `00_Donacion_Preparatoria`
- `01_Efectividad_Prestamo`
- `02_Puno`
- `03_Lima`
- `04_Comparacion_Tecnologias`
- `05_Evidencias`

## Indice maestro en Google Sheets

Crear una hoja llamada `PEC_indice_maestro` usando la plantilla `PEC_indice_maestro_plantilla.csv`.

Columnas esperadas:

```csv
id,edt,actividad,macro_actividad,territorio,categoria,responsable,inicio,final,duracion,estado,alerta,tipo_documento,tecnologia,proveedor,criterio_comparacion,puntaje,url_drive,resumen,tags
```

## Publicar como CSV

1. Abrir la Sheet.
2. Ir a `Archivo > Compartir > Publicar en la web`.
3. Seleccionar la hoja del indice.
4. Elegir formato `Valores separados por comas (.csv)`.
5. Copiar la URL publicada.
6. Pegar la URL en el campo `URL publica CSV/JSON de Google Sheets o Drive` del panel.
7. Presionar `Actualizar desde URL`.

## Notas de seguridad

- Los documentos sensibles deben quedar protegidos por permisos de Drive.
- El panel puede mostrar metadatos y enlaces, pero Drive controla quien puede abrir cada documento.
- No subir documentos pesados al repositorio GitHub; subirlos a Drive y registrar el enlace en `url_drive`.
