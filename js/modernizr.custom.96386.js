/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-a_download-audio_audiodata_api-audio_webaudio_api-battery_api-battery_level-blob_constructor-canvas_todataurl_type-cookies-cors-elem_output-elem_progress_meter-file_api-file_filesystem-fullscreen_api-getusermedia-json-network_connection-network_eventsource-network_xhr2-notification-unicode-url_data_uri-load
 */
;

window.Modernizr = (function(window, document, undefined) {

    var version = '2.7.1',

        Modernizr = {},

        enableClasses = true,

        docElement = document.documentElement,

        mod = 'modernizr',
        modElem = document.createElement(mod),
        mStyle = modElem.style,

        inputElem = document.createElement('input'),

        smile = ':)',

        toString = {}.toString,

        prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



        omPrefixes = 'Webkit Moz O ms',

        cssomPrefixes = omPrefixes.split(' '),

        domPrefixes = omPrefixes.toLowerCase().split(' '),

        ns = {
            'svg': 'http://www.w3.org/2000/svg'
        },

        tests = {},
        inputs = {},
        attrs = {},

        classes = [],

        slice = classes.slice,

        featureName,


        injectElementWithStyles = function(rule, callback, nodes, testnames) {

            var style, ret, node, docOverflow,
                div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

            if (parseInt(nodes, 10)) {
                while (nodes--) {
                    node = document.createElement('div');
                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                    div.appendChild(node);
                }
            }

            style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
            div.id = mod;
            (body ? div : fakeBody).innerHTML += style;
            fakeBody.appendChild(div);
            if (!body) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
                docOverflow = docElement.style.overflow;
                docElement.style.overflow = 'hidden';
                docElement.appendChild(fakeBody);
            }

            ret = callback(div, rule);
            if (!body) {
                fakeBody.parentNode.removeChild(fakeBody);
                docElement.style.overflow = docOverflow;
            } else {
                div.parentNode.removeChild(div);
            }

            return !!ret;

        },

        testMediaQuery = function(mq) {

            var matchMedia = window.matchMedia || window.msMatchMedia;
            if (matchMedia) {
                return matchMedia(mq).matches;
            }

            var bool;

            injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function(node) {
                bool = (window.getComputedStyle ?
                    getComputedStyle(node, null) :
                    node.currentStyle)['position'] == 'absolute';
            });

            return bool;

        },


        isEventSupported = (function() {

            var TAGNAMES = {
                'select': 'input',
                'change': 'input',
                'submit': 'form',
                'reset': 'form',
                'error': 'img',
                'load': 'img',
                'abort': 'img'
            };

            function isEventSupported(eventName, element) {

                element = element || document.createElement(TAGNAMES[eventName] || 'div');
                eventName = 'on' + eventName;

                var isSupported = eventName in element;

                if (!isSupported) {
                    if (!element.setAttribute) {
                        element = document.createElement('div');
                    }
                    if (element.setAttribute && element.removeAttribute) {
                        element.setAttribute(eventName, '');
                        isSupported = is(element[eventName], 'function');

                        if (!is(element[eventName], 'undefined')) {
                            element[eventName] = undefined;
                        }
                        element.removeAttribute(eventName);
                    }
                }

                element = null;
                return isSupported;
            }
            return isEventSupported;
        })(),


        _hasOwnProperty = ({}).hasOwnProperty,
        hasOwnProp;

    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
        hasOwnProp = function(object, property) {
            return _hasOwnProperty.call(object, property);
        };
    } else {
        hasOwnProp = function(object, property) {
            return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
        };
    }


    if (!Function.prototype.bind) {
        Function.prototype.bind = function bind(that) {

            var target = this;

            if (typeof target != "function") {
                throw new TypeError();
            }

            var args = slice.call(arguments, 1),
                bound = function() {

                    if (this instanceof bound) {

                        var F = function() {};
                        F.prototype = target.prototype;
                        var self = new F();

                        var result = target.apply(
                            self,
                            args.concat(slice.call(arguments))
                        );
                        if (Object(result) === result) {
                            return result;
                        }
                        return self;

                    } else {

                        return target.apply(
                            that,
                            args.concat(slice.call(arguments))
                        );

                    }

                };

            return bound;
        };
    }

    function setCss(str) {
        mStyle.cssText = str;
    }

    function setCssAll(str1, str2) {
        return setCss(prefixes.join(str1 + ';') + (str2 || ''));
    }

    function is(obj, type) {
        return typeof obj === type;
    }

    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) {

                if (elem === false) return props[i];

                if (is(item, 'function')) {
                    return item.bind(elem || obj);
                }

                return item;
            }
        }
        return false;
    }

    function testPropsAll(prop, prefixed, elem) {

        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        if (is(prefixed, "string") || is(prefixed, "undefined")) {
            return testProps(props, prefixed);

        } else {
            props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }
    tests['flexbox'] = function() {
        return testPropsAll('flexWrap');
    };
    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };



    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };


    tests['touch'] = function() {
        var bool;

        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            bool = true;
        } else {
            injectElementWithStyles(['@media (', prefixes.join('touch-enabled),('), mod, ')', '{#modernizr{top:9px;position:absolute}}'].join(''), function(node) {
                bool = node.offsetTop === 9;
            });
        }

        return bool;
    };



    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
        return !!window.postMessage;
    };


    tests['websqldatabase'] = function() {
        return !!window.openDatabase;
    };

    tests['indexedDB'] = function() {
        return !!testPropsAll("indexedDB", window);
    };

    tests['hashchange'] = function() {
        return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    tests['history'] = function() {
        return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    tests['rgba'] = function() {
        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        setCss('background:url(https://),url(https://),red url(https://)');

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };
    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };



    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        setCssAll('opacity:.55');

        return (/^0.55$/).test(mStyle.opacity);
    };


    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
            (str1 + '-webkit- '.split(' ').join(str2 + str1) +
                prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !! testPropsAll('perspective');

        if (ret && 'webkitPerspective' in docElement.style) {

            injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function(node, rule) {
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
            var style = document.getElementById('smodernizr'),
                sheet = style.sheet || style.styleSheet,
                cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

            bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };

    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#', mod, '{font:0/0 a}#', mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}'].join(''), function(node) {
            bool = node.offsetHeight >= 3;
        });

        return bool;
    };
    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        try {
            if (bool = !! elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');

                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
            }

        } catch (e) {}

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if (bool = !! elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
                bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, '');

                bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
                bool.m4a = (elem.canPlayType('audio/x-m4a;') ||
                    elem.canPlayType('audio/aac;')).replace(/^no$/, '');
            }
        } catch (e) {}

        return bool;
    };


    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    tests['svg'] = function() {
        return !!document.createElementNS && !! document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    tests['inlinesvg'] = function() {
        var div = document.createElement('div');
        div.innerHTML = '<svg/>';
        return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };


    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    function webforms() {
        Modernizr['input'] = (function(props) {
            for (var i = 0, len = props.length; i < len; i++) {
                attrs[props[i]] = !! (props[i] in inputElem);
            }
            if (attrs.list) {
                attrs.list = !! (document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        Modernizr['inputtypes'] = (function(props) {

            for (var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                if (bool) {

                    inputElem.value = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {

                        docElement.appendChild(inputElem);
                        defaultView = document.defaultView;

                        bool = defaultView.getComputedStyle &&
                            defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                            (inputElem.offsetHeight !== 0);

                        docElement.removeChild(inputElem);

                    } else if (/^(search|tel)$/.test(inputElemType)) {} else if (/^(url|email)$/.test(inputElemType)) {
                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                        bool = inputElem.value != smile;
                    }
                }

                inputs[props[i]] = !! bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
    }
    for (var feature in tests) {
        if (hasOwnProp(tests, feature)) {
            featureName = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    Modernizr.input || webforms();


    Modernizr.addTest = function(feature, test) {
        if (typeof feature == 'object') {
            for (var key in feature) {
                if (hasOwnProp(feature, key)) {
                    Modernizr.addTest(key, feature[key]);
                }
            }
        } else {

            feature = feature.toLowerCase();

            if (Modernizr[feature] !== undefined) {
                return Modernizr;
            }

            test = typeof test == 'function' ? test() : test;

            if (typeof enableClasses !== "undefined" && enableClasses) {
                docElement.className += ' ' + (test ? '' : 'no-') + feature;
            }
            Modernizr[feature] = test;

        }

        return Modernizr;
    };


    setCss('');
    modElem = inputElem = null;

    ;
    (function(window, document) {
        var version = '3.7.0';

        var options = window.html5 || {};

        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        var supportsHtml5Styles;

        var expando = '_html5shiv';

        var expanID = 0;

        var expandoData = {};

        var supportsUnknownElements;

        (function() {
            try {
                var a = document.createElement('a');
                a.innerHTML = '<xyz></xyz>';
                supportsHtml5Styles = ('hidden' in a);

                supportsUnknownElements = a.childNodes.length == 1 || (function() {
                    (document.createElement)('a');
                    var frag = document.createDocumentFragment();
                    return (
                        typeof frag.cloneNode == 'undefined' ||
                        typeof frag.createDocumentFragment == 'undefined' ||
                        typeof frag.createElement == 'undefined'
                    );
                }());
            } catch (e) {
                supportsHtml5Styles = true;
                supportsUnknownElements = true;
            }

        }());

        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement('p'),
                parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

            p.innerHTML = 'x<style>' + cssText + '</style>';
            return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        function getElements() {
            var elements = html5.elements;
            return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            if (!data) {
                data = {};
                expanID++;
                ownerDocument[expando] = expanID;
                expandoData[expanID] = data;
            }
            return data;
        }

        function createElement(nodeName, ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createElement(nodeName);
            }
            if (!data) {
                data = getExpandoData(ownerDocument);
            }
            var node;

            if (data.cache[nodeName]) {
                node = data.cache[nodeName].cloneNode();
            } else if (saveClones.test(nodeName)) {
                node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
            } else {
                node = data.createElem(nodeName);
            }

            return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        function createDocumentFragment(ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createDocumentFragment();
            }
            data = data || getExpandoData(ownerDocument);
            var clone = data.frag.cloneNode(),
                i = 0,
                elems = getElements(),
                l = elems.length;
            for (; i < l; i++) {
                clone.createElement(elems[i]);
            }
            return clone;
        }

        function shivMethods(ownerDocument, data) {
            if (!data.cache) {
                data.cache = {};
                data.createElem = ownerDocument.createElement;
                data.createFrag = ownerDocument.createDocumentFragment;
                data.frag = data.createFrag();
            }


            ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) {
                    return data.createElem(nodeName);
                }
                return createElement(nodeName, ownerDocument, data);
            };

            ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                'var n=f.cloneNode(),c=n.createElement;' +
                'h.shivMethods&&(' +
                getElements().join().replace(/[\w\-]+/g, function(nodeName) {
                    data.createElem(nodeName);
                    data.frag.createElement(nodeName);
                    return 'c("' + nodeName + '")';
                }) +
                ');return n}'
            )(html5, data.frag);
        }

        function shivDocument(ownerDocument) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            var data = getExpandoData(ownerDocument);

            if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
                data.hasCSS = !! addStyleSheet(ownerDocument,
                    'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                    'mark{background:#FF0;color:#000}' +
                    'template{display:none}'
                );
            }
            if (!supportsUnknownElements) {
                shivMethods(ownerDocument, data);
            }
            return ownerDocument;
        }

        var html5 = {

            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

            'version': version,

            'shivCSS': (options.shivCSS !== false),

            'supportsUnknownElements': supportsUnknownElements,

            'shivMethods': (options.shivMethods !== false),

            'type': 'default',

            'shivDocument': shivDocument,

            createElement: createElement,

            createDocumentFragment: createDocumentFragment
        };

        window.html5 = html5;

        shivDocument(document);

    }(this, document));

    Modernizr._version = version;

    Modernizr._prefixes = prefixes;
    Modernizr._domPrefixes = domPrefixes;
    Modernizr._cssomPrefixes = cssomPrefixes;

    Modernizr.mq = testMediaQuery;

    Modernizr.hasEvent = isEventSupported;

    Modernizr.testProp = function(prop) {
        return testProps([prop]);
    };

    Modernizr.testAllProps = testPropsAll;


    Modernizr.testStyles = injectElementWithStyles;
    Modernizr.prefixed = function(prop, obj, elem) {
        if (!obj) {
            return testPropsAll(prop, 'pfx');
        } else {
            return testPropsAll(prop, obj, elem);
        }
    };


    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {}

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function() {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }
        var j = j || B.errorTimeout,
            l = b.createElement(a),
            o = 0,
            r = 0,
            u = {
                t: d,
                s: c,
                e: f,
                a: i,
                x: j
            };
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        }, a
    }
    var l = b.documentElement,
        m = a.setTimeout,
        n = b.getElementsByTagName("script")[0],
        o = {}.toString,
        p = [],
        q = 0,
        r = "MozAppearance" in l.style,
        s = r && !! b.createRange().compareNode,
        t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera),
        l = !! b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img",
        v = l ? "script" : u,
        w = Array.isArray || function(a) {
            return "[object Array]" == o.call(a)
        }, x = [],
        y = {}, z = {
            timeout: function(a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        }, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"),
                b = x.length,
                c = a.pop(),
                d = a.length,
                c = {
                    url: c,
                    origUrl: c,
                    prefixes: a
                }, e, f, g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a),
                j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h);
                    else if (Object(a) === a)
                        for (n in m = function() {
                            var b = 0,
                                c;
                            for (c in a) a.hasOwnProperty(c) && b++;
                            return b
                        }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        } : j[n] = function(a) {
                            return function() {
                                var b = [].slice.call(arguments);
                                a && a.apply(this, b), l()
                            }
                        }(k[n])), g(a[n], j, b, n, h))
                } else !c && l()
            }
            var h = !! a.test,
                i = a.load || a.both,
                j = a.callback || f,
                k = j,
                l = a.complete || f,
                m, n;
            c(h ? a.yep : a.nope, !! i), i && c(i)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0);
        else if (w(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
        else Object(a) === a && h(a, l)
    }, B.addPrefix = function(a, b) {
        z[a] = b
    }, B.addFilter = function(a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"),
            l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function() {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"),
            j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
})(this, document);
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
};

