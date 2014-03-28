/**
 *
 *@Author - Eugene Mutai
 *@Twitter - JheneKnights
 *@Email - eugenemutai@gmail.com
 *@ShortURL - http://bit.ly/hadithi-tellme
 *
 * Date: 29/01/14
 * Time: 4:02 PM
 * Description:
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Copyright (C) 2013
 * @Version -
 *
 */

var recorder; //initialise this variable
var formdata = false;
var GUM = Modernizr.getusermedia;
var hadithi;

//Will be used to carry generated formdata, and for validation on upload
window.formDataObject = {};

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

    hadithi = {

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
            console.log("does the user exit?? --- ", user);
            if (user) { //exists
                if (user.isFacebook !== "false") {
                    //if bool is false, the function will run
                    if (!bool) hadithi.getUserFacebookInfo("facebook-opengraph-api");
                } else {
                    //do nothing, the data is safe where it is;
                    //localstorage
                }
            } else {
                //user does not exist;
                $('a[href="#user-questionaire"]').click();
                //Ensure the FB button is working
                $('#facebookInit').click(function(event) {
                    event.preventDefault();
                    //initialise the login phase
                    hadithi.loginFacebook(true, function(response) {
                        //Hide the modal window
                        $('a[href="#user-record"]').on('shown.bs.tab', function() {
                            console.log("questionaire has been hidden.")
                        }).click(); //.tab('show');

                        //work with the response from FB
                        if (response.authResponse) {
                            // The person logged into your app
                            hadithi.getUserFacebookInfo("facebook-opengraph-api"); // get his info -- opengraph api
                        } else {
                            // The person cancelled the login dialog -- handle error
                            // So maybe he doesnt want to use FB, so just hide FB auth and show normal form.
                            hadithi.checkIfUserExist([], true);
                        }
                    });
                }).css('color', function() {
                    if (bool) { //If boolean is set, then hide the Facebook auth well
                        $(this).hide();
                        $('#record-first').attr('disabled', true);
                    }
                    //dummy return
                    return $(this).css("color");
                });
            }

            //run the callback if it's a function
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
                        if (response && response.isFacebook == "false") {
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
                        if (response && response.isFacebook == "false") {
                            console.log("user exist without facebook auth...", response);
                            // hadithi.localStorage('hadithiUser', false);
                        } else {
                            hadithi.checkIfUserExist();
                            // hadithi.localStorage('hadithiUser', false);
                            console.log("user exist is not saved anywhere or anyhow!!!", response);
                        }
                    }, false); //ask for info
                }
            }, true);
        },

        loginFacebook: function(bool, cb) { //boolean, callback
            if (!cb) cb = function() {}; //assign an empty function if no callback is defined.

            // if undefined or true -- login in user to app
            if (bool || bool === undefined) {
                FB.login(cb, {
                    scope: "email, user_birthday, user_hometown, user_location"
                });
                //note: will acquire profil pic after loggin
            } else { //anything else
                FB.logout(function(response) {
                    // Person is now logged out
                    cb(response); //run callback, passing the FB response
                    console.log("User logged out successfuly...");
                    $('#fbpicture').attr('src', '../assets/10.jpg').parent().find('#fbusername').text('Storyteller');
                    //reload page
                    window.location.reload(false);
                    // If we needed to pull the document from
                    //  the web-server again (such as where the document contents
                    //  change dynamically) we would pass the argument as 'true'.
                });
            }
        },

        getUserFacebookInfo: function() {
            console.log('Welcome! Fetching your information.... ');
            FB.api('/me', function(response) {
                if (response && !response.error) {
                    var r = response;
                    /* handle the result */
                    console.log('Good to see you, -- ' + r.first_name)
                    // console.log(JSON.stringify(r));
                    r.isFacebook = true; //from facebook;

                    var userdata = {
                        id: r.id,
                        first_name: r.first_name,
                        last_name: r.last_name,
                        link: r.link,
                        username: r.username,
                        gender: r.gender,
                        locale: r.locale,
                        location: r.location.name,
                        // age_range: r.age_range
                        hometown: r.hometown.name,
                        birthday: r.birthday,
                        email: r.email,
                        isFacebook: true
                    }
                    console.log(userdata);

                    //store this data
                    hadithi.localStorage('hadithiUser', {
                        content: userdata
                        // local: false
                    });

                    try {
                        $('#fbusername').text(r.first_name);
                        // $('#fbpicture').attr("src", r.picture.data.url);
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
        processAudioFile: function(af, blobType) {
            //get the file
            var audiofile = af; //audioInput.files[0]; //its just one
            if (!blobType) blobType = 'audio/wav'; //if blobType not defined
            // Recorder.forceDownload(audiofile, "hadithi-recording.wav");
            console.log("Size of the audio file -- " + audiofile.size / 1024 + " Kbs");
            // alert(JSON.stringify(audiofile));

            //Remove overlay
            $('#progress-header').text("Just a moment...");
            //Remove the modal
            $('.modal-scrollable').click();

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
                    //If I am sending a ZIP file
                    if (hadithi.checkEnableZipping())
                        formdata.append('audio_name', "hadithi-recording.zip");
                    else
                    //it either an mp3 or wav file
                        formdata.append('audio_name', "hadithi-" + new Date().getTime() + "." + blobType.split('/')[1]);

                    hadithi.readAsDataURL(audiofile); //send to be encoded as DATAURL
                    formdata.append('audio_length', audio.duration);
                } catch (error) {
                    console.log("an error occured -- " + error);
                    // hadithi.checkIfUserExist(); //the upload button will do that for us
                }

                //The audio was added successfully (alert)
                console.log('Your recording has been added successfully. Now press OK and upload your story.')
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
                    console.info('trying to upload...', formdata.toString());
                    var URI = "/c/saveaudio"; //"../tellme/audiosave.php"; // "/c/saveaudio";
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
                                                    }, 2000);
                                                });
                                            } else {
                                                $('.progress-bar-pink').css({
                                                    'width': ((e.loaded / e.total) * 100) + "%"
                                                });
                                            }
                                            // console.log("uploaded -- " + ((e.loaded / e.total) * 100) + "%");
                                        }, 10);
                                        console.log("Total data size -- " + (e.total / 1024) + " Kbs");
                                    }
                                    //Erase all form data for refresh uploading
                                    formdata = undefined;
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
                            $('.modal-scrollable').click(); //close overlay
                            alert(response.message);
                        }
                    }).fail(function(error) {
                        alert("An error occured -- " + JSON.stringify(error));
                        $('.modal-scrollable').click();
                    });
                }
            } catch (error) {
                alert("An error occured while trying to upload -- " + error)
            }
        },

        readAsDataURL: function(blobFile) {
            // create a blob here for testing
            // var blob = new Blob(["i am a blob"]);
            var blob = blobFile; //yourAudioBlobCapturedFromWebAudioAPI;// for example   
            var reader = new FileReader();
            // this function is triggered once a call to readAsDataURL returns
            reader.onload = function(event) {
                //none for now, it sucks bigtime!!
                var which_zip_handler = "NONE"; //"jszip", "ljzb", "zipjs";

                function ZIP_FILE(bool) {
                    if (hadithi.checkEnableZipping()) {
                        return hadithi.zipAudioData(event.target.result, which_zip_handler);
                    } else {
                        return event.target.result;
                    }
                }
                //check to see if it "zipjs" -- works differently
                if (which_zip_handler !== "zipjs") formdata.append('audio_file', ZIP_FILE(true));
            };
            // trigger the read from the reader...
            reader.readAsDataURL(blob);
        },

        //Gets the base64 audio data and ZIPs it
        zipAudioData: function(audioData, compressionType) {
            var zipped_audio = true; //incase nothing is returned
            //If no compression type is defined, available: jszip, ljzb
            switch (compressionType) {
                case 'jszip':
                    var zip = new JSZip();
                    zip.file("hadithi-recording.wav", audioData, {
                        base64: true
                    });
                    var content = zip.generate({
                        compression: "DEFLATE"
                    });
                    zipped_audio = "data:application/zip;base64," + content;
                    console.log("Audio file size after compression(est.) -- " + (zipped_audio.length / 1024) + " Kbs");
                    // return zipped_audio;
                    break;

                case 'ljzb':
                    // then utf8 - you  don't want to go utf-8 directly
                    var data = audioData; //new Buffer(audioData, "utf8");
                    // now compress
                    zipped_audio = LJZB.compress(data, null, 9); //9 - hightest compression rate
                    console.log("Audio file size after compression -- " + (zipped_audio.length / 1024) + " Kbs");
                    // return zipped_audio;
                    break;

                case 'zipjs':
                    // use a zip.BlobWriter object to write zipped data into a Blob object
                    zip.createWriter(new zip.Data64URIWriter("application/zip"), function(writer) {
                        // use a Data64URIReader object to read the data stored into blob variable
                        writer.add("hadithi-" + new Date().getTime() + ".wav", new zip.Data64URIReader(audioData), function() {
                            // close the writer and calls callback function
                            zipWriter.close(function(zippedData) {
                                zipped_audio = zippedData;
                                //These functions are asychronous, thus wudnt get back this audioblob
                                formdata.append('audio_file', zipped_audio);
                                hadithi.zipped_audio = zipped_audio;
                                console.info("finished Zipping, using zip.js", zipped_audio);
                            });
                            console.info("ZIPPING HAS BEGAN.");
                        }, function(currentIndex, totalIndex) {
                            // onprogress callback
                        }, function(message) {
                            //error callback
                            console.error(message);
                        });
                    }, function onerror(message) {
                        console.error(message);
                    });
                    break;
            }

            //get back the audio;
            return zipped_audio;
        },

        checkEnableZipping: function() {
            // if (location.href.indexOf("zip_file") > -1 || location.hash.indexOf("zip_file") > -1) {
            //     return true;
            // } else {
            //     return false;
            // }
            return false; //do not zip
        },

        audioIsWAVorMp3: function() {
            // will check if user needs MP3 or WAV encoding
            // WAV -- fastest for now
            // function to be moded soon...
            if (location.href.indexOf("save_mp3") > -1 || location.hash.indexOf("save_mp3") > -1) {
                console.log("Mp3 audio encoding chosen, please be aware more Processing resource is needed and your patience while processing the mp3");
                return {
                    type: 'mp3',
                    mimeType: 'audio/mp3'
                };
            } else {
                return {
                    type: 'wav',
                    mimeType: 'audio/wav'
                };
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
        var APP_ID = {
            "local": '213258518873900',
            "remote": '1425261494379816'
        } //local - KnightsLab, remote - Hadithi

        //init FB auth
        FB.init({
            appId: APP_ID["remote"],
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
        alert("Mobile device detected -- " + device);
    }
    if (hadithi.checkEnableZipping()) console.log("Will ZIP with the audio file generated.");

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
                    alert(msg);
                }
            );
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
                console.error("Something went wrong, maybe the user denied the application access to the MIC");
            }
        });

        //onclick of END recording button
        stopRecordingBtn.on('click', function(event) {
            // event.preventDefault()
            //get the recording
            recorder.stop(); //1st stop it

            //Get type of audio required -- wav or mp3
            var audio = hadithi.audioIsWAVorMp3();

            //get the WAV file encoding from the recording
            //exporting Mono WAV as default now
            recorder.exportWAV(hadithi.processAudioFile, audio.mimeType, audio.type);

            // Converting the WAV to MP# takes some time
            //Show user that you are processing their story;
            if (audio.mimeType === "audio/mp3") {
                $("body").modalmanager("loading");
                setTimeout(function() {
                    $('#progress-header').text("Hey, just a moment! Processing your story...");
                    $('.progress-bar-pink').animate({
                        'width': '100%'
                    });
                    // $('.modal-scrollable').click(); //Remove the modal
                }, 0);
            }

            //Get the whole audio recorded, not encoded yet
            // recorder.getBuffer(function(audioBuffer) {
            //     console.log(audioBuffer);
            // });
        });

    } else {
        //The STREAM API is not available, fallback to Media Capture API
        alert("Browser does not support getUserMedia");

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
        hadithi.checkIfUserExist(function(user) {
            if (user) { //a user exists
                //create formdata with it to be submitted with story
                if (!formdata) formdata = new FormData();

                //GUM should be true for browsers
                //check to see if its from the MIC or a FILE INPUT
                // formdata = GUM ? new FormData() : new FormData(document.forms.namedItem("recorded-file"));
                var af = document.getElementById('recorded-audio');

                //These fields are not given in Personal forms
                if (user.isFacebook == "false") { // == false
                    user.id = "null";
                    user.username = "null";
                    user.first_name = "null";
                    user.last_name = "null";
                    user.link = "null";
                    user.hometown = "null";
                    user.location = "null";
                    user.locale = 'en_GB';
                    user.birthday = "null";
                }
                console.log("User data before uploading -- ", user);

                formdata.append('user_data', JSON.stringify(user));
                // formdata.append('audio_file', GUM ? af.getAttribute('src') : audioInput.files[0]);
                formdata.append('isFacebook', user.isFacebook || false);

                hadithi.uploadAudioFile(formdata);
                hadithi.localStorage('hadithiUser', false); //erase his data, for debugging purposes
            } else {
                hadithi.checkIfUserExist([], true); //true if user dsnt exists, dont use FB
            }
        }, true); //no FB checkin needed
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
            for (var key in fdata) {
                formDataObject[fdata[key].name] = fdata[key].value;
            }
            console.log("User form filled data should be added to \"formdata\" variable");
            console.log(formDataObject);

            //correct the sex toggled -- 'on' for male
            formDataObject.sex = formDataObject.sex === "on" ? "male" : "female";
            // formdata.append('user_data', formDataObject);
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
                console.info("Found user has already recorded a story, trying to upload it once more.");

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

            //Hide QUESTIONARE TAB window
            $('a[href="#user-record"]').on('shown.bs.tab', function(event) {
                //user has already recorded a story, trying to trigger uploading
                console.log("re-fixing the submit function!!!");
                el.on('click', el.func);
            }).click(); //.tab('show');

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
    // $('[data-rel="modal"]').modal();

    $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
        '<div class="loading-spinner" style="width: 250px; margin-left: -125px;">' +
        '<h2 id="progress-header" style="text-align: center; color: #fefefe; padding: 0.3em; background: #2ecc71">Just a moment...</h2>' +
        '<br />' +
        '<div class="progress progress-striped active">' +
        '<div class="progress-bar progress-bar-pink" style="width: 0%;"></div>' +
        '</div>' +
        '</div>';

});