MVCB
====

Mosaic Video Channel for Buddies -
Grenoble INP-ENSIMAG school project.

A web application dedicated to offer a video conference platform, using WebRTC technology, for fablabs.
This project also uses `node.js` (`node`, `npm`), and uses [simpleWebRTC](https://github.com/HenrikJoreteg/SimpleWebRTC) to encapsulate the management of WebRTC tools. We are willing to move into our own WebRTC implementation sometime soon.

Don't forget to run `npm install`:
* `cd MVCB/server`
* `npm install`

How to start the server :
* `$ cd MVCB/`
* `$ node server/server.js`
* `$ node signalingserver/server.js`
You might also need a stunt server but we'll explain this in more detail later.

How to locally launch the web page :
* `$ chromium-browser http://localhost:8081/`

