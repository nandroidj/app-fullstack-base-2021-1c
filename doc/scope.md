# Estructura del proyecto

## Back-end

- **index.js** : es el punto de entrada que se va a correr dentro del servicio de backend

- **mysql-connector**: es el conector a la base de datos MySQL. se encuentran definidos el host, el puerto, el usuario y la psw de la conexion. idealmente deberian encontrarse seteadas variables de entorno.

## Front-end

- **index.html**: es el punto de entrada del cliente

- **main.js**: la funcion SayHello cuando detecte la ejecucion de un boton escribe en un text area del html un nuevon contenido.

- **tsconfig.json**: se encuentran declaradas las opciones del compilador

### Consideraciones

1. El cliente se encuentra configurado en el puerto 8000 -> `localhost:8000`

2. En el endpoint `localhost:8000/devices` se encuentra el listado de los dispositivos hardcodeados.

3. En el puerto 8001 se encuentra corriendo el administrador de la base de datos *PHP My Admin*. En el `docker-compose.yml` se encuentran las credenciales de acceso (user: root ; psw: userpass).

  En el `sidebar -> smart_home -> devices`, se pueden ver los dispositivos listados que son los mismos que se encuentran en `db/dumps/smart_home.sql`.

4. En `static/images` se guardan las imagenes a renderizar en la pagina. 


