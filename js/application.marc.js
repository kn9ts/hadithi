var recorder; //initialise this variable
var formdata = false;
var GUM = Modernizr.getusermedia;

//The DOM has began to be rendered
$(function() {
    //CORS support
    $.support.cors = true;

    //rec control buttons
    var recordButton = $('#record-story');
    var stopRecordingBtn = $('#end-session');
    var uploadRecordingBtn = $('#upload-story');

    //input tag 4 mc-api fallback
    var audioInput = document.getElementById('media-capture-api');

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
                }
            }, true);
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
            // Recorder.forceDownload(audiofile, "hadithi-recording.wav");
            console.log(audiofile);
            alert(JSON.stringify(audiofile));

            //if not initialised to collect form data
            if (!formdata) formdata = new FormData();

            var audioBlob = (window.URL || window.webkitURL).createObjectURL(audiofile);
            var audio = document.getElementById("recorded-audio");

            //get the duration of the audio
            audio.addEventListener("loadedmetadata", function(event) {
                // console.log(audio);
                //duration of the audio/blob audio
                audio.setAttribute('data-audio-length', audio.duration);

                //Show the upload button
                if (audio.src.indexOf('false75') == -1) {
                    uploadRecordingBtn.show(500, function() {
                        // var audio = document.getElementById('recorded-audio');
                        $(audio).parent().removeClass('hidden');
                    });
                }

                //hide the stop button, give user option to re-record
                stopRecordingBtn.hide().prev().removeClass("btn-success").addClass("btn-danger").html(function() {
                    return '<i class="icon-repeat">' //To encourage user to record again
                }).removeAttr("disabled");

                //append audio file to any existing formdata
                try {
                    formdata.append('audio_name', "hadithi-" + new Date() + ".wav");
                    // formdata.append('audio_file', audiofile /* , 'hadithi-recording.wav' */ );
                    hadithi.readAsDataURL(audiofile); //send to be encoded as DATAURL
                    formdata.append('audio_length', audio.duration);
                } catch (error) {
                    console.log("an error occured -- " + error);
                    // hadithi.checkIfUserExist(); //the upload button will do that for us
                }

                //The audio was added successfully
                //bootbox.alert('Your recording has been added successfully. Now press OK and upload your story.')
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

        uploadAudioFile: function(formdata) {
            //use recorder to prompt uploading
            try {
                if (formdata) {
                    console.log('trying to upload...', formdata.toString());
                    var URI = "/c/saveaudio"; //"../tellme/audiosave.php"; //c/saveaudio";
                    $.ajax({
                        url: URI,
                        type: "POST",
                        xhr: function() { // Custom XMLHttpRequest
                            var xhr = $.ajaxSettings.xhr();
                            if (xhr.upload) { // Check if upload property exists
                                xhr.upload.addEventListener('progress', function(e) {
                                    if (e.lengthComputable) {
                                        //Show the uploading progress
                                        setTimeout(function() {
                                            if ((e.loaded / e.total) === 1) {
                                                $('.progress-bar-pink').animate({
                                                    'width': '100%'
                                                }, 500, function() {
                                                    //remove modal;
                                                    $('#progress-header').text("Your story was safely stored.");
                                                    setTimeout(function() {
                                                        //Remove the modal
                                                        $('.modal-scrollable').click();
                                                        $('.progress-bar-pink').css({
                                                            'width': '0%'
                                                        });
                                                    }, 1000);
                                                });
                                            } else {
                                                $('.progress-bar-pink').animate({
                                                    'width': '40%'
                                                }, 20000);
                                            }
                                            console.log(e.loaded, e.total);
                                        }, 10);
                                    }
                                }, false); // For handling the progress of the upload
                            }
                            return xhr;
                        },
                        data: formdata,
                        cache: false,
                        contentType: false,
                        processData: false,
                        // dataType: "text",
                        beforeSend: function(xhr) {
                            /*
                             * Prevent this error below because of CORS: 
                             * @error -- XMLHttpRequest cannot load http://djotjog.com/c/saveaudio. 
                               No 'Access-Control-Allow-Origin' header is present on the requested resource.
                               Origin 'http://localhost:2323' is therefore not allowed access.
                             */
                            // xhr.setRequestHeader("Access-Control-Allow-Origin", "true");
                            $("body").modalmanager("loading");
                            //pause the player if playing
                            document.getElementById("recorded-audio").pause();
                        }
                    }).done(function(response) {
                        //do something
                        if (response && response.result) {
                            bootbox.alert(response.message);
                        }
                    }).fail(function(error) {
                        bootbox.alert("An error occured -- " + JSON.stringify(error));
                    });
                }
            } catch (error) {
                bootbox.alert("An error occured while trying to upload -- " + error)
            }
        },

        readAsDataURL: function(blobFile) {
            // create a blob here for testing
            // var blob = new Blob(["i am a blob"]);
            var blob = blobFile; //yourAudioBlobCapturedFromWebAudioAPI;// for example   
            var reader = new FileReader();
            // this function is triggered once a call to readAsDataURL returns
            reader.onload = function(event) {
                formdata.append('audio_file', event.target.result);
            };

            // trigger the read from the reader...
            reader.readAsDataURL(blob);
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
            } else if (options === false) { //if options == false
                localStorage.removeItem(key);
                if ($.cookie) $.cookie(key, false); //remove everything
            }

            //if only one argument is given retrieve that data from localstorage
            return arguments.length == 1 ? JSON.parse(localStorage.getItem(key)) : false;
        }
    }


    /* --------------------------- THE APPLICATION INITIALISES HERE ------------------------------ */

    // --------- FACEBOOK INTERGRATION ----------
    // The function assigned to window.fbAsyncInit is run as soon as the SDK has completed loading.
    // Any code that you want to run after the SDK is loaded should be placed within this function and after the call to FB.init.
    // Any kind of JavaScript can be used here, but any SDK functions must be called after FB.init.
    window.fbAsyncInit = function() {
        // Setting status & xfbml to false can improve page load times, 
        // but you'll need to manually check for login status using FB.getLoginStatus.
        // https://developers.facebook.com/apps/
        var APP_ID = ['213258518873900', '1425261494379816'] //local - KnightsLab, remote - Hadithi
        //init FB auth
        FB.init({
            appId: APP_ID[1],
            status: false, // check login status on SDK load
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: false // parse XFBML
        });
        //check if user is initialised
        hadithi.initApplication();
    }

    //check for device and change the API
    var device = hadithi.detectAppleDevices();
    if (device) { //If true -- a mobile device was detected
        if (device == "android") $('audio#recorded-audio').attr("type", "audio/*"); //Do nothing, that is fine
        if (device == "idevice") $('audio#recorded-audio').attr({
            "type": "video/*",
            capture: "camcorder"
        });
        // console.log("Mobile device detected -- " + device);
        bootbox.alert("Mobile device detected -- " + device);
    }

    //disable the rec-btn until permission is granted to use microphone;
    recordButton.attr('disabled', 'disabled').next('#end-session').hide().next('#upload-story').hide();

    //Does the device support the API, if doesnt fall back to Media Capture API
    if (GUM) {
        //get the API variable
        var getUserMedia = {};
        getUserMedia.init = Modernizr.prefixed('getUserMedia', navigator);

        //initialise the request for app to use the microphone
        $(window).load(function() {
            getUserMedia.init({
                    audio: true //We only need your voice, si ni hadithi tu unatupea
                },
                function(audioStream) {
                    //Get the microphone, and attach it to the recorder
                    var AudioContext = Modernizr.prefixed("AudioContext", window);
                    // console.log(AudioContext);

                    var context = new AudioContext();
                    // creates a gain node
                    var volume = context.createGain();
                    volume.gain.value = 15.5; //test volume gain

                    var mediaStreamSource = context.createMediaStreamSource(audioStream);
                    // connect the stream to the gain node
                    mediaStreamSource.connect(volume);

                    //pass to plugin to manage the recording
                    recorder = new Recorder(mediaStreamSource);
                    // recorder.record();

                    $('#allow-mic').fadeOut(2000)
                    recordButton.removeAttr("disabled");
                },
                function(err) {
                    console.log("The following error occured: ", err);

                    var msg;
                    if (err.name = "PermissionDeniedError") msg = "Oops! We need your permission to be able to access your microphone.";
                    else msg = "Drats!! Seems your browser does not support recording of audio. Oh well! We tried!";
                    recorder = false;
                    //visualise the error
                    $('#allow-mic').removeClass('alert-info').addClass('alert-danger').text(msg);
                    $('button#record-story').attr('disabled', true);
                    bootbox.alert(msg);
                }
            );

            // Get all the JS scripts in the page for GRUNTFILE addition
            var sc = $('html').find('script').map(function(a, b) {
                if ($(b).attr('src')) return $(b).attr('src');
            });
            console.log(sc);

            var css = $('html').find('link').map(function(a, b) {
                if ($(b).attr('href')) return $(b).attr('href');
            });
            console.log(css);
        });

        //if the user begins to record the data
        recordButton.click(function() {
            if (recorder) { //If access was granted to use the microphone
                // var recordButton = $(this);
                recordButton.attr('disabled', 'disabled'); //remove recording event listener
                //Access has been granted and the user is now live: microphone
                recordButton.removeClass("btn-danger").addClass("btn-success").text("Recording...");
                //begin recording
                recorder.record();
                //Show the stop button and attach event if he ENDS the recording
                stopRecordingBtn.fadeIn();
                uploadRecordingBtn.hide(); //hide upload btn, if shown
            } else {
                //Something went wrong, maybe the user denied the application access to the MIC
            }
        });

        //onclick of END recording button
        stopRecordingBtn.on('click', function(event) {
            // event.preventDefault()
            //get the recording
            recorder.stop(); //1st stop it

            //get the WAV file encoding from the recording
            //if 2nd param is set -- export Mono WAV
            recorder.exportWAV(hadithi.processAudioFile, 'audio/wav');

            //Get the whole audio recorded, not encoded yet
            // recorder.getBuffer(function(audioBuffer) {
            //     console.log(audioBuffer);
            // });
        });

    } else {
        //The STREAM API is not available, fallback to Media Capture API
        bootbox.alert("Browser does not support getUserMedia");

        // instead will act as handler for the file-picker input
        recordButton.removeAttr("disabled").on('click', function(event) {
            event.preventDefault();
            audioInput.click(); //will prompt user to record audio with phone
        });

        //listen when user adds audio file, after recording
        audioInput.onchange = function(event) {
            hadithi.processAudioFile(audioInput.files[0]); //its just one
            // alert('Your recording has been added successfully. Now press OK to upload your story.')
        };
    }

    //prompt uploadin of the recording
    /*
     - check length - 1 min
     - check to see if there is any user data stored
     - upload to servers
     - track the uploading progress
    */
    uploadRecordingBtn.click(function() {
        if (!formdata) formdata = new FormData();
        //GUM should be true for browsers
        //check to see if its from the MIC or a FILE INPUT
        // formdata = GUM ? new FormData() : new FormData(document.forms.namedItem("recorded-file"));
        var af = document.getElementById('recorded-audio');
        console.log(af);
        // formdata.append('user_data', user);
        formdata.append('user_data', {}); //JSON.stringify(user));        
        // formdata.append('audio_file', GUM ? af.getAttribute('src') : audioInput.files[0]);
        // formdata.append('audio_length', af.getAttribute('data-audio-length'));
        hadithi.uploadAudioFile(formdata);
        //reset the upload button
        questionaireEvent();

    });

    var questionaireEvent = function() {
        // event to handle questionaire submission
        $('#qtnr-submit').on('click', function(event) {
            var el = $(this);
            el.func = el.click;

            //get the form
            var fd = document.getElementById('questionaire-form');
            //collect the user's data from the modal form
            // formdata = new FormData( /* fd -- previously */ );
            var fdata = $(fd).serializeArray();

            //Flatten the form data object array [fdata]
            window.formDataObject = {};
            for (var key in fdata) {
                formDataObject[fdata[key].name] = fdata[key].value;
            }
            console.log("User form filled data should be added to \"formdata\" variable");
            console.log(formDataObject);

            //correct the sex toggled -- 'on' for male
            formDataObject.sex = formDataObject.sex === "on" ? "male" : "female";
            formdata.append('user_data', formDataObject);
            formDataObject.upload = false;

            //save to local storage
            hadithi.localStorage('hadithiUser', {
                content: formDataObject
                // ,local: false
            });

            var af = document.getElementById('recorded-audio');
            //check if an audio recording exists and promp and uploading session
            //match for an email address in his formdata
            if (af.src.indexOf('false75') == -1 && /[\w._%+-]+\@[\w.-]+\.[a-zA-Z]{2,}$/.test(formDataObject.email)) {
                // $('#questionaire').modal('hide');
                console.log("Found user has already recorded a story, trying to upload it once more.");

                /*
                    formdata.append('audio_file', af.src, {
                        type: af.type
                    });
                    formdata.append('audio_length', af.getAttribute('data-audio-length'));
                    if (formDataObject.email) hadithi.uploadAudioFile();
                */
                formDataObject.upload = true;
            } else {
                console.info("User has not recorded yet. So just hide the questionaire and let him/her record");
            }

            //Hide modal window
            $('#questionaire').on('show.bs.modal', function(event) {
                //user has already recorded a story, trying to trigger uploading
                console.log("re-fixing the submit function!!!");
                el.on('click', el.func);
            }).modal('hide');

            // setTimeout(function() { if (formDataObject.upload) uploadRecordingBtn.trigger("click"); }, 100);
        });

    }
    questionaireEvent();

    //Do not submit the form
    $('#questionaire-form').submit(function(event) {
        // console.log($(this).serializeArray())
        console.log("FormData has been plucked -- ", formdata.fd)
    });

    $('#applogout').click(function(event) {
        event.preventDefault();
        hadithi.localStorage("hadithiUser", false); //remove his/her data from strorage
        hadithi.loginFacebook(false, function() {
            console.log("User logged out.")
        });
    });

    //Set up the AUDIO TAG
    AudioJS.DOMReady(function() {
        var myPlayer = AudioJS.setup("recorded-audio", {
            controlsBelow: false, // Display control bar below video instead of in front of
            controlsHiding: false, // Hide controls when mouse is not over the video
            defaultVolume: 0.85, // Will be overridden by user's last volume if available
            flashVersion: 9, // Required flash version for fallback
            linksHiding: true // Hide download links when video is supported
        });
    });

    // Load the SDK asynchronously
    (function(d) {
        var js, id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) return;
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "http://connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    //initialise modals, tips and popovers
    $('[data-rel="modal"]').modal();

    $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
        '<div class="loading-spinner" style="width: 250px; margin-left: -125px;">' +
        '<h2 id="progress-header" style="text-align: center; color: #fefefe; padding: 0.3em; background: #2ecc71">Just a moment...</h2>' +
        '<br />' +
        '<div class="progress progress-striped active">' +
        '<div class="progress-bar progress-bar-pink" style="width: 0%;"></div>' +
        '</div>' +
        '</div>';

});