// a[download] attribute
// When used on an <a>, this attribute signifies that the resource it
// points to should be downloaded by the browser rather than navigating to it.
// http://developers.whatwg.org/links.html#downloading-resources
// By Addy Osmani

Modernizr.addTest('adownload', 'download' in document.createElement('a'));

// Battery API
// https://developer.mozilla.org/en/DOM/window.navigator.mozBattery
// By: Paul Sayre

Modernizr.addTest('battery', !! Modernizr.prefixed('battery', navigator));
// Low Battery Level
// Enable a developer to remove CPU intensive CSS/JS when battery is low
// developer.mozilla.org/en/DOM/window.navigator.mozBattery
// By: Paul Sayre

Modernizr.addTest('lowbattery', function() {
    var minLevel = 0.20,
        battery = Modernizr.prefixed('battery', navigator);
    return !!(battery && !battery.charging && battery.level <= minLevel);
});
// Blob constructor
// http://dev.w3.org/2006/webapi/FileAPI/#constructorBlob

Modernizr.addTest('blobconstructor', function() {
    try {
        return !!new Blob();
    } catch (e) {
        return false;
    }
});
// canvas.toDataURL type support
// http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-todataurl

// This test is asynchronous. Watch out.

(function() {

    if (!Modernizr.canvas) {
        return false;
    }

    var image = new Image(),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    image.onload = function() {
        ctx.drawImage(image, 0, 0);

        Modernizr.addTest('todataurljpeg', function() {
            return canvas.toDataURL('image/jpeg').indexOf('data:image/jpeg') === 0;
        });
        Modernizr.addTest('todataurlwebp', function() {
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        });
    };

    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
}());

