#! /bin/sh

echo -e "Lancement de l'installation"

cd server
npm install

cd ../signalingserver
npm install

cd ..

echo -e "Installation terminée"


