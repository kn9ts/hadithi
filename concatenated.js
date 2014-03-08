if(!("ace" in window)){window.ace={}}ace.config={cookie_expiry:604800,storage_method:2};ace.settings={is:function(b,a){return(ace.data.get("settings",b+"-"+a)==1)},exists:function(b,a){return(ace.data.get("settings",b+"-"+a)!==null)},set:function(b,a){ace.data.set("settings",b+"-"+a,1)},unset:function(b,a){ace.data.set("settings",b+"-"+a,-1)},remove:function(b,a){ace.data.remove("settings",b+"-"+a)},navbar_fixed:function(a){a=a||false;if(!a&&ace.settings.is("sidebar","fixed")){ace.settings.sidebar_fixed(false)}var b=document.getElementById("navbar");if(a){if(!ace.hasClass(b,"navbar-fixed-top")){ace.addClass(b,"navbar-fixed-top")}if(!ace.hasClass(document.body,"navbar-fixed")){ace.addClass(document.body,"navbar-fixed")}ace.settings.set("navbar","fixed")}else{ace.removeClass(b,"navbar-fixed-top");ace.removeClass(document.body,"navbar-fixed");ace.settings.unset("navbar","fixed")}document.getElementById("ace-settings-navbar").checked=a},breadcrumbs_fixed:function(a){a=a||false;if(a&&!ace.settings.is("sidebar","fixed")){ace.settings.sidebar_fixed(true)}var b=document.getElementById("breadcrumbs");if(a){if(!ace.hasClass(b,"breadcrumbs-fixed")){ace.addClass(b,"breadcrumbs-fixed")}if(!ace.hasClass(document.body,"breadcrumbs-fixed")){ace.addClass(document.body,"breadcrumbs-fixed")}ace.settings.set("breadcrumbs","fixed")}else{ace.removeClass(b,"breadcrumbs-fixed");ace.removeClass(document.body,"breadcrumbs-fixed");ace.settings.unset("breadcrumbs","fixed")}document.getElementById("ace-settings-breadcrumbs").checked=a},sidebar_fixed:function(a){a=a||false;if(!a&&ace.settings.is("breadcrumbs","fixed")){ace.settings.breadcrumbs_fixed(false)}if(a&&!ace.settings.is("navbar","fixed")){ace.settings.navbar_fixed(true)}var b=document.getElementById("sidebar");if(a){if(!ace.hasClass(b,"sidebar-fixed")){ace.addClass(b,"sidebar-fixed")}ace.settings.set("sidebar","fixed")}else{ace.removeClass(b,"sidebar-fixed");ace.settings.unset("sidebar","fixed")}document.getElementById("ace-settings-sidebar").checked=a},main_container_fixed:function(a){a=a||false;var c=document.getElementById("main-container");var b=document.getElementById("navbar-container");if(a){if(!ace.hasClass(c,"container")){ace.addClass(c,"container")}if(!ace.hasClass(b,"container")){ace.addClass(b,"container")}ace.settings.set("main-container","fixed")}else{ace.removeClass(c,"container");ace.removeClass(b,"container");ace.settings.unset("main-container","fixed")}document.getElementById("ace-settings-add-container").checked=a;if(navigator.userAgent.match(/webkit/i)){var d=document.getElementById("sidebar");ace.toggleClass(d,"menu-min");setTimeout(function(){ace.toggleClass(d,"menu-min")},0)}},sidebar_collapsed:function(c){c=c||false;var e=document.getElementById("sidebar");var d=document.getElementById("sidebar-collapse").querySelector('[class*="icon-"]');var b=d.getAttribute("data-icon1");var a=d.getAttribute("data-icon2");if(c){ace.addClass(e,"menu-min");ace.removeClass(d,b);ace.addClass(d,a);ace.settings.set("sidebar","collapsed")}else{ace.removeClass(e,"menu-min");ace.removeClass(d,a);ace.addClass(d,b);ace.settings.unset("sidebar","collapsed")}},};ace.settings.check=function(c,e){if(!ace.settings.exists(c,e)){return}var a=ace.settings.is(c,e);var b={"navbar-fixed":"navbar-fixed-top","sidebar-fixed":"sidebar-fixed","breadcrumbs-fixed":"breadcrumbs-fixed","sidebar-collapsed":"menu-min","main-container-fixed":"container"};var d=document.getElementById(c);if(a!=ace.hasClass(d,b[c+"-"+e])){ace.settings[c.replace("-","_")+"_"+e](a)}};ace.data_storage=function(e,c){var b="ace.";var d=null;var a=0;if((e==1||e===c)&&"localStorage" in window&&window.localStorage!==null){d=ace.storage;a=1}else{if(d==null&&(e==2||e===c)&&"cookie" in document&&document.cookie!==null){d=ace.cookie;a=2}}this.set=function(h,g,i,k){if(!d){return}if(i===k){i=g;g=h;if(i==null){d.remove(b+g)}else{if(a==1){d.set(b+g,i)}else{if(a==2){d.set(b+g,i,ace.config.cookie_expiry)}}}}else{if(a==1){if(i==null){d.remove(b+h+"."+g)}else{d.set(b+h+"."+g,i)}}else{if(a==2){var j=d.get(b+h);var f=j?JSON.parse(j):{};if(i==null){delete f[g];if(ace.sizeof(f)==0){d.remove(b+h);return}}else{f[g]=i}d.set(b+h,JSON.stringify(f),ace.config.cookie_expiry)}}}};this.get=function(h,g,j){if(!d){return null}if(g===j){g=h;return d.get(b+g)}else{if(a==1){return d.get(b+h+"."+g)}else{if(a==2){var i=d.get(b+h);var f=i?JSON.parse(i):{};return g in f?f[g]:null}}}};this.remove=function(g,f,h){if(!d){return}if(f===h){f=g;this.set(f,null)}else{this.set(g,f,null)}}};ace.cookie={get:function(c){var d=document.cookie,g,f=c+"=",a;if(!d){return}a=d.indexOf("; "+f);if(a==-1){a=d.indexOf(f);if(a!=0){return null}}else{a+=2}g=d.indexOf(";",a);if(g==-1){g=d.length}return decodeURIComponent(d.substring(a+f.length,g))},set:function(b,e,a,g,c,f){var h=new Date();if(typeof(a)=="object"&&a.toGMTString){a=a.toGMTString()}else{if(parseInt(a,10)){h.setTime(h.getTime()+(parseInt(a,10)*1000));a=h.toGMTString()}else{a=""}}document.cookie=b+"="+encodeURIComponent(e)+((a)?"; expires="+a:"")+((g)?"; path="+g:"")+((c)?"; domain="+c:"")+((f)?"; secure":"")},remove:function(a,b){this.set(a,"",-1000,b)}};ace.storage={get:function(a){return window.localStorage.getItem(a)},set:function(a,b){window.localStorage.setItem(a,b)},remove:function(a){window.localStorage.removeItem(a)}};ace.sizeof=function(c){var b=0;for(var a in c){if(c.hasOwnProperty(a)){b++}}return b};ace.hasClass=function(b,a){return(" "+b.className+" ").indexOf(" "+a+" ")>-1};ace.addClass=function(c,b){if(!ace.hasClass(c,b)){var a=c.className;c.className=a+(a.length?" ":"")+b}};ace.removeClass=function(b,a){ace.replaceClass(b,a)};ace.replaceClass=function(c,b,d){var a=new RegExp(("(^|\\s)"+b+"(\\s|$)"),"i");c.className=c.className.replace(a,function(e,g,f){return d?(g+d+f):" "}).replace(/^\s+|\s+$/g,"")};ace.toggleClass=function(b,a){if(ace.hasClass(b,a)){ace.removeClass(b,a)}else{ace.addClass(b,a)}};ace.data=new ace.data_storage(ace.config.storage_method);
/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if(!jQuery)throw new Error("Bootstrap requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");"radio"===b.prop("type")&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(window.jQuery),+function(a){"use strict";function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown"),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("dropdown");d||c.data("dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show),void 0):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;if("top"==b&&j!=f&&(c=!0,a.top=a.top+f-j),/bottom|top/.test(b)){var k=0;a.left<0&&(k=-2*a.left,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach()}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery);
if(!("ace" in window)){window.ace={}}jQuery(function(){window.ace.click_event=$.fn.tap?"tap":"click"});(function(e,c){var d="multiple" in document.createElement("INPUT");var j="FileList" in window;var b="FileReader" in window;var f=function(l,m){var k=this;this.settings=e.extend({},e.fn.ace_file_input.defaults,m);this.$element=e(l);this.element=l;this.disabled=false;this.can_reset=true;this.$element.on("change.ace_inner_call",function(o,n){if(n===true){return}return a.call(k)});this.$element.wrap('<div class="ace-file-input" />');this.apply_settings()};f.error={FILE_LOAD_FAILED:1,IMAGE_LOAD_FAILED:2,THUMBNAIL_FAILED:3};f.prototype.apply_settings=function(){var l=this;var k=!!this.settings.icon_remove;this.multi=this.$element.attr("multiple")&&d;this.well_style=this.settings.style=="well";if(this.well_style){this.$element.parent().addClass("ace-file-multiple")}else{this.$element.parent().removeClass("ace-file-multiple")}this.$element.parent().find(":not(input[type=file])").remove();this.$element.after('<label class="file-label" data-title="'+this.settings.btn_choose+'"><span class="file-name" data-title="'+this.settings.no_file+'">'+(this.settings.no_icon?'<i class="'+this.settings.no_icon+'"></i>':"")+"</span></label>"+(k?'<a class="remove" href="#"><i class="'+this.settings.icon_remove+'"></i></a>':""));this.$label=this.$element.next();this.$label.on("click",function(){if(!this.disabled&&!l.element.disabled&&!l.$element.attr("readonly")){l.$element.click()}});if(k){this.$label.next("a").on(ace.click_event,function(){if(!l.can_reset){return false}var m=true;if(l.settings.before_remove){m=l.settings.before_remove.call(l.element)}if(!m){return false}return l.reset_input()})}if(this.settings.droppable&&j){g.call(this)}};f.prototype.show_file_list=function(k){var n=typeof k==="undefined"?this.$element.data("ace_input_files"):k;if(!n||n.length==0){return}if(this.well_style){this.$label.find(".file-name").remove();if(!this.settings.btn_change){this.$label.addClass("hide-placeholder")}}this.$label.attr("data-title",this.settings.btn_change).addClass("selected");for(var p=0;p<n.length;p++){var l=typeof n[p]==="string"?n[p]:e.trim(n[p].name);var q=l.lastIndexOf("\\")+1;if(q==0){q=l.lastIndexOf("/")+1}l=l.substr(q);var m="icon-file";if((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(l)){m="icon-picture"}else{if((/\.(mpe?g|flv|mov|avi|swf|mp4|mkv|webm|wmv|3gp)$/i).test(l)){m="icon-film"}else{if((/\.(mp3|ogg|wav|wma|amr|aac)$/i).test(l)){m="icon-music"}}}if(!this.well_style){this.$label.find(".file-name").attr({"data-title":l}).find('[class*="icon-"]').attr("class",m)}else{this.$label.append('<span class="file-name" data-title="'+l+'"><i class="'+m+'"></i></span>');var r=e.trim(n[p].type);var o=b&&this.settings.thumbnail&&((r.length>0&&r.match("image"))||(r.length==0&&m=="icon-picture"));if(o){var s=this;e.when(i.call(this,n[p])).fail(function(t){if(s.settings.preview_error){s.settings.preview_error.call(s,l,t.code)}})}}}return true};f.prototype.reset_input=function(){this.$label.attr({"data-title":this.settings.btn_choose,"class":"file-label"}).find(".file-name:first").attr({"data-title":this.settings.no_file,"class":"file-name"}).find('[class*="icon-"]').attr("class",this.settings.no_icon).prev("img").remove();if(!this.settings.no_icon){this.$label.find('[class*="icon-"]').remove()}this.$label.find(".file-name").not(":first").remove();if(this.$element.data("ace_input_files")){this.$element.removeData("ace_input_files");this.$element.removeData("ace_input_method")}this.reset_input_field();return false};f.prototype.reset_input_field=function(){this.$element.wrap("<form>").closest("form").get(0).reset();this.$element.unwrap()};f.prototype.enable_reset=function(k){this.can_reset=k};f.prototype.disable=function(){this.disabled=true;this.$element.attr("disabled","disabled").addClass("disabled")};f.prototype.enable=function(){this.disabled=false;this.$element.removeAttr("disabled").removeClass("disabled")};f.prototype.files=function(){return e(this).data("ace_input_files")||null};f.prototype.method=function(){return e(this).data("ace_input_method")||""};f.prototype.update_settings=function(k){this.settings=e.extend({},this.settings,k);this.apply_settings()};var g=function(){var l=this;var k=this.element.parentNode;e(k).on("dragenter",function(m){m.preventDefault();m.stopPropagation()}).on("dragover",function(m){m.preventDefault();m.stopPropagation()}).on("drop",function(q){q.preventDefault();q.stopPropagation();var p=q.originalEvent.dataTransfer;var o=p.files;if(!l.multi&&o.length>1){var n=[];n.push(o[0]);o=n}var m=true;if(l.settings.before_change){m=l.settings.before_change.call(l.element,o,true)}if(!m||m.length==0){return false}if(m instanceof Array||(j&&m instanceof FileList)){o=m}l.$element.data("ace_input_files",o);l.$element.data("ace_input_method","drop");l.show_file_list(o);l.$element.triggerHandler("change",[true]);return true})};var a=function(){var l=true;if(this.settings.before_change){l=this.settings.before_change.call(this.element,this.element.files||[this.element.value],false)}if(!l||l.length==0){if(!this.$element.data("ace_input_files")){this.reset_input_field()}return false}var m=!j?null:((l instanceof Array||l instanceof FileList)?l:this.element.files);this.$element.data("ace_input_method","select");if(m&&m.length>0){this.$element.data("ace_input_files",m)}else{var k=e.trim(this.element.value);if(k&&k.length>0){m=[];m.push(k);this.$element.data("ace_input_files",m)}}if(!m||m.length==0){return false}this.show_file_list(m);return true};var i=function(o){var n=this;var l=n.$label.find(".file-name:last");var m=new e.Deferred;var k=new FileReader();k.onload=function(q){l.prepend("<img class='middle' style='display:none;' />");var p=l.find("img:last").get(0);e(p).one("load",function(){var t=50;if(n.settings.thumbnail=="large"){t=150}else{if(n.settings.thumbnail=="fit"){t=l.width()}}l.addClass(t>50?"large":"");var s=h(p,t,o.type);if(s==null){e(this).remove();m.reject({code:f.error.THUMBNAIL_FAILED});return}var r=s.w,u=s.h;if(n.settings.thumbnail=="small"){r=u=t}e(p).css({"background-image":"url("+s.src+")",width:r,height:u}).data("thumb",s.src).attr({src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="}).show();m.resolve()}).one("error",function(){l.find("img").remove();m.reject({code:f.error.IMAGE_LOAD_FAILED})});p.src=q.target.result};k.onerror=function(p){m.reject({code:f.error.FILE_LOAD_FAILED})};k.readAsDataURL(o);return m.promise()};var h=function(n,s,q){var r=n.width,o=n.height;if(r>s||o>s){if(r>o){o=parseInt(s/r*o);r=s}else{r=parseInt(s/o*r);o=s}}var m;try{var l=document.createElement("canvas");l.width=r;l.height=o;var k=l.getContext("2d");k.drawImage(n,0,0,n.width,n.height,0,0,r,o);m=l.toDataURL()}catch(p){m=null}if(!(/^data\:image\/(png|jpe?g|gif);base64,[0-9A-Za-z\+\/\=]+$/.test(m))){m=null}if(!m){return null}return{src:m,w:r,h:o}};e.fn.ace_file_input=function(m,n){var l;var k=this.each(function(){var q=e(this);var p=q.data("ace_file_input");var o=typeof m==="object"&&m;if(!p){q.data("ace_file_input",(p=new f(this,o)))}if(typeof m==="string"){l=p[m](n)}});return(l===c)?k:l};e.fn.ace_file_input.defaults={style:false,no_file:"No File ...",no_icon:"icon-upload-alt",btn_choose:"Choose",btn_change:"Change",icon_remove:"icon-remove",droppable:false,thumbnail:false,before_change:null,before_remove:null,preview_error:null}})(window.jQuery);(function(a,b){a.fn.ace_spinner=function(c){this.each(function(){var f=c.icon_up||"icon-chevron-up";var j=c.icon_down||"icon-chevron-down";var h=c.on_sides||false;var e=c.btn_up_class||"";var g=c.btn_down_class||"";var d=c.max||999;d=(""+d).length;a(this).addClass("spinner-input form-control").wrap('<div class="ace-spinner">');var k=a(this).closest(".ace-spinner").spinner(c).wrapInner("<div class='input-group'></div>");if(h){a(this).before('<div class="spinner-buttons input-group-btn">							<button type="button" class="btn spinner-down btn-xs '+g+'">								<i class="'+j+'"></i>							</button>						</div>').after('<div class="spinner-buttons input-group-btn">							<button type="button" class="btn spinner-up btn-xs '+e+'">								<i class="'+f+'"></i>							</button>						</div>');k.addClass("touch-spinner");k.css("width",(d*20+40)+"px")}else{a(this).after('<div class="spinner-buttons input-group-btn">							<button type="button" class="btn spinner-up btn-xs '+e+'">								<i class="'+f+'"></i>							</button>							<button type="button" class="btn spinner-down btn-xs '+g+'">								<i class="'+j+'"></i>							</button>						</div>');if("ontouchend" in document||c.touch_spinner){k.addClass("touch-spinner");k.css("width",(d*20+40)+"px")}else{a(this).next().addClass("btn-group-vertical");k.css("width",(d*20+10)+"px")}}a(this).on("mousewheel DOMMouseScroll",function(l){var m=l.originalEvent.detail<0||l.originalEvent.wheelDelta>0?1:-1;k.spinner("step",m>0);k.spinner("triggerChangedEvent");return false});var i=a(this);k.on("changed",function(){i.trigger("change")})});return this}})(window.jQuery);(function(a,b){a.fn.ace_wizard=function(c){this.each(function(){var e=a(this);e.wizard();var d=e.siblings(".wizard-actions").eq(0);var f=e.data("wizard");f.$prevBtn.remove();f.$nextBtn.remove();f.$prevBtn=d.find(".btn-prev").eq(0).on(ace.click_event,function(){e.wizard("previous")}).attr("disabled","disabled");f.$nextBtn=d.find(".btn-next").eq(0).on(ace.click_event,function(){e.wizard("next")}).removeAttr("disabled");f.nextText=f.$nextBtn.text()});return this}})(window.jQuery);(function(a,b){a.fn.ace_colorpicker=function(c){var d=a.extend({pull_right:false,caret:true},c);this.each(function(){var g=a(this);var e="";var f="";a(this).hide().find("option").each(function(){var h="colorpick-btn";if(this.selected){h+=" selected";f=this.value}e+='<li><a class="'+h+'" href="#" style="background-color:'+this.value+';" data-color="'+this.value+'"></a></li>'}).end().on("change.ace_inner_call",function(){a(this).next().find(".btn-colorpicker").css("background-color",this.value)}).after('<div class="dropdown dropdown-colorpicker"><a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="btn-colorpicker" style="background-color:'+f+'"></span></a><ul class="dropdown-menu'+(d.caret?" dropdown-caret":"")+(d.pull_right?" pull-right":"")+'">'+e+"</ul></div>").next().find(".dropdown-menu").on(ace.click_event,function(j){var h=a(j.target);if(!h.is(".colorpick-btn")){return false}h.closest("ul").find(".selected").removeClass("selected");h.addClass("selected");var i=h.data("color");g.val(i).change();j.preventDefault();return true})});return this}})(window.jQuery);(function(a,b){a.fn.ace_tree=function(d){var c={"open-icon":"icon-folder-open","close-icon":"icon-folder-close",selectable:true,"selected-icon":"icon-ok","unselected-icon":"tree-dot"};c=a.extend({},c,d);this.each(function(){var e=a(this);e.html('<div class = "tree-folder" style="display:none;">				<div class="tree-folder-header">					<i class="'+c["close-icon"]+'"></i>					<div class="tree-folder-name"></div>				</div>				<div class="tree-folder-content"></div>				<div class="tree-loader" style="display:none"></div>			</div>			<div class="tree-item" style="display:none;">				'+(c["unselected-icon"]==null?"":'<i class="'+c["unselected-icon"]+'"></i>')+'				<div class="tree-item-name"></div>			</div>');e.addClass(c.selectable==true?"tree-selectable":"tree-unselectable");e.tree(c)});return this}})(window.jQuery);(function(a,b){a.fn.ace_wysiwyg=function(c,h){var d=a.extend({speech_button:true,wysiwyg:{}},c);var e=["#ac725e","#d06b64","#f83a22","#fa573c","#ff7537","#ffad46","#42d692","#16a765","#7bd148","#b3dc6c","#fbe983","#fad165","#92e1c0","#9fe1e7","#9fc6e7","#4986e7","#9a9cff","#b99aff","#c2c2c2","#cabdbf","#cca6ac","#f691b2","#cd74e6","#a47ae2","#444444"];var g={font:{values:["Arial","Courier","Comic Sans MS","Helvetica","Open Sans","Tahoma","Verdana"],icon:"icon-font",title:"Font"},fontSize:{values:{5:"Huge",3:"Normal",1:"Small"},icon:"icon-text-height",title:"Font Size"},bold:{icon:"icon-bold",title:"Bold (Ctrl/Cmd+B)"},italic:{icon:"icon-italic",title:"Italic (Ctrl/Cmd+I)"},strikethrough:{icon:"icon-strikethrough",title:"Strikethrough"},underline:{icon:"icon-underline",title:"Underline"},insertunorderedlist:{icon:"icon-list-ul",title:"Bullet list"},insertorderedlist:{icon:"icon-list-ol",title:"Number list"},outdent:{icon:"icon-indent-left",title:"Reduce indent (Shift+Tab)"},indent:{icon:"icon-indent-right",title:"Indent (Tab)"},justifyleft:{icon:"icon-align-left",title:"Align Left (Ctrl/Cmd+L)"},justifycenter:{icon:"icon-align-center",title:"Center (Ctrl/Cmd+E)"},justifyright:{icon:"icon-align-right",title:"Align Right (Ctrl/Cmd+R)"},justifyfull:{icon:"icon-align-justify",title:"Justify (Ctrl/Cmd+J)"},createLink:{icon:"icon-link",title:"Hyperlink",button_text:"Add",placeholder:"URL",button_class:"btn-primary"},unlink:{icon:"icon-unlink",title:"Remove Hyperlink"},insertImage:{icon:"icon-picture",title:"Insert picture",button_text:'<i class="icon-file"></i> Choose Image &hellip;',placeholder:"Image URL",button_insert:"Insert",button_class:"btn-success",button_insert_class:"btn-primary",choose_file:true},foreColor:{values:e,title:"Change Color"},backColor:{values:e,title:"Change Background Color"},undo:{icon:"icon-undo",title:"Undo (Ctrl/Cmd+Z)"},redo:{icon:"icon-repeat",title:"Redo (Ctrl/Cmd+Y)"},viewSource:{icon:"icon-code",title:"View Source"}};var f=d.toolbar||["font",null,"fontSize",null,"bold","italic","strikethrough","underline",null,"insertunorderedlist","insertorderedlist","outdent","indent",null,"justifyleft","justifycenter","justifyright","justifyfull",null,"createLink","unlink",null,"insertImage",null,"foreColor",null,"undo","redo",null,"viewSource"];this.each(function(){var r=' <div class="wysiwyg-toolbar btn-toolbar center"> <div class="btn-group"> ';for(var n in f){if(f.hasOwnProperty(n)){var p=f[n];if(p===null){r+=' </div> <div class="btn-group"> ';continue}if(typeof p=="string"&&p in g){p=g[p];p.name=f[n]}else{if(typeof p=="object"&&p.name in g){p=a.extend(g[p.name],p)}else{continue}}var q="className" in p?p.className:"";switch(p.name){case"font":r+=' <a class="btn btn-sm '+q+' dropdown-toggle" data-toggle="dropdown" title="'+p.title+'"><i class="'+p.icon+'"></i><i class="icon-angle-down icon-on-right"></i></a> ';r+=' <ul class="dropdown-menu dropdown-light">';for(var j in p.values){if(p.values.hasOwnProperty(j)){r+=' <li><a data-edit="fontName '+p.values[j]+'" style="font-family:\''+p.values[j]+"'\">"+p.values[j]+"</a></li> "}}r+=" </ul>";break;case"fontSize":r+=' <a class="btn btn-sm '+q+' dropdown-toggle" data-toggle="dropdown" title="'+p.title+'"><i class="'+p.icon+'"></i>&nbsp;<i class="icon-angle-down icon-on-right"></i></a> ';r+=' <ul class="dropdown-menu dropdown-light"> ';for(var t in p.values){if(p.values.hasOwnProperty(t)){r+=' <li><a data-edit="fontSize '+t+'"><font size="'+t+'">'+p.values[t]+"</font></a></li> "}}r+=" </ul> ";break;case"createLink":r+=' <div class="inline position-relative"> <a class="btn btn-sm '+q+' dropdown-toggle" data-toggle="dropdown" title="'+p.title+'"><i class="'+p.icon+'"></i></a> ';r+=' <div class="dropdown-menu dropdown-caret pull-right">							<div class="input-group">								<input class="form-control" placeholder="'+p.placeholder+'" type="text" data-edit="'+p.name+'" />								<span class="input-group-btn">									<button class="btn btn-sm '+p.button_class+'" type="button">'+p.button_text+"</button>								</span>							</div>						</div> </div>";break;case"insertImage":r+=' <div class="inline position-relative"> <a class="btn btn-sm '+q+' dropdown-toggle" data-toggle="dropdown" title="'+p.title+'"><i class="'+p.icon+'"></i></a> ';r+=' <div class="dropdown-menu dropdown-caret pull-right">							<div class="input-group">								<input class="form-control" placeholder="'+p.placeholder+'" type="text" data-edit="'+p.name+'" />								<span class="input-group-btn">									<button class="btn btn-sm '+p.button_insert_class+'" type="button">'+p.button_insert+"</button>								</span>							</div>";if(p.choose_file&&"FileReader" in window){r+='<div class="space-2"></div>							 <div class="center">								<button class="btn btn-sm '+p.button_class+' wysiwyg-choose-file" type="button">'+p.button_text+'</button>								<input type="file" data-edit="'+p.name+'" />							  </div>'}r+=" </div> </div>";break;case"foreColor":case"backColor":r+=' <select class="hide wysiwyg_colorpicker" title="'+p.title+'"> ';for(var m in p.values){r+=' <option value="'+p.values[m]+'">'+p.values[m]+"</option> "}r+=" </select> ";r+=' <input style="display:none;" disabled class="hide" type="text" data-edit="'+p.name+'" /> ';break;case"viewSource":r+=' <a class="btn btn-sm '+q+'" data-view="source" title="'+p.title+'"><i class="'+p.icon+'"></i></a> ';break;default:r+=' <a class="btn btn-sm '+q+'" data-edit="'+p.name+'" title="'+p.title+'"><i class="'+p.icon+'"></i></a> ';break}}}r+=" </div> </div> ";if(d.toolbar_place){r=d.toolbar_place.call(this,r)}else{r=a(this).before(r).prev()}r.find("a[title]").tooltip({animation:false,container:"body"});r.find(".dropdown-menu input:not([type=file])").on(ace.click_event,function(){return false}).on("change",function(){a(this).closest(".dropdown-menu").siblings(".dropdown-toggle").dropdown("toggle")}).on("keydown",function(u){if(u.which==27){this.value="";a(this).change()}});r.find("input[type=file]").prev().on(ace.click_event,function(u){a(this).next().click()});r.find(".wysiwyg_colorpicker").each(function(){a(this).ace_colorpicker({pull_right:true}).change(function(){a(this).nextAll("input").eq(0).val(this.value).change()}).next().find(".btn-colorpicker").tooltip({title:this.title,animation:false,container:"body"})});var k;if(d.speech_button&&"onwebkitspeechchange" in (k=document.createElement("input"))){var i=a(this).offset();r.append(k);a(k).attr({type:"text","data-edit":"inserttext","x-webkit-speech":""}).addClass("wysiwyg-speech-input").css({position:"absolute"}).offset({top:i.top,left:i.left+a(this).innerWidth()-35})}else{k=null}var s=a(this);var l=false;r.find("a[data-view=source]").on("click",function(v){v.preventDefault();if(!l){a("<textarea />").css({width:s.outerWidth(),height:s.outerHeight()}).val(s.html()).insertAfter(s);s.hide();a(this).addClass("active")}else{var u=s.next();s.html(u.val()).show();u.remove();a(this).removeClass("active")}l=!l});var o=a.extend({},{activeToolbarClass:"active",toolbarSelector:r},d.wysiwyg||{});a(this).wysiwyg(o)});return this}})(window.jQuery);
if(!("ace" in window)){window.ace={}}jQuery(function(a){window.ace.click_event=a.fn.tap?"tap":"click"});jQuery(function(a){ace.handle_side_menu(jQuery);ace.enable_search_ahead(jQuery);ace.general_things(jQuery);ace.widget_boxes(jQuery);ace.widget_reload_handler(jQuery)});ace.handle_side_menu=function(a){a("#menu-toggler").on(ace.click_event,function(){a("#sidebar").toggleClass("display");a(this).toggleClass("display");return false});var c=a("#sidebar").hasClass("menu-min");a("#sidebar-collapse").on(ace.click_event,function(){c=a("#sidebar").hasClass("menu-min");ace.settings.sidebar_collapsed(!c)});var b="ontouchend" in document;a(".nav-list").on(ace.click_event,function(h){var g=a(h.target).closest("a");if(!g||g.length==0){return}c=a("#sidebar").hasClass("menu-min");if(!g.hasClass("dropdown-toggle")){if(c&&ace.click_event=="tap"&&g.get(0).parentNode.parentNode==this){var i=g.find(".menu-text").get(0);if(h.target!=i&&!a.contains(i,h.target)){return false}}return}var f=g.next().get(0);if(!a(f).is(":visible")){var d=a(f.parentNode).closest("ul");if(c&&d.hasClass("nav-list")){return}d.find("> .open > .submenu").each(function(){if(this!=f&&!a(this.parentNode).hasClass("active")){a(this).slideUp(200).parent().removeClass("open")}})}else{}if(c&&a(f.parentNode.parentNode).hasClass("nav-list")){return false}a(f).slideToggle(200).parent().toggleClass("open");return false})};ace.general_things=function(a){a('.ace-nav [class*="icon-animated-"]').closest("a").on("click",function(){var d=a(this).find('[class*="icon-animated-"]').eq(0);var c=d.attr("class").match(/icon\-animated\-([\d\w]+)/);d.removeClass(c[0]);a(this).off("click")});a(".nav-list .badge[title],.nav-list .label[title]").tooltip({placement:"right"});a("#ace-settings-btn").on(ace.click_event,function(){a(this).toggleClass("open");a("#ace-settings-box").toggleClass("open")});a("#ace-settings-navbar").on("click",function(){ace.settings.navbar_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("navbar","fixed")});a("#ace-settings-sidebar").on("click",function(){ace.settings.sidebar_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("sidebar","fixed")});a("#ace-settings-breadcrumbs").on("click",function(){ace.settings.breadcrumbs_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("breadcrumbs","fixed")});a("#ace-settings-add-container").on("click",function(){ace.settings.main_container_fixed(this.checked)}).each(function(){this.checked=ace.settings.is("main-container","fixed")});a("#ace-settings-rtl").removeAttr("checked").on("click",function(){ace.switch_direction(jQuery)});a("#btn-scroll-up").on(ace.click_event,function(){var c=Math.min(400,Math.max(100,parseInt(a("html").scrollTop()/3)));a("html,body").animate({scrollTop:0},c);return false});try{a("#skin-colorpicker").ace_colorpicker()}catch(b){}a("#skin-colorpicker").on("change",function(){var d=a(this).find("option:selected").data("skin");var c=a(document.body);c.removeClass("skin-1 skin-2 skin-3");if(d!="default"){c.addClass(d)}if(d=="skin-1"){a(".ace-nav > li.grey").addClass("dark")}else{a(".ace-nav > li.grey").removeClass("dark")}if(d=="skin-2"){a(".ace-nav > li").addClass("no-border margin-1");a(".ace-nav > li:not(:last-child)").addClass("light-pink").find('> a > [class*="icon-"]').addClass("pink").end().eq(0).find(".badge").addClass("badge-warning")}else{a(".ace-nav > li").removeClass("no-border margin-1");a(".ace-nav > li:not(:last-child)").removeClass("light-pink").find('> a > [class*="icon-"]').removeClass("pink").end().eq(0).find(".badge").removeClass("badge-warning")}if(d=="skin-3"){a(".ace-nav > li.grey").addClass("red").find(".badge").addClass("badge-yellow")}else{a(".ace-nav > li.grey").removeClass("red").find(".badge").removeClass("badge-yellow")}})};ace.widget_boxes=function(a){a(document).on("hide.bs.collapse show.bs.collapse",function(c){var b=c.target.getAttribute("id");a('[href*="#'+b+'"]').find('[class*="icon-"]').each(function(){var e=a(this);var d;var f=null;var g=null;if((f=e.attr("data-icon-show"))){g=e.attr("data-icon-hide")}else{if(d=e.attr("class").match(/icon\-(.*)\-(up|down)/)){f="icon-"+d[1]+"-down";g="icon-"+d[1]+"-up"}}if(f){if(c.type=="show"){e.removeClass(f).addClass(g)}else{e.removeClass(g).addClass(f)}return false}})});a(document).on("click.ace.widget","[data-action]",function(o){o.preventDefault();var n=a(this);var p=n.data("action");var b=n.closest(".widget-box");if(b.hasClass("ui-sortable-helper")){return}if(p=="collapse"){var j=b.hasClass("collapsed")?"show":"hide";var f=j=="show"?"shown":"hidden";var c;b.trigger(c=a.Event(j+".ace.widget"));if(c.isDefaultPrevented()){return}var g=b.find(".widget-body");var m=n.find("[class*=icon-]").eq(0);var h=m.attr("class").match(/icon\-(.*)\-(up|down)/);var d="icon-"+h[1]+"-down";var i="icon-"+h[1]+"-up";var l=g.find(".widget-body-inner");if(l.length==0){g=g.wrapInner('<div class="widget-body-inner"></div>').find(":first-child").eq(0)}else{g=l.eq(0)}var e=300;var k=200;if(j=="show"){if(m){m.addClass(i).removeClass(d)}b.removeClass("collapsed");g.slideUp(0,function(){g.slideDown(e,function(){b.trigger(c=a.Event(f+".ace.widget"))})})}else{if(m){m.addClass(d).removeClass(i)}g.slideUp(k,function(){b.addClass("collapsed");b.trigger(c=a.Event(f+".ace.widget"))})}}else{if(p=="close"){var c;b.trigger(c=a.Event("close.ace.widget"));if(c.isDefaultPrevented()){return}var r=parseInt(n.data("close-speed"))||300;b.hide(r,function(){b.trigger(c=a.Event("closed.ace.widget"));b.remove()})}else{if(p=="reload"){var c;b.trigger(c=a.Event("reload.ace.widget"));if(c.isDefaultPrevented()){return}n.blur();var q=false;if(b.css("position")=="static"){q=true;b.addClass("position-relative")}b.append('<div class="widget-box-overlay"><i class="icon-spinner icon-spin icon-2x white"></i></div>');b.one("reloaded.ace.widget",function(){b.find(".widget-box-overlay").remove();if(q){b.removeClass("position-relative")}})}else{if(p=="settings"){var c=a.Event("settings.ace.widget");b.trigger(c)}}}}})};ace.widget_reload_handler=function(a){a(document).on("reload.ace.widget",".widget-box",function(b){var c=a(this);setTimeout(function(){c.trigger("reloaded.ace.widget")},parseInt(Math.random()*1000+1000))})};ace.enable_search_ahead=function(a){ace.variable_US_STATES=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];try{a("#nav-search-input").typeahead({source:ace.variable_US_STATES,updater:function(c){a("#nav-search-input").focus();return c}})}catch(b){}};ace.switch_direction=function(d){var c=d(document.body);c.toggleClass("rtl").find(".dropdown-menu:not(.datepicker-dropdown,.colorpicker)").toggleClass("pull-right").end().find(".pull-right:not(.dropdown-menu,blockquote,.profile-skills .pull-right)").removeClass("pull-right").addClass("tmp-rtl-pull-right").end().find(".pull-left:not(.dropdown-submenu,.profile-skills .pull-left)").removeClass("pull-left").addClass("pull-right").end().find(".tmp-rtl-pull-right").removeClass("tmp-rtl-pull-right").addClass("pull-left").end().find(".chosen-container").toggleClass("chosen-rtl").end();function a(h,g){c.find("."+h).removeClass(h).addClass("tmp-rtl-"+h).end().find("."+g).removeClass(g).addClass(h).end().find(".tmp-rtl-"+h).removeClass("tmp-rtl-"+h).addClass(g)}function b(h,g,i){i.each(function(){var k=d(this);var j=k.css(g);k.css(g,k.css(h));k.css(h,j)})}a("align-left","align-right");a("no-padding-left","no-padding-right");a("arrowed","arrowed-right");a("arrowed-in","arrowed-in-right");a("messagebar-item-left","messagebar-item-right");var e=d("#piechart-placeholder");if(e.size()>0){var f=d(document.body).hasClass("rtl")?"nw":"ne";e.data("draw").call(e.get(0),e,e.data("chart"),f)}};
/* ===========================================================
 * bootstrap-modal.js v2.2.3
 * ===========================================================
 * Copyright 2012 Jordan Schroter
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

	"use strict"; // jshint ;_;

	/* MODAL CLASS DEFINITION
	* ====================== */

	var Modal = function (element, options) {
		this.init(element, options);
	};

	Modal.prototype = {

		constructor: Modal,

		init: function (element, options) {
			var that = this;

			this.options = options;

			this.$element = $(element)
				.delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));

			this.options.remote && this.$element.find('.modal-body').load(this.options.remote, function () {
				var e = $.Event('loaded');
				that.$element.trigger(e);
			});

			var manager = typeof this.options.manager === 'function' ?
				this.options.manager.call(this) : this.options.manager;

			manager = manager.appendModal ?
				manager : $(manager).modalmanager().data('modalmanager');

			manager.appendModal(this);
		},

		toggle: function () {
			return this[!this.isShown ? 'show' : 'hide']();
		},

		show: function () {
			var e = $.Event('show');

			if (this.isShown) return;

			this.$element.trigger(e);

			if (e.isDefaultPrevented()) return;

			this.escape();

			this.tab();

			this.options.loading && this.loading();
		},

		hide: function (e) {
			e && e.preventDefault();

			e = $.Event('hide');

			this.$element.trigger(e);

			if (!this.isShown || e.isDefaultPrevented()) return (this.isShown = false);

			this.isShown = false;

			this.escape();

			this.tab();

			this.isLoading && this.loading();

			$(document).off('focusin.modal');

			this.$element
				.removeClass('in')
				.removeClass('animated')
				.removeClass(this.options.attentionAnimation)
				.removeClass('modal-overflow')
				.attr('aria-hidden', true);

			$.support.transition && this.$element.hasClass('fade') ?
				this.hideWithTransition() :
				this.hideModal();
		},

		layout: function () {
			var prop = this.options.height ? 'height' : 'max-height',
				value = this.options.height || this.options.maxHeight;

			if (this.options.width){
				this.$element.css('width', this.options.width);

				var that = this;
				this.$element.css('margin-left', function () {
					if (/%/ig.test(that.options.width)){
						return -(parseInt(that.options.width) / 2) + '%';
					} else {
						return -($(this).width() / 2) + 'px';
					}
				});
			} else {
				this.$element.css('width', '');
				this.$element.css('margin-left', '');
			}

			this.$element.find('.modal-body')
				.css('overflow', '')
				.css(prop, '');

			if (value){
				this.$element.find('.modal-body')
					.css('overflow', 'auto')
					.css(prop, value);
			}

			var modalOverflow = $(window).height() - 10 < this.$element.height();
            
			if (modalOverflow || this.options.modalOverflow) {
				this.$element
					.css('margin-top', 0)
					.addClass('modal-overflow');
			} else {
				this.$element
					.css('margin-top', 0 - this.$element.height() / 2)
					.removeClass('modal-overflow');
			}
		},

		tab: function () {
			var that = this;

			if (this.isShown && this.options.consumeTab) {
				this.$element.on('keydown.tabindex.modal', '[data-tabindex]', function (e) {
			    	if (e.keyCode && e.keyCode == 9){
						var $next = $(this),
							$rollover = $(this);

						that.$element.find('[data-tabindex]:enabled:not([readonly])').each(function (e) {
							if (!e.shiftKey){
						 		$next = $next.data('tabindex') < $(this).data('tabindex') ?
									$next = $(this) :
									$rollover = $(this);
							} else {
								$next = $next.data('tabindex') > $(this).data('tabindex') ?
									$next = $(this) :
									$rollover = $(this);
							}
						});

						$next[0] !== $(this)[0] ?
							$next.focus() : $rollover.focus();

						e.preventDefault();
					}
				});
			} else if (!this.isShown) {
				this.$element.off('keydown.tabindex.modal');
			}
		},

		escape: function () {
			var that = this;
			if (this.isShown && this.options.keyboard) {
				if (!this.$element.attr('tabindex')) this.$element.attr('tabindex', -1);

				this.$element.on('keyup.dismiss.modal', function (e) {
					e.which == 27 && that.hide();
				});
			} else if (!this.isShown) {
				this.$element.off('keyup.dismiss.modal')
			}
		},

		hideWithTransition: function () {
			var that = this
				, timeout = setTimeout(function () {
					that.$element.off($.support.transition.end);
					that.hideModal();
				}, 500);

			this.$element.one($.support.transition.end, function () {
				clearTimeout(timeout);
				that.hideModal();
			});
		},

		hideModal: function () {
			var prop = this.options.height ? 'height' : 'max-height';
			var value = this.options.height || this.options.maxHeight;

			if (value){
				this.$element.find('.modal-body')
					.css('overflow', '')
					.css(prop, '');
			}

			this.$element
				.hide()
				.trigger('hidden');
		},

		removeLoading: function () {
			this.$loading.remove();
			this.$loading = null;
			this.isLoading = false;
		},

		loading: function (callback) {
			callback = callback || function () {};

			var animate = this.$element.hasClass('fade') ? 'fade' : '';

			if (!this.isLoading) {
				var doAnimate = $.support.transition && animate;

				this.$loading = $('<div class="loading-mask ' + animate + '">')
					.append(this.options.spinner)
					.appendTo(this.$element);

				if (doAnimate) this.$loading[0].offsetWidth; // force reflow

				this.$loading.addClass('in');

				this.isLoading = true;

				doAnimate ?
					this.$loading.one($.support.transition.end, callback) :
					callback();

			} else if (this.isLoading && this.$loading) {
				this.$loading.removeClass('in');

				var that = this;
				$.support.transition && this.$element.hasClass('fade')?
					this.$loading.one($.support.transition.end, function () { that.removeLoading() }) :
					that.removeLoading();

			} else if (callback) {
				callback(this.isLoading);
			}
		},

		focus: function () {
			var $focusElem = this.$element.find(this.options.focusOn);

			$focusElem = $focusElem.length ? $focusElem : this.$element;

			$focusElem.focus();
		},

		attention: function (){
			// NOTE: transitionEnd with keyframes causes odd behaviour

			if (this.options.attentionAnimation){
				this.$element
					.removeClass('animated')
					.removeClass(this.options.attentionAnimation);

				var that = this;

				setTimeout(function () {
					that.$element
						.addClass('animated')
						.addClass(that.options.attentionAnimation);
				}, 0);
			}


			this.focus();
		},


		destroy: function () {
			var e = $.Event('destroy');
			this.$element.trigger(e);
			if (e.isDefaultPrevented()) return;

			this.teardown();
		},

		teardown: function () {
			if (!this.$parent.length){
				this.$element.remove();
				this.$element = null;
				return;
			}

			if (this.$parent !== this.$element.parent()){
				this.$element.appendTo(this.$parent);
			}

			this.$element.off('.modal');
			this.$element.removeData('modal');
			this.$element
				.removeClass('in')
				.attr('aria-hidden', true);
		}
	};


	/* MODAL PLUGIN DEFINITION
	* ======================= */

	$.fn.modal = function (option, args) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('modal'),
				options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);

			if (!data) $this.data('modal', (data = new Modal(this, options)));
			if (typeof option == 'string') data[option].apply(data, [].concat(args));
			else if (options.show) data.show()
		})
	};

	$.fn.modal.defaults = {
		keyboard: true,
		backdrop: true,
		loading: false,
		show: true,
		width: null,
		height: null,
		maxHeight: null,
		modalOverflow: false,
		consumeTab: true,
		focusOn: null,
		replace: false,
		resize: false,
		attentionAnimation: 'shake',
		manager: 'body',
		spinner: '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
		backdropTemplate: '<div class="modal-backdrop" />'
	};

	$.fn.modal.Constructor = Modal;


	/* MODAL DATA-API
	* ============== */

	$(function () {
		$(document).off('click.modal').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
			var $this = $(this),
				href = $this.attr('href'),
				$target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))), //strip for ie7
				option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

			e.preventDefault();
			$target
				.modal(option)
				.one('hide', function () {
					$this.focus();
				})
		});
	});

}(window.jQuery);