// by tauren
// https://github.com/Modernizr/Modernizr/issues/191

Modernizr.addTest('cookies', function() {
    // Quick test if browser has cookieEnabled host property
    if (navigator.cookieEnabled) return true;
    // Create cookie
    document.cookie = "cookietest=1";
    var ret = document.cookie.indexOf("cookietest=") != -1;
    // Delete cookie
    document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return ret;
});

// cors
// By Theodoor van Donge
Modernizr.addTest('cors', !! (window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())); // <output>
// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-button-element.html#the-output-element
// by Addy Osmani
Modernizr.addTest('outputelem', 'value' in document.createElement('output'));
//By Stefan Wallin

//tests for progressbar-support. All browsers that don't support progressbar returns undefined =)
Modernizr.addTest("progressbar", function() {
    return document.createElement('progress').max !== undefined;
});

//tests for meter-support. All browsers that don't support meters returns undefined =)
Modernizr.addTest("meter", function() {
    return document.createElement('meter').max !== undefined;
});
/**
 * file tests for the File API specification
 *   Tests for objects specific to the File API W3C specification without
 *   being redundant (don't bother testing for Blob since it is assumed
 *   to be the File object's prototype.
 *
 *   Will fail in Safari 5 due to its lack of support for the standards
 *   defined FileReader object
 */
