<a href="https://www.gotoiot.com/">
    <img src="doc/gotoiot-logo.png" alt="logo" title="Goto IoT" align="right" width="60" height="60" />
</a>

Web App Full Stack Base
=======================

*Ayudaría mucho si apoyaras este proyecto con una ⭐ en Github!*

Este proyecto es una aplicación web fullstack que se ejecuta sobre el ecosistema `Docker`. Está compuesta por un compilador de `TypeScript` que te permite utilizar este superset de JavaScript para poder programar un `cliente web`. También tiene un servicio en `NodeJS` que te permite ejecutar código en backend y al mismo tiempo disponibilizar el código del cliente web para interactar con el servicio. Además tiene una `base de datos` MySQL que puede interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

La aplicación IoT de base que viene con este proyecto se encarga de crear una tabla llamada `Devices` en la base de datos, y la idea es que vos puedas desarrollar el código de backend y frontend que te permita controlar desde el navegador el estado de los devices de un hogar inteligente - *como pueden ser luces, TVs, ventiladores, persianas, enchufes y otros* - y almacenar los estados de cada uno en la base de datos. 

Realizando estas tareas vas a a tener una aplicación fullstack IoT del mundo real que utiliza tecnologías actuales en la que un backend es capaz de interactuar con una DB para cumplir con las peticiones de control que se le mandan desde el cliente web.

En esta imagen podés ver una posible implementación del cliente web que controla los artefactos del hogar.

![architecture](doc/webapp-example-1.png)

## Comenzando 🚀

Esta sección es una guía con los pasos escenciales para que puedas poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una máquina Linux. Si querés instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Descargar el código

