var hadithi = {

    hasGetUserMedia: function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },

    detectAppleDevices: function() {
        var bool = false;
        // Apple Devices Detection with JavaScript
        // For use within normal web clients
        // The navigator string results: 
        // Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10
        if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
            bool = "idevice";
            // if (document.cookie.indexOf("iphone_redirect=false") == -1) {
            //     window.location = "http://m.espn.go.com/wireless/?iphone&i=COMR";
            // }
        }

        // Android Detection with JavaScript
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if (isAndroid) {
            // Do something!
            // Redirect to Android-site?
            // window.location = 'http://android.davidwalsh.name';
            bool = "android";
        }
        return bool;
    },

    checkIfUserExist: function(cb, bool) {
        var user = this.localStorage('hadithiUser');
        if (user) { //exists
            if (user.isFacebook) {
                //if bool is false, the function will run
                if (!bool) hadithi.getUserFacebookInfo("facebook-opengraph-api");
            } else {
                //do nothing, the data is safe where it is;
                //localstorage
            }
        } else {
            //user does not exist;
            $('#questionaire').modal('show');
            //Ensure the FB button is working
            $('#facebookInit').click(function(event) {
                event.preventDefault();
                //initialise the login phase
                hadithi.loginFacebook(true, function(response) {
                    //Hide the modal window
                    $('#questionaire').on('hidden.bs.modal', function() {
                        console.log("questionaire has been hidden.")
                    }).modal('hide');

                    //work with the response from FB
                    if (response.authResponse) {
                        // The person logged into your app
                        hadithi.getUserFacebookInfo("facebook-opengraph-api"); // get his info -- opengraph api
                    } else {
                        // The person cancelled the login dialog -- handle error
                    }
                });
            }).css('color', function() {
                if (bool) { //If boolean is set, then hide the Facebook auth well
                    $(this).parent().hide();
                    $('#record-first').attr('disabled', true);
                }
                return $(this).css("color");
            });
        }

        //run the callback
        if (typeof cb == "function") cb(user); //undefined if no user
    },

    initApplication: function() {
        // FB App check
        FB.getLoginStatus(function(response) {
            // Here we specify what we do with the response anytime this event occurs. 
            if (response.status === 'connected') {
                // The response object is returned with a status field that lets the app know the current
                // login status of the person. In this case, we're handling the situation where they 
                // have logged in to the app.
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                var expires = response.authResponse.expiresIn; //UTC time

                //get user info, refresh it if it existed before
                hadithi.getUserFacebookInfo("facebook-opengraph-api");
            } else if (response.status === 'not_authorized') {
                // In this case, the person is logged into Facebook, but not into the app, so we call
                // FB.login() to prompt them to do so. 
                // In real-life usage, you wouldn't want to immediately prompt someone to login 
                // like this, for two reasons:
                // (1) JavaScript created popup windows are blocked by most browsers unless they 
                // result from direct interaction from people using the app (such as a mouse click)
                // (2) it is a bad experience to be continually prompted to login upon page load.
                console.log("The person is logged into Facebook, but not into the app.")
                hadithi.checkIfUserExist(function(response) {
                    if (response && !response.isFacebook) {
                        console.log("user exist without facebook auth...", response);
                        // hadithi.localStorage('hadithiUser', false);
                    } else {
                        hadithi.checkIfUserExist();
                    }
                }, false); //ask for info
            } else {
                // In this case, the person is not logged into Facebook, so we call the login() 
                // function to prompt them to do so. Note that at this stage there is no indication
                // of whether they are logged into the app. If they aren't then they'll see the Login
                // dialog right after they log in to Facebook. 
                // The same caveats as above apply to the FB.login() call here.
                console.log("The person is not logged into Facebook")
                hadithi.checkIfUserExist(function(response) {
                    if (response && !response.isFacebook) {
                        console.log("user exist without facebook auth...", response);
                        // hadithi.localStorage('hadithiUser', false);
                    } else {
                        hadithi.checkIfUserExist();
                    }
                }, false); //ask for info
            }
        }, true);
    },

    loginFacebook: function(bool, cb) { //boolean, callback
        if (!cb) cb = function() {}; //assign an empty function if no callback is defined.

        // if undefined or true -- login in user to app
        if (bool || bool == undefined) {
            FB.login(cb, {
                scope: "email, user_birthday, user_hometown, user_location"
            });
            //note: will acquire profil pic after loggin
        } else { //anything else
            FB.logout(function(response) {
                // Person is now logged out
                cb(response); //run callback, passing the FB response
                console.log("User logged out successfuly...");
                $('#fbpicture').src('../assets/10.jpg').parent().find('#fbusername').text('Storyteller');
            });
        }
    },

    getUserFacebookInfo: function() {
        console.log('Welcome! Fetching your information.... ');
        FB.api('/me', function(response) {
            if (response && !response.error) {
                /* handle the result */
                console.log('Good to see you, -- ' + response.first_name)
                console.log(JSON.stringify(response));
                response.isFacebook = true; //from facebook;

                //store this data
                hadithi.localStorage('hadithiUser', {
                    content: response,
                    local: false
                });

                try {
                    $('#fbusername').text(response.first_name);
                    // $('#fbpicture').attr("src", response.picture.data.url);
                    hadithi.getProfilePic();
                } catch (error) {
                    //do nothing
                    console.log("error occured -- " + error);
                }
            } else {
                // something went wrong, get the error
                console.log(response.error);
            }
        });
    },

    getProfilePic: function() {
        /* make the API call */
        FB.api(
            "/me/picture", {
                "redirect": false,
                "height": "200",
                "type": "normal",
                "width": "200"
            },
            function(response) {
                if (response && !response.error) {
                    /* handle the result */
                    console.log(JSON.stringify(response));
                    var profileImage = response.data.url.replace('https', 'http'), //remove https to avoid any cert issues
                        randomNumber = Math.floor(Math.random() * 256);

                    //remove if there and add image element to dom to show without refresh
                    //add random number to reduce the frequency of cached images showing
                    $('#fbpicture').attr("src", profileImage + '?' + randomNumber);
                }
            }
        );
    },

    /*
        - check length
        - attach file to audio tag
        - prompt user to upload
        - upload recording
        */
    processAudioFile: function(af) {
        //get the file
        var audiofile = af; //audioInput.files[0]; //its just one
        Recorder.forceDownload(audiofile, "hadithi-recording.wav");
        console.log(audiofile);
        // alert(JSON.stringify(audiofile));

        var audioBlob = (window.URL || window.webkitURL).createObjectURL(audiofile);
        var audio = document.getElementById("recorded-audio");

        //get the duration of the audio
        audio.addEventListener("loadedmetadata", function(event) {
            // duration = audio.duration;
            console.log(audio);
            audio.setAttribute('data-audio-length', audio.duration);

            //Show the upload button
            if (audio.src !== "") {
                uploadbtn.show(500, function() {
                    // var audio = document.getElementById('recorded-audio');
                    $(audio).parent().removeClass('hidden');
                });
            }

            //hide the stop button, give user option to re-record
            stopbtn.hide().prev().removeClass("btn-success").addClass("btn-danger").html(function() {
                return '<i class="icon-repeat">' //To encourage user to record again
            }).removeAttr("disabled");

            //append audio file to any existing formdata
            try {
                if (formdata) {
                    formdata.append('audio_file', audioBlob, {
                        type: audio.type
                    });
                    formdata.append('audio_length', audio.duration);
                }
            } catch (error) {
                console.log("an error occured -- " + error);
                // hadithi.checkIfUserExist(); //the upload button will do that for us
            }
        });

        //set stuff
        audio.setAttribute('src', audioBlob);
        audio.setAttribute('preload', "metadata");
        // audio.controls = true;

        console.log(audio);
        setTimeout(function() {
            audio.play();
        }, 500);

    },

    uploadAudioFile: function() {
        //use recorder to prompt uploading
        try {
            if (formdata) {
                console.log('trying to upload...', formdata);
                var uri = "http://djotjog.com/c/saveaudio";
                $.ajax({
                    url: uri,
                    data: formdata,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader("Access-Control-Allow-Origin", "true");
                        $("body").modalmanager("loading");
                    }
                }).done(function(response) {
                    //do something
                }).fail(function(error) {
                    console.log("An error occured -- ", error);
                });
            }
        } catch (error) {
            console.log("An error occured while trying to upload -- " + error)
        }
    },
    /** 
         * LOCAL STORAGE MANAGEMENT FUNCTION 
         * @param options - local(bool), content(object), backup(bool)
         * @param key
         * STORE CONTENT locally or in cookie or BOTH
         *
         * HOW TO USE: 
             app.localStorage('key') //Returns the content if existing, or false if it doesnt
             app.localStorage('key', {
                content: the content, can be a raw object, string or raw array //it is stringified by the function
                local: true/false //yes or no if you want to store only in localStorage
             })
         */
    localStorage: function(key, options) {
        if (options) { //store this data
            if (!options.local) {
                localStorage.setItem(key, JSON.stringify(options.content));
            } else { //also in cookie too
                if ($.cookie) $.cookie(key, options.content);
                localStorage.setItem(key, JSON.stringify(options.content));
            }
        } else if (options == false) { //if options == false
            localStorage.removeItem(key);
            if ($.cookie) $.cookie(key, false); //remove everything
        }

        //if only one argument is given retrieve that data from localstorage
        return arguments.length == 1 ? JSON.parse(localStorage.getItem(key)) : false;
    }
}