/* ===========================================================
 * bootstrap-modalmanager.js v2.2.3
 * ===========================================================
 * Copyright 2012 Jordan Schroter.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function ($) {

	"use strict"; // jshint ;_;

	/* MODAL MANAGER CLASS DEFINITION
	* ====================== */

	var ModalManager = function (element, options) {
		this.init(element, options);
	};

	ModalManager.prototype = {

		constructor: ModalManager,

		init: function (element, options) {
			this.$element = $(element);
			this.options = $.extend({}, $.fn.modalmanager.defaults, this.$element.data(), typeof options == 'object' && options);
			this.stack = [];
			this.backdropCount = 0;

			if (this.options.resize) {
				var resizeTimeout,
					that = this;

				$(window).on('resize.modal', function(){
					resizeTimeout && clearTimeout(resizeTimeout);
					resizeTimeout = setTimeout(function(){
						for (var i = 0; i < that.stack.length; i++){
							that.stack[i].isShown && that.stack[i].layout();
						}
					}, 10);
				});
			}
		},

		createModal: function (element, options) {
			$(element).modal($.extend({ manager: this }, options));
		},

		appendModal: function (modal) {
			this.stack.push(modal);

			var that = this;

			modal.$element.on('show.modalmanager', targetIsSelf(function (e) {

				var showModal = function(){
					modal.isShown = true;

					var transition = $.support.transition && modal.$element.hasClass('fade');

					that.$element
						.toggleClass('modal-open', that.hasOpenModal())
						.toggleClass('page-overflow', $(window).height() < that.$element.height());

					modal.$parent = modal.$element.parent();

					modal.$container = that.createContainer(modal);

					modal.$element.appendTo(modal.$container);

					that.backdrop(modal, function () {
						modal.$element.show();

						if (transition) {       
							//modal.$element[0].style.display = 'run-in';       
							modal.$element[0].offsetWidth;
							//modal.$element.one($.support.transition.end, function () { modal.$element[0].style.display = 'block' });  
						}
						
						modal.layout();

						modal.$element
							.addClass('in')
							.attr('aria-hidden', false);

						var complete = function () {
							that.setFocus();
							modal.$element.trigger('shown');
						};

						transition ?
							modal.$element.one($.support.transition.end, complete) :
							complete();
					});
				};

				modal.options.replace ?
					that.replace(showModal) :
					showModal();
			}));

			modal.$element.on('hidden.modalmanager', targetIsSelf(function (e) {
				that.backdrop(modal);
				// handle the case when a modal may have been removed from the dom before this callback executes
				if (!modal.$element.parent().length) {
					that.destroyModal(modal);
				} else if (modal.$backdrop){
					var transition = $.support.transition && modal.$element.hasClass('fade');

					// trigger a relayout due to firebox's buggy transition end event 
					if (transition) { modal.$element[0].offsetWidth; }
					$.support.transition && modal.$element.hasClass('fade') ?
						modal.$backdrop.one($.support.transition.end, function () { modal.destroy(); }) :
						modal.destroy();
				} else {
					modal.destroy();
				}

			}));

			modal.$element.on('destroy.modalmanager', targetIsSelf(function (e) {
				that.destroyModal(modal);
			}));

		},

		getOpenModals: function () {
			var openModals = [];
			for (var i = 0; i < this.stack.length; i++){
				if (this.stack[i].isShown) openModals.push(this.stack[i]);
			}

			return openModals;
		},

		hasOpenModal: function () {
			return this.getOpenModals().length > 0;
		},

		setFocus: function () {
			var topModal;

			for (var i = 0; i < this.stack.length; i++){
				if (this.stack[i].isShown) topModal = this.stack[i];
			}

			if (!topModal) return;

			topModal.focus();
		},

		destroyModal: function (modal) {
			modal.$element.off('.modalmanager');
			if (modal.$backdrop) this.removeBackdrop(modal);
			this.stack.splice(this.getIndexOfModal(modal), 1);

			var hasOpenModal = this.hasOpenModal();

			this.$element.toggleClass('modal-open', hasOpenModal);

			if (!hasOpenModal){
				this.$element.removeClass('page-overflow');
			}

			this.removeContainer(modal);

			this.setFocus();
		},

		getModalAt: function (index) {
			return this.stack[index];
		},

		getIndexOfModal: function (modal) {
			for (var i = 0; i < this.stack.length; i++){
				if (modal === this.stack[i]) return i;
			}
		},

		replace: function (callback) {
			var topModal;

			for (var i = 0; i < this.stack.length; i++){
				if (this.stack[i].isShown) topModal = this.stack[i];
			}

			if (topModal) {
				this.$backdropHandle = topModal.$backdrop;
				topModal.$backdrop = null;

				callback && topModal.$element.one('hidden',
					targetIsSelf( $.proxy(callback, this) ));

				topModal.hide();
			} else if (callback) {
				callback();
			}
		},

		removeBackdrop: function (modal) {
			modal.$backdrop.remove();
			modal.$backdrop = null;
		},

		createBackdrop: function (animate, tmpl) {
			var $backdrop;

			if (!this.$backdropHandle) {
				$backdrop = $(tmpl)
					.addClass(animate)
					.appendTo(this.$element);
			} else {
				$backdrop = this.$backdropHandle;
				$backdrop.off('.modalmanager');
				this.$backdropHandle = null;
				this.isLoading && this.removeSpinner();
			}

			return $backdrop;
		},

		removeContainer: function (modal) {
			modal.$container.remove();
			modal.$container = null;
		},

		createContainer: function (modal) {
			var $container;

			$container = $('<div class="modal-scrollable">')
				.css('z-index', getzIndex('modal', this.getOpenModals().length))
				.appendTo(this.$element);

			if (modal && modal.options.backdrop != 'static') {
				$container.on('click.modal', targetIsSelf(function (e) {
					modal.hide();
				}));
			} else if (modal) {
				$container.on('click.modal', targetIsSelf(function (e) {
					modal.attention();
				}));
			}

			return $container;

		},

		backdrop: function (modal, callback) {
			var animate = modal.$element.hasClass('fade') ? 'fade' : '',
				showBackdrop = modal.options.backdrop &&
					this.backdropCount < this.options.backdropLimit;

			if (modal.isShown && showBackdrop) {
				var doAnimate = $.support.transition && animate && !this.$backdropHandle;

				modal.$backdrop = this.createBackdrop(animate, modal.options.backdropTemplate);

				modal.$backdrop.css('z-index', getzIndex( 'backdrop', this.getOpenModals().length ));

				if (doAnimate) modal.$backdrop[0].offsetWidth; // force reflow

				modal.$backdrop.addClass('in');

				this.backdropCount += 1;

				doAnimate ?
					modal.$backdrop.one($.support.transition.end, callback) :
					callback();

			} else if (!modal.isShown && modal.$backdrop) {
				modal.$backdrop.removeClass('in');

				this.backdropCount -= 1;

				var that = this;

				$.support.transition && modal.$element.hasClass('fade')?
					modal.$backdrop.one($.support.transition.end, function () { that.removeBackdrop(modal) }) :
					that.removeBackdrop(modal);

			} else if (callback) {
				callback();
			}
		},

		removeSpinner: function(){
			this.$spinner && this.$spinner.remove();
			this.$spinner = null;
			this.isLoading = false;
		},

		removeLoading: function () {
			this.$backdropHandle && this.$backdropHandle.remove();
			this.$backdropHandle = null;
			this.removeSpinner();
		},

		loading: function (callback) {
			callback = callback || function () { };

			this.$element
				.toggleClass('modal-open', !this.isLoading || this.hasOpenModal())
				.toggleClass('page-overflow', $(window).height() < this.$element.height());

			if (!this.isLoading) {

				this.$backdropHandle = this.createBackdrop('fade', this.options.backdropTemplate);

				this.$backdropHandle[0].offsetWidth; // force reflow

				var openModals = this.getOpenModals();

				this.$backdropHandle
					.css('z-index', getzIndex('backdrop', openModals.length + 1))
					.addClass('in');

				var $spinner = $(this.options.spinner)
					.css('z-index', getzIndex('modal', openModals.length + 1))
					.appendTo(this.$element)
					.addClass('in');

				this.$spinner = $(this.createContainer())
					.append($spinner)
					.on('click.modalmanager', $.proxy(this.loading, this));

				this.isLoading = true;

				$.support.transition ?
					this.$backdropHandle.one($.support.transition.end, callback) :
					callback();

			} else if (this.isLoading && this.$backdropHandle) {
				this.$backdropHandle.removeClass('in');

				var that = this;
				$.support.transition ?
					this.$backdropHandle.one($.support.transition.end, function () { that.removeLoading() }) :
					that.removeLoading();

			} else if (callback) {
				callback(this.isLoading);
			}
		}
	};

	/* PRIVATE METHODS
	* ======================= */

	// computes and caches the zindexes
	var getzIndex = (function () {
		var zIndexFactor,
			baseIndex = {};

		return function (type, pos) {

			if (typeof zIndexFactor === 'undefined'){
				var $baseModal = $('<div class="modal hide" />').appendTo('body'),
					$baseBackdrop = $('<div class="modal-backdrop hide" />').appendTo('body');

				baseIndex['modal'] = +$baseModal.css('z-index');
				baseIndex['backdrop'] = +$baseBackdrop.css('z-index');
				zIndexFactor = baseIndex['modal'] - baseIndex['backdrop'];

				$baseModal.remove();
				$baseBackdrop.remove();
				$baseBackdrop = $baseModal = null;
			}

			return baseIndex[type] + (zIndexFactor * pos);

		}
	}());

	// make sure the event target is the modal itself in order to prevent
	// other components such as tabsfrom triggering the modal manager.
	// if Boostsrap namespaced events, this would not be needed.
	function targetIsSelf(callback){
		return function (e) {
			if (this === e.target){
				return callback.apply(this, arguments);
			}
		}
	}


	/* MODAL MANAGER PLUGIN DEFINITION
	* ======================= */

	$.fn.modalmanager = function (option, args) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('modalmanager');

			if (!data) $this.data('modalmanager', (data = new ModalManager(this, option)));
			if (typeof option === 'string') data[option].apply(data, [].concat(args))
		})
	};

	$.fn.modalmanager.defaults = {
		backdropLimit: 999,
		resize: true,
		spinner: '<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
		backdropTemplate: '<div class="modal-backdrop" />'
	};

	$.fn.modalmanager.Constructor = ModalManager

	// ModalManager handles the modal-open class so we need 
	// to remove conflicting bootstrap 3 event handlers
	$(function () {
		$(document).off('show.bs.modal').off('hidden.bs.modal');
	});

}(jQuery);

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

    /* From the spec: This value controls how frequently the audioprocess event is 
    dispatched and how many sample-frames need to be processed each call. 
    Lower values for buffer size will result in a lower (better) latency. 
    Higher values will be necessary to avoid audio breakup and glitches */

    var Recorder = function(source, cfg) {
        var config = cfg || {};
        var bufferLen = config.bufferLen || 2048;
        this.context = source.context;
        if (!this.context.createScriptProcessor) {
            this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
        } else {
            this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
        }

        var worker = new Worker(config.workerPath || WORKER_PATH);
        var audioStart = {
            command: 'init',
            config: {
                sampleRate: 22050 //this.context.sampleRate //restored to orginal, changing is just messed up
            }
        }
        console.log("The sample rate is set at (in KHz)-- " + audioStart.config.sampleRate);
        console.log(source)
        worker.postMessage(audioStart);

        //recoding has not yet began, so set at false
        var recording = false,
            currCallback;

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

        this.exportWAV = function(cb, typeb) {
            currCallback = cb || config.callback;
            type = typeb || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: typeb ? 'exportWAV' : 'exportMonoWAV',
                type: type
            });
        }

        // this.exportMonoWAV = function (cb, type) {
        //     currCallback = cb || config.callback;
        //     type = type || config.type || 'audio/wav';
        //     if (!currCallback) throw new Error('Callback not set');
        //     worker.postMessage({
        //         command: 'exportMonoWAV',
        //         type: type
        //     });
        // }

        worker.onmessage = function(e) {
            var blob = e.data;
            currCallback(blob);
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
/*
AudioJS - HTML5 Audio Player
v2.0.2

This file is part of VideoJS. Copyright 2010 Zencoder, Inc.
-Modified for html5 audio tag by dz0ny
-Updated to newer VideoJS version (2.0.2) by dodo

Based on VideoJS 6824c1f1d8bcc3f5b45c

AudioJS is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

AudioJS is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with AudioJS.  If not, see <http://www.gnu.org/licenses/>.
*/

// Self-executing function to prevent global vars and help with minification
(function(window, undefined){
  var document = window.document;

// Using jresig's Class implementation http://ejohn.org/blog/simple-javascript-inheritance/
(function(){var initializing=false, fnTest=/xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/; this.JRClass = function(){}; JRClass.extend = function(prop) { var _super = this.prototype; initializing = true; var prototype = new this(); initializing = false; for (var name in prop) { prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn){ return function() { var tmp = this._super; this._super = _super[name]; var ret = fn.apply(this, arguments); this._super = tmp; return ret; }; })(name, prop[name]) : prop[name]; } function JRClass() { if ( !initializing && this.init ) this.init.apply(this, arguments); } JRClass.prototype = prototype; JRClass.constructor = JRClass; JRClass.extend = arguments.callee; return JRClass;};})();

// Audio JS Player Class
var AudioJS = JRClass.extend({

  // Initialize the player for the supplied audio tag element
  // element: audio tag
  init: function(element, setOptions){

    // Allow an ID string or an element
    if (typeof element == 'string') {
      this.audio = document.getElementById(element);
    } else {
      this.audio = element;
    }
    // Store reference to player on the audio element.
    // So you can acess the player later: document.getElementById("audio_id").player.play();
    this.audio.player = this;
    this.values = {}; // Cache audio values.
    this.elements = {}; // Store refs to controls elements.

    // Default Options
    this.options = {
      autoplay: false,
      preload: true,
      useBuiltInControls: false, // Use the browser's controls (iPhone)
      controlsAtStart: true, // Make controls visible when page loads
      controlsHiding: false, // Hide controls when not over the audio
      defaultVolume: 0.85, // Will be overridden by localStorage volume if available
      volumeBars: 6,
      playerFallbackOrder: ["html5", "links"] // Players and order to use them
    };
    // Override default options with global options
    if (typeof AudioJS.options == "object") { AudioJS.merge(this.options, AudioJS.options); }
    // Override default & global options with options specific to this player
    if (typeof setOptions == "object") { AudioJS.merge(this.options, setOptions); }
    // Override preload & autoplay with audio attributes
    if (this.getPreloadAttribute() !== undefined) { this.options.preload = this.getPreloadAttribute(); }
    if (this.getAutoplayAttribute() !== undefined) { this.options.autoplay = this.getAutoplayAttribute(); }

    // Store reference to embed code pieces
    this.box = this.audio.parentNode;
    this.linksFallback = this.getLinksFallback();
    this.hideLinksFallback(); // Will be shown again if "links" player is used

    // Loop through the player names list in options, "html5" etc.
    // For each player name, initialize the player with that name under AudioJS.players
    // If the player successfully initializes, we're done
    // If not, try the next player in the list
    this.each(this.options.playerFallbackOrder, function(playerType){
      if (this[playerType+"Supported"]()) { // Check if player type is supported
        this[playerType+"Init"](); // Initialize player type
        return true; // Stop looping though players
      }
    });

    // Start Global Listeners - API doesn't exist before now
    this.activateElement(this, "player");
    this.activateElement(this.box, "box");
  },
  /* Behaviors
  ================ */
  behaviors: {},
  newBehavior: function(name, activate, functions){
    this.behaviors[name] = activate;
    this.extend(functions);
  },
  activateElement: function(element, behavior){
    // Allow passing and ID string
    if (typeof element == "string") { element = document.getElementById(element); }
    this.behaviors[behavior].call(this, element);
  },
  /* Errors/Warnings
  ================ */
  errors: [], // Array to track errors
  warnings: [],
  warning: function(warning){
    this.warnings.push(warning);
    this.log(warning);
  },
  /* History of errors/events (not quite there yet)
  ================ */
  history: [],
  log: function(event){
    if (!event) { return; }
    if (typeof event == "string") { event = { type: event }; }
    if (event.type) { this.history.push(event.type); }
    if (this.history.length >= 50) { this.history.shift(); }
    try { console.log(event.type); } catch(e) { try { opera.postError(event.type); } catch(e){} }
  },
  /* Local Storage
  ================ */
  setLocalStorage: function(key, value){
    if (!localStorage) { return; }
    try {
      localStorage[key] = value;
    } catch(e) {
      if (e.code == 22 || e.code == 1014) { // Webkit == 22 / Firefox == 1014
        this.warning(AudioJS.warnings.localStorageFull);
      }
    }
  },
  /* Helpers
  ================ */
  getPreloadAttribute: function(){
    if (typeof this.audio.hasAttribute == "function" && this.audio.hasAttribute("preload")) {
      var preload = this.audio.getAttribute("preload");
      // Only included the attribute, thinking it was boolean
      if (preload === "" || preload === "true") { return "auto"; }
      if (preload === "false") { return "none"; }
      return preload;
    }
  },
  getAutoplayAttribute: function(){
    if (typeof this.audio.hasAttribute == "function" && this.audio.hasAttribute("autoplay")) {
      var autoplay = this.audio.getAttribute("autoplay");
      if (autoplay === "false") { return false; }
      return true;
    }
  },
  // Calculates amoutn of buffer is full
  bufferedPercent: function(){ return (this.duration()) ? this.buffered()[1] / this.duration() : 0; },
  // Each that maintains player as context
  // Break if true is returned
  each: function(arr, fn){
    if (!arr || arr.length === 0) { return; }
    for (var i=0,j=arr.length; i<j; i++) {
      if (fn.call(this, arr[i], i)) { break; }
    }
  },
  extend: function(obj){
    for (var attrname in obj) {
      if (obj.hasOwnProperty(attrname)) { this[attrname]=obj[attrname]; }
    }
  }
});
AudioJS.player = AudioJS.prototype;

////////////////////////////////////////////////////////////////////////////////
// Player Types
////////////////////////////////////////////////////////////////////////////////

/* Download Links Fallback (Player Type)
================ */
AudioJS.player.extend({
  linksSupported: function(){ return true; },
  linksInit: function(){
    this.showLinksFallback();
    this.element = this.audio;
  },
  // Get the download links block element
  getLinksFallback: function(){ return this.box.getElementsByTagName("P")[0]; },
  // Hide no-audio download paragraph
  hideLinksFallback: function(){
    if (this.linksFallback) { this.linksFallback.style.display = "none"; }
  },
  // Hide no-audio download paragraph
  showLinksFallback: function(){
    if (this.linksFallback) { this.linksFallback.style.display = "block"; }
  }
});

////////////////////////////////////////////////////////////////////////////////
// Class Methods
// Functions that don't apply to individual audios.
////////////////////////////////////////////////////////////////////////////////

// Combine Objects - Use "safe" to protect from overwriting existing items
AudioJS.merge = function(obj1, obj2, safe){
  for (var attrname in obj2){
    if (obj2.hasOwnProperty(attrname) && (!safe || !obj1.hasOwnProperty(attrname))) { obj1[attrname]=obj2[attrname]; }
  }
  return obj1;
};
AudioJS.extend = function(obj){ this.merge(this, obj, true); };

AudioJS.extend({
  // Add AudioJS to all audio tags with the audio-js class when the DOM is ready
  setupAllWhenReady: function(options){
    // Options is stored globally, and added ot any new player on init
    AudioJS.options = options;
    AudioJS.DOMReady(AudioJS.setup);
  },

  // Run the supplied function when the DOM is ready
  DOMReady: function(fn){
    AudioJS.addToDOMReady(fn);
  },

  // Set up a specific audio or array of audio elements
  // "audio" can be:
  //    false, undefined, or "All": set up all audios with the audio-js class
  //    A audio tag ID or audio tag element: set up one audio and return one player
  //    An array of audio tag elements/IDs: set up each and return an array of players
  setup: function(audios, options){
    var returnSingular = false,
    playerList = [],
    audioElement;

    // If audios is undefined or "All", set up all audios with the audio-js class
    if (!audios || audios == "All") {
      audios = AudioJS.getAudioJSTags();
    // If audios is not an array, add to an array
    } else if (typeof audios != 'object' || audios.nodeType == 1) {
      audios = [audios];
      returnSingular = true;
    }

    // Loop through audios and create players for them
    for (var i=0; i<audios.length; i++) {
      if (typeof audios[i] == 'string') {
        audioElement = document.getElementById(audios[i]);
      } else { // assume DOM object
        audioElement = audios[i];
      }
      playerList.push(new AudioJS(audioElement, options));
    }

    // Return one or all depending on what was passed in
    return (returnSingular) ? playerList[0] : playerList;
  },

  // Find audio tags with the audio-js class
  getAudioJSTags: function() {
    var audioTags = document.getElementsByTagName("audio"),
    audioJSTags = [], audioTag;

    for (var i=0,j=audioTags.length; i<j; i++) {
      audioTag = audioTags[i];
      if (audioTag.className.indexOf("audio-js") != -1) {
        audioJSTags.push(audioTag);
      }
    }
    return audioJSTags;
  },

  // Check if the browser supports audio.
  browserSupportsAudio: function() {
    if (typeof AudioJS.audioSupport != "undefined") { return AudioJS.audioSupport; }
    AudioJS.audioSupport = !!document.createElement('audio').canPlayType;
    return AudioJS.audioSupport;
  },


  // Browser & Device Checks
  isIE: function(){ return !+"\v1"; },
  isIPad: function(){ return navigator.userAgent.match(/iPad/i) !== null; },
  isIPhone: function(){ return navigator.userAgent.match(/iPhone/i) !== null; },
  isIOS: function(){ return AudioJS.isIPhone() || AudioJS.isIPad(); },
  iOSVersion: function() {
    var match = navigator.userAgent.match(/OS (\d+)_/i);
    if (match && match[1]) { return match[1]; }
  },
  isAndroid: function(){ return navigator.userAgent.match(/Android/i) !== null; },
  androidVersion: function() {
    var match = navigator.userAgent.match(/Android (\d+)\./i);
    if (match && match[1]) { return match[1]; }
  },

  warnings: {
    // Safari errors if you call functions on a audio that hasn't loaded yet
    audioNotReady: "Audio is not ready yet (try playing the audio first).",
    // Getting a QUOTA_EXCEEDED_ERR when setting local storage occasionally
    localStorageFull: "Local Storage is Full"
  }
});

// Shim to make audio tag valid in IE
if(AudioJS.isIE()) { document.createElement("audio"); }

// Expose to global
window.AudioJS = window._A_ = AudioJS;

/* HTML5 Player Type
================ */
AudioJS.player.extend({
  html5Supported: function(){
    if (AudioJS.browserSupportsAudio()) {
      return true;
    } else {
      return false;
    }
  },
  html5Init: function(){
    this.element = this.audio;

    this.fixPreloading(); // Support old browsers that used autobuffer
    this.supportProgressEvents(); // Support browsers that don't use 'buffered'

    // Set to stored volume OR 85%
    this.volume((localStorage && localStorage.volume) || this.options.defaultVolume);

    // Update interface for device needs
    if (AudioJS.isIOS()) {
      _A_.addClass(this.box, "ajs-ios");
      this.options.useBuiltInControls = true;
      this.iOSInterface();
    } else if (AudioJS.isAndroid()) {
      this.options.useBuiltInControls = true;
      this.androidInterface();
    }

    // Add AudioJS Controls
    if (!this.options.useBuiltInControls) {
      this.audio.controls = false;

      // Make a click on the audio act as a play button
      this.activateElement(this.audio, "playToggle");

      // Build Interface
      this.buildAndActivateSpinner();
      this.buildAndActivateControlBar();
      this.loadInterface(); // Show everything once styles are loaded
    }
  },
  /* Source Management
  ================ */
  canPlaySource: function(){
    // Cache Result
    if (this.canPlaySourceResult) { return this.canPlaySourceResult; }
    // Loop through sources and check if any can play
    var children = this.audio.children;
    for (var i=0,j=children.length; i<j; i++) {
      if (children[i].tagName.toUpperCase() == "SOURCE") {
        var canPlay = this.audio.canPlayType(children[i].type) || this.canPlayExt(children[i].src);
        if (canPlay == "probably" || canPlay == "maybe") {
          this.firstPlayableSource = children[i];
          this.canPlaySourceResult = true;
          return true;
        }
      }
    }
    this.canPlaySourceResult = false;
    return false;
  },
  // Check if the extention is compatible, for when type won't work
  canPlayExt: function(src){
    if (!src) { return ""; }
    var match = src.match(/\.([^\.]+)$/);
    if (match && match[1]) {
      var ext = match[1].toLowerCase();
      // Android canPlayType doesn't work
      if (AudioJS.isAndroid()) {
        if (ext == "mp4" || ext == "m4v") { return "maybe"; }
      // Allow Apple HTTP Streaming for iOS
      } else if (AudioJS.isIOS()) {
        if (ext == "m3u8") { return "maybe"; }
      }
    }
    return "";
  },
  // Force the audio source - Helps fix loading bugs in a handful of devices
  // And iPad/iPhone javascript include location bug. And Android type attribute bug
  forceTheSource: function(){
    this.audio.src = this.firstPlayableSource.src; // From canPlaySource()
    this.audio.load();
  },
  /* Device Fixes
  ================ */
  // Support older browsers that used "autobuffer"
  fixPreloading: function(){
    if (typeof this.audio.hasAttribute == "function" && this.audio.hasAttribute("preload") && this.audio.preload != "none") {
      this.audio.autobuffer = true; // Was a boolean
    } else {
      this.audio.autobuffer = false;
      this.audio.preload = "none";
    }
  },

  // Listen for audio Load Progress (currently does not if html file is local)
  // Buffered does't work in all browsers, so watching progress as well
  supportProgressEvents: function(e){
    _A_.addListener(this.audio, 'progress', this.playerOnAudioProgress.context(this));
  },
  playerOnAudioProgress: function(event){
    this.setBufferedFromProgress(event);
  },
  setBufferedFromProgress: function(event){ // HTML5 Only
    if(event.total > 0) {
      var newBufferEnd = (event.loaded / event.total) * this.duration();
      if (newBufferEnd > this.values.bufferEnd) { this.values.bufferEnd = newBufferEnd; }
    }
  },

  iOSInterface: function(){
    if(AudioJS.iOSVersion() < 4) { this.forceTheSource(); } // Fix loading issues
    if(AudioJS.isIPad()) {
      this.buildAndActivateSpinner(); // Spinner still works well on iPad, since iPad doesn't have one
    }
  },

  // Fix android specific quirks
  // Use built-in controls, but add the big play button, since android doesn't have one.
  androidInterface: function(){
    this.forceTheSource(); // Fix loading issues
    _A_.addListener(this.audio, "click", function(){ this.play(); }); // Required to play
  },
  /* Wait for styles (TODO: move to _A_)
  ================ */
  loadInterface: function(){
    if (this.options.controlsAtStart) { this.showControlBars(); }
    this.positionControlBars();
  },
  /* Control Bar
  ================

  Builds this markup:

      <div class="ajs-controls">
        <div class="ajs-play-control">
          <span></span>
        </div>
        <div class="ajs-progress-control">
          <div class="ajs-progress-holder">
            <div class="ajs-load-progress"></div>
            <div class="ajs-play-progress"></div>
          </div>
        </div>
        <div class="ajs-time-control">
          <span class="ajs-current-time-display">00:00</span><span> / </span><span class="ajs-duration-display">00:00</span>
        </div>
        <div class="ajs-volume-control">
          <div>
        <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>

    */
  buildAndActivateControlBar: function(){
    // Create a div to hold the different controls
    this.controls = _A_.createElement("div", { className: "ajs-controls" });
    // Add the controls to the audio's container
    this.box.appendChild(this.controls);
    this.activateElement(this.controls, "controlBar");
    this.activateElement(this.controls, "mouseOverAudioReporter");

    // Build the play control
    this.playControl = _A_.createElement("div", { className: "ajs-play-control", innerHTML: "<span></span>" });
    this.controls.appendChild(this.playControl);
    this.activateElement(this.playControl, "playToggle");

    // Build the progress control
    this.progressControl = _A_.createElement("div", { className: "ajs-progress-control" });
    this.controls.appendChild(this.progressControl);

    // Create a holder for the progress bars
    this.progressHolder = _A_.createElement("div", { className: "ajs-progress-holder" });
    this.progressControl.appendChild(this.progressHolder);
    this.activateElement(this.progressHolder, "currentTimeScrubber");

    // Create the loading progress display
    this.loadProgressBar = _A_.createElement("div", { className: "ajs-load-progress" });
    this.progressHolder.appendChild(this.loadProgressBar);
    this.activateElement(this.loadProgressBar, "loadProgressBar");

    // Create the playing progress display
    this.playProgressBar = _A_.createElement("div", { className: "ajs-play-progress" });
    this.progressHolder.appendChild(this.playProgressBar);
    this.activateElement(this.playProgressBar, "playProgressBar");

    // Create the progress time display (00:00 / 00:00)
    this.timeControl = _A_.createElement("div", { className: "ajs-time-control" });
    this.controls.appendChild(this.timeControl);

    // Create the current play time display
    this.currentTimeDisplay = _A_.createElement("span", { className: "ajs-current-time-display", innerHTML: "00:00" });
    this.timeControl.appendChild(this.currentTimeDisplay);
    this.activateElement(this.currentTimeDisplay, "currentTimeDisplay");

    // Add time separator
    this.timeSeparator = _A_.createElement("span", { innerHTML: " / " });
    this.timeControl.appendChild(this.timeSeparator);

    // Create the total duration display
    this.durationDisplay = _A_.createElement("span", { className: "ajs-duration-display", innerHTML: "00:00" });
    this.timeControl.appendChild(this.durationDisplay);
    this.activateElement(this.durationDisplay, "durationDisplay");

    // Create the volume control
    var bars = [];
    while(bars.length < this.options.volumeBars){
      bars.push('<span></span>');
    }

    this.volumeControl = _A_.createElement("div", {
      className: "ajs-volume-control",
      innerHTML: "<div>" + bars.join('') + "</div>"
    });
    this.controls.appendChild(this.volumeControl);
    this.activateElement(this.volumeControl, "volumeScrubber");

    // Create the description display
    this.descriptionMeta = _A_.createElement("div", {
      className: "description",
      innerHTML: this.audio.getAttribute('data-description')
    });
    this.controls.appendChild(this.descriptionMeta);

    this.volumeDisplay = this.volumeControl.children[0];
    this.activateElement(this.volumeDisplay, "volumeDisplay");
  },
  /* Spinner (Loading)
  ================ */
  buildAndActivateSpinner: function(){
    this.spinner = _A_.createElement("div", {className: "ajs-spinner"});
    this.box.appendChild(this.spinner);
    this.activateElement(this.spinner, "spinner");
  },

  /* Player API - Translate functionality from player to audio
  ================ */
  addAudioListener: function(type, fn){ _A_.addListener(this.audio, type, fn.rEvtContext(this)); },

  play: function(){
    // Pause all other players
    this.each(_A_.getAudioJSTags(), function(players){
      players.pause();
    });

    // Play
    this.audio.play();
    return this;
  },
  onPlay: function(fn){ this.addAudioListener("play", fn); return this; },

  pause: function(){
    this.audio.pause();
    return this;
  },
  onPause: function(fn){ this.addAudioListener("pause", fn); return this; },
  paused: function() { return this.audio.paused; },

  currentTime: function(seconds){
    if (seconds !== undefined) {
      try { this.audio.currentTime = seconds; }
      catch(e) { this.warning(AudioJS.warnings.audioNotReady); }
      this.values.currentTime = seconds;
      return this;
    }
    return this.audio.currentTime;
  },
  onCurrentTimeUpdate: function(fn){
    this.currentTimeListeners.push(fn);
  },

  duration: function(){
    return this.audio.duration;
  },

  buffered: function(){
    // Storing values allows them be overridden by setBufferedFromProgress
    if (this.values.bufferStart === undefined) {
      this.values.bufferStart = 0;
      this.values.bufferEnd = 0;
    }
    if (this.audio.buffered && this.audio.buffered.length > 0) {
      var newEnd = this.audio.buffered.end(0);
      if (newEnd > this.values.bufferEnd) { this.values.bufferEnd = newEnd; }
    }
    return [this.values.bufferStart, this.values.bufferEnd];
  },

  volume: function(percentAsDecimal){
    if (percentAsDecimal !== undefined) {
      // Force value to between 0 and 1
      this.values.volume = Math.max(0, Math.min(1, parseFloat(percentAsDecimal)));
      this.audio.volume = this.values.volume;
      this.setLocalStorage("volume", this.values.volume);
      return this;
    }
    if (this.values.volume) { return this.values.volume; }
    return this.audio.volume;
  },
  onVolumeChange: function(fn){ _A_.addListener(this.audio, 'volumechange', fn.rEvtContext(this)); },

  width: function(width){
    if (width !== undefined) {
      this.audio.width = width; // Not using style so it can be overridden
      this.box.style.width = width+"px";
      this.triggerResizeListeners();
      return this;
    }
    return this.audio.offsetWidth || this.audio.style.width || 400;
  },
  height: function(height){
    if (height !== undefined) {
      this.audio.height = height;
      this.box.style.height = height+"px";
      this.triggerResizeListeners();
      return this;
    }
    return this.audio.offsetHeight;
  },

  onError: function(fn){ this.addAudioListener("error", fn); return this; },
  onEnded: function(fn){
    this.addAudioListener("ended", fn); return this;
  }
});

////////////////////////////////////////////////////////////////////////////////
// Element Behaviors
// Tell elements how to act or react
////////////////////////////////////////////////////////////////////////////////

/* Player Behaviors - How AudioJS reacts to what the audio is doing.
================ */
AudioJS.player.newBehavior("player", function(player){
    this.onError(this.playerOnAudioError);
    // Listen for when the audio is played
    this.onPlay(this.playerOnAudioPlay);
    this.onPlay(this.trackCurrentTime);
    // Listen for when the audio is paused
    this.onPause(this.playerOnAudioPause);
    this.onPause(this.stopTrackingCurrentTime);
    // Listen for when the audio ends
    this.onEnded(this.playerOnAudioEnded);
    // Set interval for load progress using buffer watching method
    // this.trackCurrentTime();
    this.trackBuffered();
    // Buffer Full
    this.onBufferedUpdate(this.isBufferFull);
  },{
    playerOnAudioError: function(event){
      this.log(event);
      this.log(this.audio.error);
    },
    playerOnAudioPlay: function(event){ this.hasPlayed = true; },
    playerOnAudioPause: function(event){},
    playerOnAudioEnded: function(event){
      this.currentTime(0);
      this.pause();
    },

    /* Load Tracking -------------------------------------------------------------- */
    // Buffer watching method for load progress.
    // Used for browsers that don't support the progress event
    trackBuffered: function(){
      this.bufferedInterval = setInterval(this.triggerBufferedListeners.context(this), 500);
    },
    stopTrackingBuffered: function(){ clearInterval(this.bufferedInterval); },
    bufferedListeners: [],
    onBufferedUpdate: function(fn){
      this.bufferedListeners.push(fn);
    },
    triggerBufferedListeners: function(){
      this.isBufferFull();
      this.each(this.bufferedListeners, function(listener){
        (listener.context(this))();
      });
    },
    isBufferFull: function(){
      if (this.bufferedPercent() == 1) { this.stopTrackingBuffered(); }
    },

    /* Time Tracking -------------------------------------------------------------- */
    trackCurrentTime: function(){
      if (this.currentTimeInterval) { clearInterval(this.currentTimeInterval); }
      this.currentTimeInterval = setInterval(this.triggerCurrentTimeListeners.context(this), 100); // 42 = 24 fps
      this.trackingCurrentTime = true;
    },
    // Turn off play progress tracking (when paused or dragging)
    stopTrackingCurrentTime: function(){
      clearInterval(this.currentTimeInterval);
      this.trackingCurrentTime = false;
    },
    currentTimeListeners: [],
    // onCurrentTimeUpdate is in API section now
    triggerCurrentTimeListeners: function(late, newTime){ // FF passes milliseconds late as the first argument
      this.each(this.currentTimeListeners, function(listener){
        (listener.context(this))(newTime || this.currentTime());
      });
    },

    /* Resize Tracking -------------------------------------------------------------- */
    resizeListeners: [],
    onResize: function(fn){
      this.resizeListeners.push(fn);
    },
    // Trigger anywhere the audio/box size is changed.
    triggerResizeListeners: function(){
      this.each(this.resizeListeners, function(listener){
        (listener.context(this))();
      });
    }
  }
);
/* Mouse Over Audio Reporter Behaviors - i.e. Controls hiding based on mouse location
================ */
AudioJS.player.newBehavior("mouseOverAudioReporter", function(element){
    // Listen for the mouse move the audio. Used to reveal the controller.
    _A_.addListener(element, "mousemove", this.mouseOverAudioReporterOnMouseMove.context(this));
    // Listen for the mouse moving out of the audio. Used to hide the controller.
    _A_.addListener(element, "mouseout", this.mouseOverAudioReporterOnMouseOut.context(this));
  },{
    mouseOverAudioReporterOnMouseMove: function(){
      this.showControlBars();
      clearInterval(this.mouseMoveTimeout);
      this.mouseMoveTimeout = setTimeout(this.hideControlBars.context(this), 4000);
    },
    mouseOverAudioReporterOnMouseOut: function(event){
      // Prevent flicker by making sure mouse hasn't left the audio
      var parent = event.relatedTarget;
      while (parent && parent !== this.box) {
        parent = parent.parentNode;
      }
      if (parent !== this.box) {
        this.hideControlBars();
      }
    }
  }
);
/* Mouse Over Audio Reporter Behaviors - i.e. Controls hiding based on mouse location
================ */
AudioJS.player.newBehavior("box", function(element){
    _A_.addClass(element, "ajs-paused");
    this.activateElement(element, "mouseOverAudioReporter");
    this.onPlay(this.boxOnAudioPlay);
    this.onPause(this.boxOnAudioPause);
  },{
    boxOnAudioPlay: function(){
      _A_.removeClass(this.box, "ajs-paused");
      _A_.addClass(this.box, "ajs-playing");
    },
    boxOnAudioPause: function(){
      _A_.removeClass(this.box, "ajs-playing");
      _A_.addClass(this.box, "ajs-paused");
    }
  }
);

/* Control Bar Behaviors
================ */
AudioJS.player.newBehavior("controlBar", function(element){
    if (!this.controlBars) {
      this.controlBars = [];
      this.onResize(this.positionControlBars);
    }
    this.controlBars.push(element);
    _A_.addListener(element, "mousemove", this.onControlBarsMouseMove.context(this));
    _A_.addListener(element, "mouseout", this.onControlBarsMouseOut.context(this));
  },{
    showControlBars: function(){
      if (!this.options.controlsAtStart && !this.hasPlayed) { return; }
      this.each(this.controlBars, function(bar){
        bar.style.display = "block";
      });
    },
    // Place controller relative to the audio's position (now just resizing bars)
    positionControlBars: function(){
      this.updatePlayProgressBars();
      this.updateLoadProgressBars();
    },
    hideControlBars: function(){
      if (this.options.controlsHiding && !this.mouseIsOverControls) {
        this.each(this.controlBars, function(bar){
          bar.style.display = "none";
        });
      }
    },
    // Block controls from hiding when mouse is over them.
    onControlBarsMouseMove: function(){ this.mouseIsOverControls = true; },
    onControlBarsMouseOut: function(event){
      this.mouseIsOverControls = false;
    }
  }
);
/* PlayToggle, PlayButton, PauseButton Behaviors
================ */
// Play Toggle
AudioJS.player.newBehavior("playToggle", function(element){
    if (!this.elements.playToggles) {
      this.elements.playToggles = [];
      this.onPlay(this.playTogglesOnPlay);
      this.onPause(this.playTogglesOnPause);
    }
    this.elements.playToggles.push(element);
    _A_.addListener(element, "click", this.onPlayToggleClick.context(this));
  },{
    onPlayToggleClick: function(event){
      if (this.paused()) {
        this.play();
      } else {
        this.pause();
      }
    },
    playTogglesOnPlay: function(event){
      this.each(this.elements.playToggles, function(toggle){
        _A_.removeClass(toggle, "ajs-paused");
        _A_.addClass(toggle, "ajs-playing");
      });
    },
    playTogglesOnPause: function(event){
      this.each(this.elements.playToggles, function(toggle){
        _A_.removeClass(toggle, "ajs-playing");
        _A_.addClass(toggle, "ajs-paused");
      });
    }
  }
);
// Play
AudioJS.player.newBehavior("playButton", function(element){
    _A_.addListener(element, "click", this.onPlayButtonClick.context(this));
  },{
    onPlayButtonClick: function(event){ this.play(); }
  }
);
// Pause
AudioJS.player.newBehavior("pauseButton", function(element){
    _A_.addListener(element, "click", this.onPauseButtonClick.context(this));
  },{
    onPauseButtonClick: function(event){ this.pause(); }
  }
);
/* Play Progress Bar Behaviors
================ */
AudioJS.player.newBehavior("playProgressBar", function(element){
    if (!this.playProgressBars) {
      this.playProgressBars = [];
      this.onCurrentTimeUpdate(this.updatePlayProgressBars);
    }
    this.playProgressBars.push(element);
  },{
    // Ajust the play progress bar's width based on the current play time
    updatePlayProgressBars: function(newTime){
      var progress = (newTime !== undefined) ? newTime / this.duration() : this.currentTime() / this.duration();
      if (isNaN(progress)) { progress = 0; }
      this.each(this.playProgressBars, function(bar){
        if (bar.style) { bar.style.width = _A_.round(progress * 100, 2) + "%"; }
      });
    }
  }
);
/* Load Progress Bar Behaviors
================ */
AudioJS.player.newBehavior("loadProgressBar", function(element){
    if (!this.loadProgressBars) { this.loadProgressBars = []; }
    this.loadProgressBars.push(element);
    this.onBufferedUpdate(this.updateLoadProgressBars);
  },{
    updateLoadProgressBars: function(){
      this.each(this.loadProgressBars, function(bar){
        if (bar.style) { bar.style.width = _A_.round(this.bufferedPercent() * 100, 2) + "%"; }
      });
    }
  }
);

/* Current Time Display Behaviors
================ */
AudioJS.player.newBehavior("currentTimeDisplay", function(element){
    if (!this.currentTimeDisplays) {
      this.currentTimeDisplays = [];
      this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
    }
    this.currentTimeDisplays.push(element);
  },{
    // Update the displayed time (00:00)
    updateCurrentTimeDisplays: function(newTime){
      if (!this.currentTimeDisplays) { return; }
      // Allows for smooth scrubbing, when player can't keep up.
      var time = (newTime) ? newTime : this.currentTime();
      this.each(this.currentTimeDisplays, function(dis){
        dis.innerHTML = _A_.formatTime(time);
      });
    }
  }
);

/* Duration Display Behaviors
================ */
AudioJS.player.newBehavior("durationDisplay", function(element){
    if (!this.durationDisplays) {
      this.durationDisplays = [];
      this.onCurrentTimeUpdate(this.updateDurationDisplays);
    }
    this.durationDisplays.push(element);
  },{
    updateDurationDisplays: function(){
      if (!this.durationDisplays) { return; }
      this.each(this.durationDisplays, function(dis){
        if (this.duration()) { dis.innerHTML = _A_.formatTime(this.duration()); }
      });
    }
  }
);

/* Current Time Scrubber Behaviors
================ */
AudioJS.player.newBehavior("currentTimeScrubber", function(element){
    _A_.addListener(element, "mousedown", this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
  },{
    // Adjust the play position when the user drags on the progress bar
    onCurrentTimeScrubberMouseDown: function(event, scrubber){
      event.preventDefault();
      this.currentScrubber = scrubber;

      this.stopTrackingCurrentTime(); // Allows for smooth scrubbing

      this.audioWasPlaying = !this.paused();
      this.pause();

      _A_.blockTextSelection();
      this.setCurrentTimeWithScrubber(event);
      _A_.addListener(document, "mousemove", this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
      _A_.addListener(document, "mouseup", this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
    },
    onCurrentTimeScrubberMouseMove: function(event){ // Removeable
      this.setCurrentTimeWithScrubber(event);
    },
    onCurrentTimeScrubberMouseUp: function(event){ // Removeable
      _A_.unblockTextSelection();
      document.removeEventListener("mousemove", this.onCurrentTimeScrubberMouseMove, false);
      document.removeEventListener("mouseup", this.onCurrentTimeScrubberMouseUp, false);
      if (this.audioWasPlaying) {
        this.play();
        this.trackCurrentTime();
      }
    },
    setCurrentTimeWithScrubber: function(event){
      var newProgress = _A_.getRelativePosition(event.pageX, this.currentScrubber);
      var newTime = newProgress * this.duration();
      this.triggerCurrentTimeListeners(0, newTime); // Allows for smooth scrubbing
      // Don't let audio end while scrubbing.
      if (newTime == this.duration()) { newTime = newTime - 0.1; }
      this.currentTime(newTime);
    }
  }
);
/* Volume Display Behaviors
================ */
AudioJS.player.newBehavior("volumeDisplay", function(element){
    if (!this.volumeDisplays) {
      this.volumeDisplays = [];
      this.onVolumeChange(this.updateVolumeDisplays);
    }
    this.volumeDisplays.push(element);
    this.updateVolumeDisplay(element); // Set the display to the initial volume
  },{
    // Update the volume control display
    // Unique to these default controls. Uses borders to create the look of bars.
    updateVolumeDisplays: function(){
      if (!this.volumeDisplays) { return; }
      this.each(this.volumeDisplays, function(dis){
        this.updateVolumeDisplay(dis);
      });
    },
    updateVolumeDisplay: function(display){
      var volNum = Math.ceil(this.volume() * this.options.volumeBars);
      this.each(display.children, function(child, num){
        if (num < volNum) {
          _A_.addClass(child, "ajs-volume-level-on");
        } else {
          _A_.removeClass(child, "ajs-volume-level-on");
        }
      });
    }
  }
);
/* Volume Scrubber Behaviors
================ */
AudioJS.player.newBehavior("volumeScrubber", function(element){
    _A_.addListener(element, "mousedown", this.onVolumeScrubberMouseDown.rEvtContext(this));
  },{
    // Adjust the volume when the user drags on the volume control
    onVolumeScrubberMouseDown: function(event, scrubber){
      // event.preventDefault();
      _A_.blockTextSelection();
      this.currentScrubber = scrubber;
      this.setVolumeWithScrubber(event);
      _A_.addListener(document, "mousemove", this.onVolumeScrubberMouseMove.rEvtContext(this));
      _A_.addListener(document, "mouseup", this.onVolumeScrubberMouseUp.rEvtContext(this));
    },
    onVolumeScrubberMouseMove: function(event){
      this.setVolumeWithScrubber(event);
    },
    onVolumeScrubberMouseUp: function(event){
      this.setVolumeWithScrubber(event);
      _A_.unblockTextSelection();
      document.removeEventListener("mousemove", this.onVolumeScrubberMouseMove, false);
      document.removeEventListener("mouseup", this.onVolumeScrubberMouseUp, false);
    },
    setVolumeWithScrubber: function(event){
      var newVol = _A_.getRelativePosition(event.pageX, this.currentScrubber);
      this.volume(newVol);
    }
  }
);
/* Spinner
================ */
AudioJS.player.newBehavior("spinner", function(element){
    if (!this.spinners) {
      this.spinners = [];
      _A_.addListener(this.audio, "loadeddata", this.spinnersOnAudioLoadedData.context(this));
      _A_.addListener(this.audio, "loadstart", this.spinnersOnAudioLoadStart.context(this));
      _A_.addListener(this.audio, "seeking", this.spinnersOnAudioSeeking.context(this));
      _A_.addListener(this.audio, "seeked", this.spinnersOnAudioSeeked.context(this));
      _A_.addListener(this.audio, "canplay", this.spinnersOnAudioCanPlay.context(this));
      _A_.addListener(this.audio, "canplaythrough", this.spinnersOnAudioCanPlayThrough.context(this));
      _A_.addListener(this.audio, "waiting", this.spinnersOnAudioWaiting.context(this));
      _A_.addListener(this.audio, "stalled", this.spinnersOnAudioStalled.context(this));
      _A_.addListener(this.audio, "suspend", this.spinnersOnAudioSuspend.context(this));
      _A_.addListener(this.audio, "playing", this.spinnersOnAudioPlaying.context(this));
      _A_.addListener(this.audio, "timeupdate", this.spinnersOnAudioTimeUpdate.context(this));
    }
    this.spinners.push(element);
  },{
    showSpinners: function(){
      this.each(this.spinners, function(spinner){
        spinner.style.display = "block";
      });
      clearInterval(this.spinnerInterval);
      this.spinnerInterval = setInterval(this.rotateSpinners.context(this), 100);
    },
    hideSpinners: function(){
      this.each(this.spinners, function(spinner){
        spinner.style.display = "none";
      });
      clearInterval(this.spinnerInterval);
    },
    spinnersRotated: 0,
    rotateSpinners: function(){ },
    spinnersOnAudioLoadedData: function(event){ this.hideSpinners(); },
    spinnersOnAudioLoadStart: function(event){ this.showSpinners(); },
    spinnersOnAudioSeeking: function(event){ /* this.showSpinners(); */ },
    spinnersOnAudioSeeked: function(event){ /* this.hideSpinners(); */ },
    spinnersOnAudioCanPlay: function(event){ /* this.hideSpinners(); */ },
    spinnersOnAudioCanPlayThrough: function(event){ this.hideSpinners(); },
    spinnersOnAudioWaiting: function(event){
      // Safari sometimes triggers waiting inappropriately
      // Like after audio has played, any you play again.
      this.showSpinners();
    },
    spinnersOnAudioStalled: function(event){},
    spinnersOnAudioSuspend: function(event){},
    spinnersOnAudioPlaying: function(event){ this.hideSpinners(); },
    spinnersOnAudioTimeUpdate: function(event){
      // Safari sometimes calls waiting and doesn't recover
      if(this.spinner.style.display == "block") { this.hideSpinners(); }
    }
  }
);

////////////////////////////////////////////////////////////////////////////////
// Convenience Functions (mini library)
// Functions not specific to Audio or AudioJS and could probably be replaced with a library like jQuery
////////////////////////////////////////////////////////////////////////////////

AudioJS.extend({

  addClass: function(element, classToAdd){
    if ((" "+element.className+" ").indexOf(" "+classToAdd+" ") == -1) {
      element.className = element.className === "" ? classToAdd : element.className + " " + classToAdd;
    }
  },
  removeClass: function(element, classToRemove){
    if (element.className.indexOf(classToRemove) == -1) { return; }
    var classNames = element.className.split(/\s+/);
    classNames.splice(classNames.lastIndexOf(classToRemove),1);
    element.className = classNames.join(" ");
  },
  createElement: function(tagName, attributes){
    return this.merge(document.createElement(tagName), attributes);
  },

  // Attempt to block the ability to select text while dragging controls
  blockTextSelection: function(){
    document.body.focus();
    document.onselectstart = function () { return false; };
  },
  // Turn off text selection blocking
  unblockTextSelection: function(){ document.onselectstart = function () { return true; }; },

  // Return seconds as MM:SS
  formatTime: function(secs) {
    var seconds = Math.round(secs);
    var minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  },

  // Return the relative horizonal position of an event as a value from 0-1
  getRelativePosition: function(x, relativeElement){
    return Math.max(0, Math.min(1, (x - this.findPosX(relativeElement)) / relativeElement.offsetWidth));
  },
  // Get an objects position on the page
  findPosX: function(obj) {
    var curleft = obj.offsetLeft;
    while(obj = obj.offsetParent) {
      curleft += obj.offsetLeft;
    }
    return curleft;
  },
  getComputedStyleValue: function(element, style){
    return window.getComputedStyle(element, null).getPropertyValue(style);
  },

  round: function(num, dec) {
    if (!dec) { dec = 0; }
    return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  },

  addListener: function(element, type, handler){
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on"+type, handler);
    }
  },
  removeListener: function(element, type, handler){
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.detachEvent("on"+type, handler);
    }
  },

  get: function(url, onSuccess){
    if (typeof XMLHttpRequest == "undefined") {
      XMLHttpRequest = function () {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (f) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (g) {}
        //Microsoft.XMLHTTP points to Msxml2.XMLHTTP.3.0 and is redundant
        throw new Error("This browser does not support XMLHttpRequest.");
      };
    }
    var request = new XMLHttpRequest();
    request.open("GET",url);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        onSuccess(request.responseText);
      }
    }.context(this);
    request.send();
  },

  trim: function(string){ return string.toString().replace(/^\s+/, "").replace(/\s+$/, ""); },

  // DOM Ready functionality adapted from jQuery. http://jquery.com/
  bindDOMReady: function(){
    if (document.readyState === "complete") {
      return AudioJS.onDOMReady();
    }
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", AudioJS.DOMContentLoaded, false);
      window.addEventListener("load", AudioJS.onDOMReady, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", AudioJS.DOMContentLoaded);
      window.attachEvent("onload", AudioJS.onDOMReady);
    }
  },

  DOMContentLoaded: function(){
    if (document.addEventListener) {
      document.removeEventListener( "DOMContentLoaded", AudioJS.DOMContentLoaded, false);
      AudioJS.onDOMReady();
    } else if ( document.attachEvent ) {
      if ( document.readyState === "complete" ) {
        document.detachEvent("onreadystatechange", AudioJS.DOMContentLoaded);
        AudioJS.onDOMReady();
      }
    }
  },

  // Functions to be run once the DOM is loaded
  DOMReadyList: [],
  addToDOMReady: function(fn){
    if (AudioJS.DOMIsReady) {
      fn.call(document);
    } else {
      AudioJS.DOMReadyList.push(fn);
    }
  },

  DOMIsReady: false,
  onDOMReady: function(){
    if (AudioJS.DOMIsReady) { return; }
    if (!document.body) { return setTimeout(AudioJS.onDOMReady, 13); }
    AudioJS.DOMIsReady = true;
    if (AudioJS.DOMReadyList) {
      for (var i=0; i<AudioJS.DOMReadyList.length; i++) {
        AudioJS.DOMReadyList[i].call(document);
      }
      AudioJS.DOMReadyList = null;
    }
  }
});
AudioJS.bindDOMReady();

