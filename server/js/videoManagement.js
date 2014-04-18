
                // grab the room from the URL
                var room = location.search && location.search.split('?')[1];

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
                    $('form').remove();
                    $('h1').text('Room name : ' + name);
                    $('body').addClass('active');
                }

                if (room) {
                    setRoom(room);
                    } else {
                    $('form').submit(function () {
                        var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
                        webrtc.createRoom(val, function (err, name) {
                            console.log(' create room cb', arguments);

                            var newUrl = location.pathname + '?' +  name;
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