Para descargar el código, lo más conveniente es que realices un `fork` de este proyecto a tu cuenta personal haciendo click en [este link](https://github.com/gotoiot/app-fullstack-base/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/USER/app-fullstack-base.git
```

> En caso que no tengas una cuenta en Github podes clonar directamente este repo.

### Ejecutar la aplicación

Para ejecutar la aplicación tenes que correr el comando `docker-compose up` desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

Para acceder al cliente web ingresa a a la URL [http://localhost:8000/](http://localhost:8000/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, deteńe el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

</details>

Continuá explorando el proyecto una vez que lo tengas funcionando.

## Configuraciones de funcionamiento 🔩

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas. A continuación podés encontrar info si querés cambiar la estructura de la DB o bien sus configuraciones de acceso.

<details><summary><b>Lee cómo configurar la aplicación</b></summary><br>

### Configuración de la DB

Como ya comprobaste, para acceder PHPMyAdmin tenés que ingresar en la URL [localhost:8001/](http://localhost:8001/). En el login del administrador, el usuario para acceder a la db es `root` y contraseña es la variable `MYSQL_ROOT_PASSWORD` del archivo `docker-compose.yml`.

Para el caso del servicio de NodeJS que se comunica con la DB fijate que en el archivo `src/backend/mysql-connector.js` están los datos de acceso para ingresar a la base.

Si quisieras cambiar la contraseña, puertos, hostname u otras configuraciones de la DB deberías primero modificar el servicio de la DB en el archivo `docker-compose.yml` y luego actualizar las configuraciones para acceder desde PHPMyAdmin y el servicio de NodeJS.

### Estructura de la DB

Al iniciar el servicio de la base de datos, si esta no está creada toma el archivo que se encuentra en `db/dumps/smart_home.sql` para crear la base de datos automáticamente.

En ese archivo está la configuración de la tabla `Devices` y otras configuraciones más. Si quisieras cambiar algunas configuraciones deberías modificar este archivo y crear nuevamente la base de datos para que se tomen en cuenta los cambios.

Tené en cuenta que la base de datos se crea con permisos de superusuario por lo que no podrías borrar el directorio con tu usuario de sistema, para eso debés hacerlo con permisos de administrador. En ese caso podés ejecutar el comando `sudo rm -r db/data` para borrar el directorio completo.

</details>


## Detalles principales 🔍

En esta sección vas a encontrar las características más relevantes del proyecto.

<details><summary><b>Mira los detalles más importantes de la aplicación</b></summary><br>
<br>

### Arquitectura de la aplicación

Como ya pudiste ver, la aplicación se ejecuta sobre el ecosistema Docker, y en esta imagen podés ver el diagrama de arquitectura.

![architecture](doc/architecture.png)

### El cliente web

El cliente web es una Single Page Application que se comunica con el servicio en NodeJS mediante JSON a través de requests HTTP. Puede consultar el estado de dispositivos en la base de datos (por medio del servicio en NodeJS) y también cambiar el estado de los mismos. Los estilos del código están basados en **Material Design**.

### El servicio web

El servicio en **NodeJS** posee distintos endpoints para comunicarse con el cliente web mediante requests HTTP enviando **JSON** en cada transacción. Procesando estos requests es capaz de comunicarse con la base de datos para consultar y controlar el estado de los dispositivos, y devolverle una respuesta al cliente web también en formato JSON. Así mismo el servicio es capaz de servir el código del cliente web.

### La base de datos

La base de datos se comunica con el servicio de NodeJS y permite almacenar el estado de los dispositivos en la tabla **Devices**. Ejecuta un motor **MySQL versión 5.7** y permite que la comunicación con sus clientes pueda realizarse usando usuario y contraseña en texto plano. En versiones posteriores es necesario brindar claves de acceso, por este motivo la versión 5.7 es bastante utilizada para fases de desarrollo.

### El administrador de la DB

Para esta aplicación se usa **PHPMyAdmin**, que es un administrador de base de datos web muy utilizado y que podés utilizar en caso que quieras realizar operaciones con la base, como crear tablas, modificar columnas, hacer consultas y otras cosas más.

### El compilador de TypeScript

**TypeScript** es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Para esta aplicación se usa un compilador de TypeScript basado en una imagen de [Harmish](https://hub.docker.com/r/harmish) en Dockerhub, y está configurado para monitorear en tiempo real los cambios que se realizan sobre el directorio **src/frontend/ts** y automáticamente generar código compilado a JavaScript en el directorio  **src/frontend/js**. Los mensajes del compilador aparecen automáticamente en la terminal al ejecutar el comando **docker-compose up**.

### Ejecución de servicios

Los servicios de la aplicación se ejecutan sobre **contenedores de Docker**, así se pueden desplegar de igual manera en diferentes plataformas. Los detalles sobre cómo funcionan los servicios los podés ver directamente en el archivo **docker-compose.yml**.

### Organización del proyecto

En la siguiente ilustración podés ver cómo está organizado el proyecto para que tengas en claro qué cosas hay en cada lugar.

```sh
├── db                                  # directorio de la DB
│   ├── data                            # estructura y datos de la DB
│   └── dumps                           # directorio de estructuras de la DB
│       └── smart_home.sql              # estructura con la base de datos "smart_home"
├── doc                                 # documentacion general del proyecto
└── src                                 # directorio codigo fuente
│   ├── backend                         # directorio para el backend de la aplicacion
│   │   ├── smartHome                   # directorio secundario del backend
│   │   │   └── api.js                  # interfaz para consumo de los getters y setters que presenta la aplicacion 
│   │   │   └── device.json             # archivo que contiene la fuenta de informacion de cada dispositivo 
│   │   │   └── method.js               # archivo que contiene cada metodo a utilizar en la aplicacion
│   │   │   └── router.js               # archivo que permite el enrutamiento de cada metodo http con su respectivo endpoint y metodo.
│   │   ├── index.js                    # codigo principal del backend
│   │   ├── mysql-connector.js          # codigo de conexion a la base de datos
│   │   ├── package.json                # configuracion de proyecto NodeJS
│   │   └── package-lock.json           # configuracion de proyecto NodeJS
│   └── frontend                        # directorio para el frontend de la aplicacion
│       ├── js                          # codigo javascript que se compila automáticamente
│       ├── static                      # donde alojan archivos de estilos, imagenes, fuentes, etc.
│       ├── ts                          # donde se encuentra el codigo TypeScript a desarrollar
│       │   └── device.ts               # donde se define la clase Device con los campos: id, nombre, description, estado y tipo.
│       │   └── devicecardforui.ts      # donde se define la clase DeviceCardForUi utilizando la biblioteca Materialize para la renderizacion del dispositivo.
│       │   └── main.ts                 # donde se inicializa la aplicacion, se gestionan los eventos y se manejan las respuestas de cada solicitud. 
│       │   └── smartHomeFramework.ts   # donde se definen los metodos que interaccionan con el Documen Object Model y con el back-end.
│       │   └── tsConfig.ts             # donde se especifican los archivos raiz y las opciones de compilador.
│       └── index.html                  # archivo principal del cliente HTML
├── docker-compose.yml                  # archivo donde se aloja la configuracion completa
├── readme.md                           # este archivo
├── changelog.md                        # archivo para guardar los cambios del proyecto
├── license.md                          # licencia del proyecto
```

> No olvides ir poniendo tus cambios en el archivo `CHANGELOG.md` a medida que avanzas en el proyecto.

</details>

## Detalles de implementación 💻

En esta sección podés ver los detalles específicos de funcionamiento del código y que son los siguientes.

<details><summary><b>Mira los detalles de implementación</b></summary><br>

### Agregar un dispositivo

1. Presionar el boton `Agregar dispositivo`.

2. En efecto, aparece un modal en el cual hay que completar los campos correspondientes al tipo, el nombre, el detalle y el tipo de controlador del dispositivo.

3. Seleccionar el boton de `Crear` y en consecuencia, se agrega una nueva tarjeta como ultimo item en el panel. En caso de optar por no agregar un dispositivo, oprimir el boton `Cancelar`.


### Modificar un dispositivo

1. Desde la tarjeta del dispositivo que se desea modificar, presionar el boton `Modificar dispositivo`.

2. Aparece un modal similar al de agregar dispositivo en donde es posible modificar los campos descriptos anteriormente.

3. Al presionar el boton `Modificar`, se cierra el modal y es posible observar la tarjeta del dispositivo con sus campos modificados.

### Eliminar un dispositivo

1. Desde la tarjeta del dispositivo que se desea modificar, presionar el boton `Eliminar dispositivo`.

2. Actualizar la pagina y visualizar que el dispositivo ya no se encuentra en el panel.


### Frontend

A continuación, se presentan los archivos involucrados en el front-end con sus respectivas descripciones.

#### Device

Se define la clase `Device` que se encuentra en el archivo `src/frontend/ts/device.ts` con el fin de modelar los campos de cada dispositivo: 

* `id`: identificador de tipo `number` que es asignado por el back-end
* `name`: nombre de tipo `string`
* `description`: descripción de tipo `string`
* `state`: estado de tipo `number` condicionado a un intervalo entre cero y uno. Se contemplan los casos de interruptor, que toma los valores cero o uno, y dimer, que puede tomar diferentes valores.
* `type`: tipo de controlador de tipo `number`. Se ofrece la opcion de interruptor o dimer.

#### DeviceCardForUi

La clase `DeviceCardForUi`, en `src/frontend/ts/deviceCardForUi.ts`, se define para renderizar cada dispositivo en el panel de control mediante el uso de la biblioteca *Materialize*.

En primer lugar, se puede observar la instanciacion de la clase `Device` y se genera el codigo `HTML` necesario para renderizar la tarjeta correspondiente. Luego, se encuenta los metodos `append` y `modifyDevice`, correspondientes a agregar y modificar cada dispositivo. 

Finalmente, la clase **DeviceCard** se la utiliza para representar un dispositivo en HTML. Al crear una instancia, se le pasa una instancia de la clase `Device` y genera el código HTML necesario para dibujar una card que la represente. Luego, mediante el método `attach` de la clase `DeviceCard` se le indica a qué elemento del DOM se debe agregar este código HTML de la `DeviceCard`. También incluye el método `changeDevice` para volver a generar el código HTML de la card cuando cambia la instancia de `Device` que tiene que representar.

#### SmartHomeFramework

La classe `SmartHomeFramework`, en `src/frontend/ts/smartHomeFramework.ts`, crea instancias de *arrays* de las clases mencionadas anteriormente y los metodos correspondientes a para la obtencion, el posteo, el patch y la supresion de elementos del *DOM*.

#### Main

En el archivo `src/frontend/ts/main.ts` se encuentra el corazon del front-end. En la misma, se encuentran implementadas las siguientes tareas:

* **Metodo** [`main`]: es el metodo en el cual se realizan las tareas de inicializacion del framework y en caso deseable del dispositivo a modificar; a su vez cuenta con el procedimiento para obtener el elemnto de interes segun el identificador mediante el uso del *event listener*.

* **Eventos** [`handleEvent`]: es el encargado de gestionar los eventos a partir de un evento del tipo `click`. En especial, sucede dentro del componente `div` que cuenta con el identificador `main_container_devices`. 

A continuación, se presentan los eventos que puedan realizar a partir del evento `click`:

1. `newDevice`: al clickear el boton `Agregar dispositivo`, se expone el modal `modal_new_device` donde se completan los campos para agregar un nuevo dispositivo.

2. `modal_new_device_create`: al seleccionar el boton `Crear` en el modal para agregar un dispositivo, se obtiene el contenido de la clase `Device` y se realiza un **POST** con direccion al back-end.  

3. `modal_modify_device_modify`: al oprimir el boton modificar, se ofrece el `modal_modify_device` permitiendo alterar los campos de un dispositivo ya registrado. Nuevamente, se recuperan los nuevos datos del dispositivo y en este caso, se realiza un **PATCH**.


* Por otro lado, cada tarjeta (*DeviceCardForUi*) cuenta con el formato `option_id` tal que, es posible realizar las siguientes acciones a partir del identificador:  

1. `modify`: al clickear en el boton `Modificar dispositivo`, se puede observar el modal `modal_modify_device` donde se almacena la referencia al dispositivo `deviceToModify` para su posterior procesamiento y los campos que el usuario desea modificar.   

2. `delete`: al oprimir el boton `Eliminar dispositivo`, se realiza un **DELETE**, a la url `localhost:port_number/devices/id`, de `DeviceCardForUi` tal que se pueda borrar en el back-end.

3. `switch`: al presionar el `toggle` del dispositivo configurado con el tipo de controlador **interruptor**, se modifica el estado del dispositivo al realizar un **POST** al endpoint `/devices/state`.

4. `slider`: al modificar el `slider` del dispositivo configurado con el tipo de controlador **dimer**, se modifica el estado del dispositivo al realizar un **POST** al endpoint `/devices/state`.


Por ultimo, se encuentra el manejo de los diferentes metodos *HTTP* a partir de la abstraccion de los metodos definidos en la clase *smartHomeFramework* en la cual se utilizan *callbacks*:

1. `handleGetResponse`: procesa el *array[] = List* con los dispositivos existentes la respuesta del metodo **GET** que se envia al endpoint `/devices`. En efecto, para cada dispositivo crea una instancia de `DeviceCardForUi` y el componente correspondiente para insertarse en el panel de control.

2. `handlePostResponse`: procesa la respuesta del metodo **POST** del endpoint `/devices` para agregar un dispositivo. Del cuerpo de la respuesta se obtienen los campos del dispositivo creado de modo que se instancia la clase `DeviceCardForUi` y se agrega al panel de control.

3. `handleDeleteResponse`: procesa la respuesta del metodo **DELETE** del endpoint `/devices/:id`, tal que se suprime la tarjeta en el panel de control.

4. `handlePatchResponse`: procesa la respuesta del metodo **PATCH** del endpoint `/devices`, el cual a partir del objeto recuperado se modifica el `DeviceCardForUi`. 
  

#### Indice

El archivo `src/frontend/index.html`, contiene el andamiaje del panel de control que se encuentra distribuida de la siguiente manera segun sus identificadores: 

* `newDevice`: hay un boton que contienen este identificador y permite la visualizacion del modal para agregar un dispositivo.

* `main_container_device_list`: en un componente `div` se defined el id que contiene las tarjetas de los dispositivos y los modales para agregar y/o modificar un dispositivo en el panel de control.

* `modal_new_device`: en un `div` se define este identificador para renderizar el modal destinado a agregar un nuevo dispositivo.

* `modal_modify_device`: en otro `div` se define el id destinado al modal para modificar un dispositivo ya agregado en el panel de control.



### Backend

Por medio de una *API* **REST**, se desarolla la parte faltante del *back-end* para completar la aplicación. La misma es posible encontrarla en `src/backend/smartHome/` y cuenta con los siguientes archivos:

* `devices.json`: es un archivo de texto plano que contiene un total de 8 objetos los cuales son utilizados para crear los dispositivos.

* `model.js`: contiente todos los *getters* y *setters* que permiten la interaccion con la fuenta de datos (memoria no persistente) o la base de datos (memoria persistente).  

* `api.js`: es una abstraccion de cada *getter* y *setter* definido en `model.js` y a su vez gestiona el metodo *HTTP* que recibe del *endpoint* propuesto en `router.js`.

* `router.js`: es el archivo donde se define el *endpoint* y el metodo a consumir que expone la *API* para cada metodo *HTTP*. 


<details><summary><b>Ver los endpoints disponibles</b></summary><br>

1. Obtener el objeto de un dispositivo

* *URL*: /devices/:id

* *Método:* `GET`
  
* *Parámetros URL:* `id=[number]`: ID del device que se está consultando.

*  *Body:* []

* *Respuesta exitosa [status 200]*:

  * *Body* device con ID id
    
    *Ejemplo*
    ```
      {
          "id": 1,
          "name": "Lámpara 1",
          "description": "Luz Living",
          "state": 1,
          "type": 0,
          "icon": "1.png"
      }
    ```
 
* *Respuesta fallida [status 400]*:

  * *Body*: string indicando el error, e.g., "No se encuentra el id"

  * *Ejemplo*: `{ "errores": ["No se encuentra el id"] }`


2. Obtener la lista de dispositivos

* *URL*: /devices

* *Metodo*: `GET`
  
*  *Parámetros URL*: []

*  *Body*: []

* **Respuesta exitosa [status 200]**: 

  * *Body*: lista de dispositivos
    
  * *Ejemplo*:
    ```
      [
        {
            "id": 1,
            "name": "Lámpara 1",
            "description": "Luz Living",
            "state": 1,
            "type": 0,
            "icon": "1.png"
        },
        .
        .
        .
        .,
        { 
          "id": 7, 
          "name": "Lámpara 3", 
          "description": "Luz Balcón", 
          "state": 1, 
          "type":0
        }
      ]
    ```
 
* **Respuesta fallida [status 500]**

  * *Body*: []


3. Crear un nuevo dispositivo

* *URL*: /devices

* *Metodo*: `POST`
  
* *Parámetros URL*: []

* *Body*:
 
   `name=[string]`: nombre del nuevo dispositivo
   `description=[string]`: descripción del dispositivo
   `type=[number]`: tipo de dispositivo. 0: interruptor || 1: dimer
    
  * *Ejemplo*:
    ```
      {
          "name": "nombre",
          "description": "descripción",
          "type": 1
      }
    ```

* *Respuesta exitosa [status 200]*

  * *Body*: ["dispositivo creado correctamente"]
 
  * *Ejemplo*
    ```
      {
          "id": 1,
          "name": "Lámpara 1",
          "description": "Luz Living",
          "state": 0.0,
          "type": 0
      }
    ```
 
* **Respuesta fallida:**

  * **Código:** 500 <br />
    **Body:** -

  * **Código:** 400 <br />
    **Body:** objeto indicando el error. Posibles errores:<br />
                - Falta el campo name<br />
                - Falta el campo description<br />
                - Falta el campo type<br />
                - Falta el campo icon<br />
                - type debe valer 0 o 1<br />
    <br>
    *Ejemplo*
    ```json
    {
        "errores": ["type debe valer 0 o 1"]
    }
    ```

4. Modificar un dispositivo existente

* *URL*: /devices

* *Metodo*: `PATCH`
  
* *Parámetros URL*: []

* *Body*:
   
   `id=[number]`: identificador del dispositivo a modificar
   `name=[string]`: nuevo nombre 
   `description=[string]`: nueva descripción
   `state=[number]`: número en el intervalo [0.0 , 1.0] para definir el nuevo estado 
    
  * *Ejemplo*:
    ```
      {
          "id": 36,
          "name": "Luz habitacion",
          "description": "entrada",
          "state": 1 
      }
    ```

* *Respuesta exitosa [status 200]*

  * *Body*: ["dispositivo modificado correctamente"]
    
  * *Ejemplo*
    ```
      {
        "id": 36,
        "name": "Luz habitacion",
        "description": "entrada",
        "state": 1, 
        "type": 0 
      }
    ```
 
* *Respuesta fallida [status 500]*

  * *status 500* -> *body*:[]


5. Modificar el estado de un dispositivo

* *URL*: /devices/state

* *Metodo*: `POST`
  
* *Parámetros URL*: []

* *Body*:
 
   `id=[number]`: Id del dispositivo
   `state=[number]`: número entre 0.0 y 1.0  

* *Ejemplo*
    ```
      {
          "id": 1,
          "state": 0.7
      }
    ```

* *Respuesta exitosa [status 200]*

  * *Body*: objeto del dispositivo con el nuevo id en su campo correspondiente 

  * *Ejemplo*:
    ```
      {
          "id": 1,
          "name": "Lámpara 1",
          "description": "Luz Living",
          "state": 0.7,
          "type": 1,
          "icon": "1.png"
      }
    ```
 
* *Respuesta fallida [status 500]*

  * *Body*: [] 


6. Eliminar un dispositivo

* *URL*: /devices/:id

* *Metodo*: `DELETE`
  
* *Parámetros URL*: `id=[number]`: Id del dispositivo

* *Body*: []

* *Respuesta exitosa [status 200]*

  * *Body* Id eliminado
    
  * *Ejemplo*
    ```
      {
          "id": 1,
      }
    ```
 
* *Respuesta fallida [stauts 500]*

  * *Body*: [] 


</details>


## Tecnologías utilizadas 🛠️

En esta sección podés ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [Material Design](https://material.io/design) - Bibliotecas de estilo responsive para aplicaciones web.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.

</details>

## Contribuir 🖇️

Si estás interesado en el proyecto y te gustaría sumar fuerzas para que siga creciendo y mejorando, podés abrir un hilo de discusión para charlar tus propuestas en [este link](https://github.com/gotoiot/app-fullstack-base/issues/new). Así mismo podés leer el archivo [Contribuir.md](https://github.com/gotoiot/gotoiot-doc/wiki/Contribuir) de nuestra Wiki donde están bien explicados los pasos para que puedas enviarnos pull requests.

## Sobre Goto IoT 📖

Goto IoT es una plataforma que publica material y proyectos de código abierto bien documentados junto a una comunidad libre que colabora y promueve el conocimiento sobre IoT entre sus miembros. Acá podés ver los links más importantes:

* **[Sitio web](https://www.gotoiot.com/):** Donde se publican los artículos y proyectos sobre IoT. 
* **[Github de Goto IoT:](https://github.com/gotoiot)** Donde están alojados los proyectos para descargar y utilizar. 
* **[Comunidad de Goto IoT:](https://groups.google.com/g/gotoiot)** Donde los miembros de la comunidad intercambian información e ideas, realizan consultas, solucionan problemas y comparten novedades.
* **[Twitter de Goto IoT:](https://twitter.com/gotoiot)** Donde se publican las novedades del sitio y temas relacionados con IoT.
* **[Wiki de Goto IoT:](https://github.com/gotoiot/doc/wiki)** Donde hay información de desarrollo complementaria para ampliar el contexto.

## Muestas de agradecimiento 🎁

Si te gustó este proyecto y quisieras apoyarlo, cualquiera de estas acciones estaría más que bien para nosotros:

* Apoyar este proyecto con una ⭐ en Github para llegar a más personas.
* Sumarte a [nuestra comunidad](https://groups.google.com/g/gotoiot) abierta y dejar un feedback sobre qué te pareció el proyecto.
* [Seguirnos en twitter](https://github.com/gotoiot/doc/wiki) y dejar algún comentario o like.
* Compartir este proyecto con otras personas.

## Autores 👥

Las colaboraciones principales fueron realizadas por:

* **[Agustin Bassi](https://github.com/agustinBassi)**: Ideación, puesta en marcha y mantenimiento del proyecto.
* **[Ernesto Giggliotti](https://github.com/ernesto-g)**: Creación inicial del frontend, elección de Material Design.
* **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.

También podés mirar todas las personas que han participado en la [lista completa de contribuyentes](https://github.com/###/contributors).

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.

---

**Copyright © Goto IoT 2021** ⌨️ [**Website**](https://www.gotoiot.com) ⌨️ [**Group**](https://groups.google.com/g/gotoiot) ⌨️ [**Github**](https://www.github.com/gotoiot) ⌨️ [**Twitter**](https://www.twitter.com/gotoiot) ⌨️ [**Wiki**](https://github.com/gotoiot/doc/wiki)