Modernizr.addTest('filereader', function() {
    return !!(window.File && window.FileList && window.FileReader);
});
// Filesystem API
// dev.w3.org/2009/dap/file-system/file-dir-sys.html

// The API will be present in Chrome incognito, but will throw an exception.
// See crbug.com/93417
//
// By Eric Bidelman (@ebidel)

Modernizr.addTest('filesystem', !! Modernizr.prefixed('requestFileSystem', window));
Modernizr.addTest('fullscreen', function() {
    for (var i = 0; i < Modernizr._domPrefixes.length; i++) {
        if (document[Modernizr._domPrefixes[i].toLowerCase() + 'CancelFullScreen'])
            return true;
    }
    return !!document['cancelFullScreen'] || false;
});

// http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html#//apple_ref/doc/uid/TP40009523-CH3-SW20
// https://developer.mozilla.org/en/API/Fullscreen
// Web Audio API
// https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
// By Addy Osmani
Modernizr.addTest('webaudio', !! (window.webkitAudioContext || window.AudioContext));
// getUserMedia
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video-conferencing-and-peer-to-peer-communication.html
// By Eric Bidelman

Modernizr.addTest('getusermedia', !! Modernizr.prefixed('getUserMedia', navigator)); // determining low-bandwidth via navigator.connection

