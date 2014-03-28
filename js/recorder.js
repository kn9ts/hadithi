/*
License (MIT)
Copyright © 2014 Eugene Mutai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of 
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

(function(window) {

    var WORKER_PATH = '../js/recorderWorker.js';
    var mp3encoderWorker = new Worker('../js/mp3lib/mp3Worker.js');
    var encoderWorker = mp3encoderWorker;

    /* From the spec: This value controls how frequently the audioprocess event is 
    dispatched and how many sample-frames need to be processed each call. 
    Lower values for buffer size will result in a lower (better) latency. 
    Higher values will be necessary to avoid audio breakup and glitches */

    var Recorder = function(source, cfg) {
        var config = cfg || {};
        var bufferLen = config.bufferLen || 4096;
        this.context = source.context;
        if (!this.context.createScriptProcessor) {
            this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
        } else {
            this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
        }

        //mod sample rate
        config.sampleRate = 11025; //11.025Khz

        var worker = new Worker(config.workerPath || WORKER_PATH);
        var audioStart = {
            command: 'init',
            config: {
                sampleRate: config.sampleRate //this.context.sampleRate //default: 44100 Mhz
            }
        }
        console.log("The sample rate is set at (in KHz)-- " + audioStart.config.sampleRate);
        console.log(source)
        worker.postMessage(audioStart);

        //recoding has not yet began, so set at false
        var recording = false,
            currCallback,
            encodeMp3 = false;

        this.node.onaudioprocess = function(e) {
            if (!recording) return;
            worker.postMessage({
                command: 'record',
                buffer: [
                    e.inputBuffer.getChannelData(0),
                    e.inputBuffer.getChannelData(1)
                ]
            });
        }

        this.configure = function(cfg) {
            for (var prop in cfg) {
                if (cfg.hasOwnProperty(prop)) {
                    config[prop] = cfg[prop];
                }
            }
        }

        this.record = function() {
            recording = true;
        }

        this.stop = function() {
            recording = false;
        }

        this.clear = function() {
            worker.postMessage({
                command: 'clear'
            });
        }

        this.getBuffer = function(cb) {
            currCallback = cb || config.callback;
            worker.postMessage({
                command: 'getBuffer'
            })
        }

        //callback == hadithi.processFile, encode == mp3 | wav
        this.exportWAV = function(cb, audioType, encode) {
            currCallback = cb || config.callback;
            type = audioType || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: 'exportWAV', //exportMonoWAV,
                type: type,
                encodeTo: encode ? encode : 'wav'
            });
        }

        worker.onmessage = function(e) {
            var encodeTo = e.data.cmd;
            var blob = e.data.buf;
            //console.log("the blob " +  blob + " " + blob.size + " " + blob.type);

            //check to see what is to be done
            switch (encodeTo) {
                case 'wav':
                    // pass to callback
                    currCallback(blob, 'audio/wav');
                    break;

                    //Mp3 conversion
                case 'mp3':
                    var arrayBuffer;
                    var fileReader = new FileReader();

                    fileReader.onload = function(event) {
                        arrayBuffer = event.target.result;
                        var buffer = new Uint8Array(arrayBuffer),
                            data = parseWav(buffer);

                        console.log(data);
                        console.log("Converting to Mp3");
                        // log.innerHTML += "\n" + "Converting to Mp3";

                        encoderWorker.postMessage({
                            cmd: 'init',
                            config: {
                                mode: 3,
                                channels: 1,
                                samplerate: data.sampleRate,
                                bitrate: data.bitsPerSample
                            }
                        });

                        encoderWorker.postMessage({
                            cmd: 'encode',
                            buf: Uint8ArrayToFloat32Array(data.samples)
                        });

                        encoderWorker.postMessage({
                            cmd: 'finish'
                        });

                        encoderWorker.onmessage = function(e) {
                            if (e.data.cmd == 'data') {
                                console.log("Done converting to Mp3");
                                // log.innerHTML += "\n" + "Done converting to Mp3";

                                // audio.src = 'data:audio/mp3;base64,' + encode64(e.data.buf);

                                //console.log ("The Mp3 data " + e.data.buf);
                                var mp3Blob = new Blob([new Uint8Array(e.data.buf)], {
                                    type: 'audio/mp3'
                                });

                                //Pass the blob to the callback function
                                currCallback(blob, 'audio/mp3');
                            }
                        }

                    }

                    //Read blob file
                    fileReader.readAsArrayBuffer(blob);
                    break;
            }
        }

        function encode64(buffer) {
            var binary = '',
                bytes = new Uint8Array(buffer),
                len = bytes.byteLength;

            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }

        function parseWav(wav) {
            function readInt(i, bytes) {
                var ret = 0,
                    shft = 0;

                while (bytes) {
                    ret += wav[i] << shft;
                    shft += 8;
                    i++;
                    bytes--;
                }
                return ret;
            }
            if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
            if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
            return {
                sampleRate: readInt(24, 4),
                bitsPerSample: readInt(34, 2),
                samples: wav.subarray(44)
            };
        }

        function Uint8ArrayToFloat32Array(u8a) {
            var f32Buffer = new Float32Array(u8a.length);
            for (var i = 0; i < u8a.length; i++) {
                var value = u8a[i << 1] + (u8a[(i << 1) + 1] << 8);
                if (value >= 0x8000) value |= ~0x7FFF;
                f32Buffer[i] = value / 0x8000;
            }
            return f32Buffer;
        }

        function uploadAudio(mp3Data) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var fd = new FormData();
                var mp3Name = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
                console.log("mp3name = " + mp3Name);
                fd.append('fname', mp3Name);
                fd.append('data', event.target.result);
                $.ajax({
                    type: 'POST',
                    url: 'upload.php',
                    data: fd,
                    processData: false,
                    contentType: false
                }).done(function(data) {
                    //console.log(data);
                    log.innerHTML += "\n" + data;
                });
            };
            reader.readAsDataURL(mp3Data);
        }

        source.connect(this.node);
        this.node.connect(this.context.destination); //this should not be necessary
    };

    Recorder.forceDownload = function(blob, filename) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = window.document.createElement('a');
        link.href = url;
        link.download = filename || 'output.wav';
        var click = document.createEvent("Event");
        click.initEvent("click", true, true);
        link.dispatchEvent(click);
    }

    window.Recorder = Recorder;

})(window);