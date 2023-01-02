#! /bin/sh

docker start mssql

cd gestorpedidos/

mvn spring-boot:run & google-chrome --user-data-dir=ht/ --disable-web-security file:///home/cristianengel/Desktop/Crisalis/gestor-pedidos-crisalis/FrontEnd/Login/login.html && fg