// There are two iterations of the navigator.connection interface:

// The first is present in Android 2.2+ and only in the Browser (not WebView)
// : docs.phonegap.com/en/1.2.0/phonegap_connection_connection.md.html#connection.type
// : davidbcalhoun.com/2010/using-navigator-connection-android

// The second is specced at dev.w3.org/2009/dap/netinfo/ and perhaps landing in WebKit
// : bugs.webkit.org/show_bug.cgi?id=73528

// unknown devices are assumed as fast
// for more rigorous network testing, consider boomerang.js: github.com/bluesmoon/boomerang/

Modernizr.addTest('lowbandwidth', function() {

    var connection = navigator.connection || {
        type: 0
    }; // polyfill

    return connection.type == 3 || // connection.CELL_2G
    connection.type == 4 || // connection.CELL_3G
    /^[23]g$/.test(connection.type); // string value in new spec
});


// XML HTTP Request Level 2
// www.w3.org/TR/XMLHttpRequest2/

// Much more details at github.com/Modernizr/Modernizr/issues/385

// all three of these details report consistently across all target browsers:
//   !!(window.ProgressEvent);
//   !!(window.FormData);
//   window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest;

Modernizr.addTest('xhr2', 'FormData' in window);

// server sent events aka eventsource
// dev.w3.org/html5/eventsource/

Modernizr.addTest('eventsource', !! window.EventSource);
// Notifications
// By Theodoor van Donge

// window.webkitNotifications is only used by Chrome 
//  http://www.html5rocks.com/en/tutorials/notifications/quick/

// window.Notification only exist in the draft specs 
//  http://dev.w3.org/2006/webapi/WebNotifications/publish/Notifications.html#idl-if-Notification

Modernizr.addTest('notification', !! Modernizr.prefixed('Notifications', window));
/**
 * Unicode special character support
 *
 * Detection is made by testing missing glyph box rendering against star character
 * If widths are the same, this "probably" means the browser didn't support the star character and rendered a glyph box instead
 * Just need to ensure the font characters have different widths
 *
 * Warning : positive Unicode support doesn't mean you can use it inside <title>, this seams more related to OS & Language packs
 */
Modernizr.addTest('unicode', function() {


    var bool,

        missingGlyph = document.createElement('span'),

        star = document.createElement('span');

    Modernizr.testStyles('#modernizr{font-family:Arial,sans;font-size:300em;}', function(node) {

        missingGlyph.innerHTML = '&#5987';
        star.innerHTML = '&#9734';

        node.appendChild(missingGlyph);
        node.appendChild(star);

        bool = 'offsetWidth' in missingGlyph && missingGlyph.offsetWidth !== star.offsetWidth;
    });

    return bool;

}); // data uri test.
// https://github.com/Modernizr/Modernizr/issues/14

// This test is asynchronous. Watch out.


// in IE7 in HTTPS this can cause a Mixed Content security popup. 
//  github.com/Modernizr/Modernizr/issues/362
// To avoid that you can create a new iframe and inject this.. perhaps..


(function() {

    var datauri = new Image();


    datauri.onerror = function() {
        Modernizr.addTest('datauri', function() {
            return false;
        });
    };
    datauri.onload = function() {
        Modernizr.addTest('datauri', function() {
            return (datauri.width == 1 && datauri.height == 1);
        });
    };

    datauri.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

})();
// Mozilla Audio Data API
// https://wiki.mozilla.org/Audio_Data_API
// by Addy Osmani
Modernizr.addTest('audiodata', !! (window.Audio));
// native JSON support.
// developer.mozilla.org/en/JSON

// this will also succeed if you've loaded the JSON2.js polyfill ahead of time
//   ... but that should be obvious. :)

Modernizr.addTest('json', !! window.JSON && !! JSON.parse);;