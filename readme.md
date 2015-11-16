# Servicio de prueba de Instant Article

## Prerequisitos

- Instala node y npm en tu máquina:
  https://nodejs.org/
  * Node debe ser en su versión 10.12 o superior

## Instalar dependencias
- En la carpeta raíz del proyecto: npm install

## Corre el servidor
- En la carpeta raíz del proyecto ejecuta: node app

## Como usarlo
- Abre localhost:3000 en un navegador
- Pásale como query el artículo que quieras pasar a marcado FIA.
- Solo acepta urls de El Mundo. Hay que pasarselas en su versión .json
- Ejemplo: http://localhost:3000/?article=http://www.elmundo.es/espana/2015/11/15/5648ff06ca47412c718b45cc.json
- En la respuesta obtienes un json con los valores del head, del body y del html (marcado completo y válido)
