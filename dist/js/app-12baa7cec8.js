"use strict";function Flexible(e,n){n=n||100;var t=window.document.createElement("div");t.style.width="1rem",t.style.display="none";var i=window.document.getElementsByTagName("head")[0];i.appendChild(t);var l=parseFloat(window.getComputedStyle(t,null).getPropertyValue("width"));t.remove(),document.documentElement.style.fontSize=window.innerWidth/e*n/l*100+"%";var o=document.createElement("style"),a="@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+window.innerWidth/(e/n)/l*100+"%;}}",d="@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+window.innerHeight/(e/n)/l*100+"%;}}";return o.innerHTML=a+d,i.appendChild(o),l}var flexible$1=Flexible,utils={$:function(e,n){n&&n.querySelectorAll||(n=document.body);var t=n.querySelectorAll(e);return t.length>1?t:1==t.length?t[0]:void 0}},classCallCheck=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},$=utils.$,App=function e(){classCallCheck(this,e),$("#app").innerHTML="hahah"};!function(){flexible$1(1080),window.app=new App}();