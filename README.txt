Ejercicio 1 - Prueba de Carga con k6

Descripción:
Script de carga para el endpoint de login proporcionado en el ejercicio.

Contenido del repositorio:
- scripts/test-login.js  : Script k6 para ejecutar la prueba.
- data/credentials.csv   : CSV con los pares user,password.
- README.txt             : Instrucciones de ejecución.
- conclusions.txt        : Hallazgos y conclusiones (llenar tras ejecución).

Requisitos de software:
- k6 instalado (recomendado v0.45.0 o superior).
- Git (para subir a GitHub).

Instrucciones de ejecución (Windows):
1) Abrir PowerShell en la carpeta del repo (ej: C:\Users\User\Desktop\K6).

2) Ejecutar la prueba (exporta un resumen JSON):

```powershell
k6 run scripts/test-login.js --summary-export=summary.json
```

El script usa el executor `constant-arrival-rate` para alcanzar 20 TPS.

3) Revisar el resumen:
- `summary.json` contiene métricas y contadores.
- Para ver un resumen breve en consola, revisar la salida del comando anterior.

Notas sobre thresholds:
- `http_req_duration` p95 debe ser < 1500 ms.
- `http_req_failed` (rate) debe ser < 0.03 (3%).

Generar reporte HTML (opcional):
- k6 no incluye un generador HTML nativo en todas las versiones; se pueden usar herramientas externas para convertir `summary.json` a HTML o visualizarlo en herramientas como Grafana.

Subir a GitHub:
```powershell
git init
git add .
git commit -m "Ejercicio 1 - k6 login load test"
# crear repo público en GitHub y seguir instrucciones para push
```

Contacto:
- Si quieres, puedo ejecutar el script localmente (si me das permiso) y generar `summary.json` y `conclusions.txt`.

Resultados y artefactos generados:
- `results_terminal.png`: captura de la terminal con el resumen/ejecución del test (si fue tomada).
- `summary.json`: resumen exportado por k6 con todas las métricas (se genera al ejecutar con `--summary-export=summary.json`).
- `conclusions.txt`: informe con hallazgos y recomendaciones (este archivo).

Revisión de resultados:
- Revisar primero la captura de la terminal `results_terminal.png` para ver el estado y cualquier mensaje de thresholds en caliente.
- Abrir `summary.json` para examinar métricas clave: `http_req_duration` (p95), `http_req_failed`, `http_reqs` (rate), `checks` y `vus_max`.
- Consultar `conclusions.txt` para el análisis consolidado y recomendaciones adicionales.