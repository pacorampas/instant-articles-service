# Servicio de prueba de Instant Article

## Prerequisitos

- Instala node y npm en tu máquina:
  https://nodejs.org/
  * Node debe ser en su versión 10.12 o superior

- Instala grunt: npm install -g grunt-cli
  * http://gruntjs.com/getting-started

## Instalar dependencias
- En la carpeta raíz del proyecto: npm install

## Corre el proyecto
- En la carpeta raíz del proyecto ejecuta: grunt

## Como usarlo
- Crear el RSS de las noticias de la portada de EM
  * localhost:3000/rss

- Crear marcado FIA a través de un JSON de noticia de EM
  * Abre localhost:3000 en un navegador
  * Pásale como query el artículo que quieras pasar a marcado FIA.
  * Solo acepta urls de El Mundo (en .html o .json).
  * Ejemplo: http://localhost:3000/?article=http://www.elmundo.es/espana/2015/11/15/5648ff06ca47412c718b45cc.html
  * En la respuesta obtienes un json con los valores del head, del body y del html (marcado FIA completo y válido)

