#! /bin/bash

echo -e "Lancement des serveurs"
cd server
node server.js &
sleep 3
node ../signalingserver/server.js &

echo -e "Serveur lancé"
namevariable=$(uname)

echo "$namevariable"

if [ "$namevariable" = "Darwin" ]; then
	echo -e "Lancement de Chrome sous OS X"
	open /Applications/Google\ Chrome.app http://localhost:8001
#elif [ "$namevariable" = "Linux" ]; then
#	echo -e "Lancement de Chrome sous Linux"
#    chromium-browser http://localhost:8001
fi
echo -e "Fin du programme"
