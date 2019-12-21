# Acoplamientos

Aplicación desarrollada Angular, para mostrar un método para determinar los grupos de acoplamiento lógico y la intensidad de los cambios en los elementos de una cadena de acoplamiento indirecto.

## Requisitos de instalación

* El equipo debe tener instalado NodeJS y Npm.

## Instalación

1. Clonar el repositorio con el comando ```git clone```.
2. Descargar las dependencias del proyecto con el comando ```npm install```.
3. Configurar las credenciales de la base de datos Neo4j.

### Parametros

Los parametros de la aplicación se encuentran en el archivo ```src/enviroments/enviroment.ts```, en donde se pueden establecer los siguientes atributos al sistema:

| Llave                  | Valor                                                                              |
|------------------------|------------------------------------------------------------------------------------|
| ```neo4j_host```       | Host del servidor donde está corriendo la base de datos Neo4j.                     |
| ```neo4j_port```       | Puerto de acceso del servicio donde está corriendo la base de datos Neo4j.         |
| ```neo4j_user```       | Usuario con permisos de lectura de la base de datos Neo4j.                         |
| ```neo4j_pass```       | Contraseña del usuario de la base de datos                                         |

## Ejecución

1. El proyecto se ejecuta con el comando ```ng serve``` desde la carpeta raíz del proyecto.
2. Desde cualquier browser, navegar a la dirección ```localhost:4200```.


## Suposiciones
* La base de datos que se está consultando, tiene proyectos a los cuales se les ha suministrado la información del acoplamiento lógico.
* Las credenciales de la base de datos son válidas.

## Documentación

* Repositorio: _https://github.com/cincottel5/coupling-frontend.git_
* [Angular](https://angular.io/).
* [Plantilla Paper dashboard](https://www.creative-tim.com/).

## Ayuda Adicional
Más ayuda con el comando de Angular CLI ```ng help```.

## Autores
* Yelko Carvajal Mora
* Daniel Bertarioni Chaves
* Antonio González Torres

## Licencia
El proyecto hace uso de la plantilla gratis de paper dashboard

[MIT](https://choosealicense.com/licenses/mit/)

