# Visualización
<<<<<<< HEAD
[![Build Status](https://travis-ci.org/AgoraUS-G1-1617/Frontend.svg?branch=master)](https://travis-ci.org/AgoraUS-G1-1617/Frontend)
=======
[![Build Status](https://travis-ci.org/AgoraUS-G1-1617/Frontend.svg?branch=dev)](https://travis-ci.org/AgoraUS-G1-1617/Frontend)
>>>>>>> dev

Subsistema de visualización y gestión de resultados de Agora US.

## Miembros
* Doncel Ramírez, Andrés ([@anddonram](http://github.com/anddonram))
* Gavilán Ruiz, José ([@josgavrui1](http://github.com/josgavrui1))
* Jiménez Ríos, Andrés Miguel ([@andjimrio](http://github.com/andjimrio))
* Menéndez Montes, Eva ([@evamenmon](http://github.com/evamenmon))
* Ramos González, José Renato ([@pastahito](http://github.com/pastahito))

## Más
Para más información, consultar [esta wiki](https://1984.lsi.us.es/wiki-egc/index.php/Frontend_y_visualizaci%C3%B3n_de_resultados_1617).
El sistema al cual se integra este modúlo está disponible en [este repositorio](https://github.com/ManuelLR/continuous-delivery-integration).

## Licencia
El código está bajo [The MIT License](https://github.com/AgoraUS-G1-1617/Frontend/blob/dev/LICENSE).

## Instalación
Para instalar todo lo necesario para ejecutar el proyecto se necesitará de la instalación de varios componentes. Se dispondrá de dos formas para ello: utilizar la máquina virtual preparada o instalar los componentes por separado.

* Instalar la máquina virtual: Se puede encontrar aquí ( https://mega.nz/#!cQdlEJyZ!ltSyr4sjcxFYLqC2Y0QpmVr4xlqOkZdZ7qOu_N2p4Pk ). La contraseña es "frontend".
* Instalar los componentes manualmente: Los componentes necesarios son los siguientes:
  - Nodejs: Se puede conseguir en la página oficial de Nodejs. La versión utilizada por el grupo del curso 16/17 es la 6.9.2 LTS ( https://nodejs.org/dist/v6.9.2/node-v6.9.2-x64.msi )
  - npm: Se utiliza para instalar componentes como express de forma sencilla.
  - Un editor de código o IDE (nosotros estuvimos utilizando [Atom](https://atom.io/), pero se puede utilizar cualquier otro).

Una vez descargamos todos los componentes, realizamos los siguientes pasos en la consola:
- $ git clone https://github.com/AgoraUS-G1-1617/Frontend.git
- $ cd frontend
- $ git checkout -b dev origin/dev
Con esto conseguimos descargar tanto la rama master como la rama de desarrollo (dev).
Para instalar los componentes necesarios utilizamos la instrucción "npm install".
Por último, para ejecutar el servidor basta con ejecutar la instrucción "npm start".

## Web y API

Se puede acceder a la parte de visualización siguiendo los siguientes enlaces:

- Estable: https://frontend.agoraus1.egc.duckdns.org/
- Beta (desarrollo): https://beta.frontend.agoraus1.egc.duckdns.org/

Nuestra aplicación utiliza la información suministrada por [Recuento y modificación](https://github.com/AgoraUS-G1-1617/Recuento-y-modificacion). Sin embargo, también disponemos de una API simulada destinada a pruebas propias, la cual se almacena en la carpeta recuento-api.