// Allows for binding context to functions
// when using in event listeners and timeouts
Function.prototype.context = function(obj){
  var method = this,
  temp = function(){
    return method.apply(obj, arguments);
  };
  return temp;
};

// Like context, in that it creates a closure
// But insteaad keep "this" intact, and passes the var as the second argument of the function
// Need for event listeners where you need to know what called the event
// Only use with event callbacks
Function.prototype.evtContext = function(obj){
  var method = this,
  temp = function(){
    var origContext = this;
    return method.call(obj, arguments[0], origContext);
  };
  return temp;
};

// Removeable Event listener with Context
// Replaces the original function with a version that has context
// So it can be removed using the original function name.
// In order to work, a version of the function must already exist in the player/prototype
Function.prototype.rEvtContext = function(obj, funcParent){
  if (this.hasContext === true) { return this; }
  if (!funcParent) { funcParent = obj; }
  for (var attrname in funcParent) {
    if (funcParent[attrname] == this) {
      funcParent[attrname] = this.evtContext(obj);
      funcParent[attrname].hasContext = true;
      return funcParent[attrname];
    }
  }
  return this.evtContext(obj);
};
// Expose to global
window.AudioJS = window._A_ = AudioJS;

// End self-executing function
})(window);
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
var formdata;

//The DOM has began to be rendered
$(function() {
    $.support.cors = true;

    //rec control buttons
    var recbtn = $('#record-story');
    var stopbtn = $('#end-session');
    var uploadbtn = $('#upload-story');

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
            alert(JSON.stringify(audiofile));

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
            } else if (options === false) { //if options == false
                localStorage.removeItem(key);
                if ($.cookie) $.cookie(key, false); //remove everything
            }

            //if only one argument is given retrieve that data from localstorage
            return arguments.length == 1 ? JSON.parse(localStorage.getItem(key)) : false;
        }
    }

    // --------- FACEBOOK INTERGRATION ----------
    // The function assigned to window.fbAsyncInit is run as soon as the SDK has completed loading.
    // Any code that you want to run after the SDK is loaded should be placed within this function and after the call to FB.init.
    // Any kind of JavaScript can be used here, but any SDK functions must be called after FB.init.
    window.fbAsyncInit = function() {
        // Setting status & xfbml to false can improve page load times, 
        // but you'll need to manually check for login status using FB.getLoginStatus.
        FB.init({
            appId: '1425261494379816',
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
        console.log("Mobile device detected -- " + device);
        alert("Mobile device detected -- " + device);
    }

    //disable the rec-btn until permission is granted to use microphone;
    recbtn.attr('disabled', 'disabled').next('#end-session').hide().next('#upload-story').hide();

    //Does the device support the API, if doesnt fall back to Media Capture API
    if (Modernizr.getusermedia) {
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
                    recbtn.removeAttr("disabled");
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

            //Get all the JS scripts in the page for GRUNTFILE addition
            // var sc = $('html').find('script').map(function(a, b) {
            //     if($(b).attr('src'))return $(b).attr('src');
            // });
            // console.log(sc);
        });

        //if the user begins to record the data
        recbtn.click(function() {
            if (recorder) { //If access was granted to use the microphone
                // var recbtn = $(this);
                recbtn.attr('disabled', 'disabled'); //remove recording event listener
                //Access has been granted and the user is now live: microphone
                recbtn.removeClass("btn-danger").addClass("btn-success").text("Recording...");
                //begin recording
                recorder.record();
                //Show the stop button and attach event if he ENDS the recording
                stopbtn.fadeIn();
                uploadbtn.hide(); //hide upload btn, if shown
            } else {
                //Something went wrong, maybe the user denied the application access to the MIC
            }
        });

        //onclick of END recording button
        stopbtn.on('click', function(event) {
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
        alert("Browser does not support getUserMedia");

        // instead will act as handler for the file-picker input
        recbtn.removeAttr("disabled").on('click', function(event) {
            event.preventDefault();
            audioInput.click(); //will prompt user to record audio with phone
        });

        //listen when user adds audio file, after recording
        audioInput.onchange = function(event) {
            hadithi.processAudioFile(audioInput.files[0]); //its just one
            alert('Your recording has been added successfully. Now press OK to upload your story.')
        };
    }

    //prompt uploadin of the recording
    /*
     - check length - 1 min
     - check to see if there is any user data stored
     - upload to servers
     - track the uploading progress
    */
    uploadbtn.click(function() {
        hadithi.checkIfUserExist(function(user) {
            if (user) { //a user exists
                //create formdata with it to be submitted with story
                var fd = new FormData();
                var af = document.getElementById('recorded-audio');

                fd.append('user_data', JSON.stringify(user));
                // fd.append('facebook_data', JSON.stringify(user));
                fd.append('audio_file', af.src);
                fd.append('audio_length', af.getAttribute('data-audio-length'));
                fd.append('isFacebook', user.isFacebook || false);

                //transfer to formdata global variable
                formdata = fd;
                hadithi.uploadAudioFile();
            } else {
                hadithi.checkIfUserExist([], false);
            }
        }, true); //no FB checkin needed
        //reset the upload button
        uploadEvent();
    });

    uploadEvent = function() {
        // event to handle questionaire submission
        $('#qtnr-submit').on('click', function(event) {
            var el = $(this);
            el.func = el.click;

            //get the form
            var fd = document.getElementById('questionaire-form');
            //collect the user's data from the modal form
            formdata = new FormData(fd);
            formdata.fd = $(fd).serializeArray();
            console.log("User form filled data should be added to \"formdata\" variable");
            console.log(formdata.fd);

            //save to local storage
            hadithi.localStorage('hadithiUser', {
                content: formdata.fd
                // ,local: false
            });

            var af = document.getElementById('recorded-audio');
            //check if an audio recording exists and promp and uploading session
            if (af.src !== "" && /[\w._%+-]+\@[\w.-]+\.[a-zA-Z]{2,}$/.test(formdata.fd[0].value)) {
                // $('#questionaire').modal('hide');
                console.log("tyring to upload it once more.");
                formdata.append('audio_file', af.src, {
                    type: af.type
                });
                formdata.append('audio_length', af.getAttribute('data-audio-length'));
                if (formdata.fd.file) hadithi.uploadAudioFile();
            }

            //Hide modal window
            $('#questionaire').on('show.bs.modal', function(event) {
                // do something...
                console.log("re-fixing the submit function");
                el.on('click', el.func);
            }).modal('hide');
        });
    }
    uploadEvent();

    //Do not submit the form
    $('#questionaire-form').submit(function(event) {
        // console.log($(this).serializeArray())
        console.log("FormData has been plucked -- ", formdata.fd)
    });

    $('#applogout').click(function(event) {
        event.preventDefault();
        hadithi.loginFacebook(false, function() {
            hadithi.localStorage("hadithiUser", false); //remove his/her data from strorage
            console.log("User logged out.")
        })
    })

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
        '<h2 style="text-align: center; color: #999">Just a moment...</h2><br />' +
        '<div class="progress progress-striped active">' +
        '<div class="progress-bar progress-bar-pink" style="width: 100%;"></div>' +
        '</div>' +
        '</div>';

});