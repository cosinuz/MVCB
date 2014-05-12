
            
                // grab the room from the URL
                var room = location.href && location.href.split('room/')[1];
                console.log("room name : " + room);
                console.log("location.href = " + location.href);
                // create our webrtc connection
                var webrtc = new SimpleWebRTC({
                    // the id/element dom element that will hold "our" video
                    localVideoEl: 'localVideo',
                    // the id/element dom element that will hold remote videos
                    remoteVideosEl: 'remotes',
                    // immediately ask for camera access
                    autoRequestMedia: true,
                    debug: true,
                    detectSpeakingEvents: true,
                    autoAdjustMic: false
                });

                // when it's ready, join if we got a room from the URL
                webrtc.on('readyToCall', function () {
                    // you can name it anything
                    if (room) webrtc.joinRoom(room);
                });

                // Since we use this twice we put it here
                function setRoom(name) {
                    $('#joinRoom').remove();
                    $('h1').text('Room name : ' + name);
                    $('body').addClass('active');
                }

                if (room) {
                    setRoom(room);
                } else {
                    $('#joinRoom').submit(function () {
                        webrtc.createRoom($('#sessionInput').val(), function (err, name) {
                            console.log(' create room cb', arguments);
                            var newUrl = location.pathname + 'room/' +  name;
                            if (!err) {
                                history.replaceState({foo: 'bar'}, null, newUrl);
                                setRoom(name);
                            } else {
                                console.log(err);
                            }
                        });
                        return false;
                    });
                }
