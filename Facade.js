const addMyEvent = function (el, ev, func) {
    if (el.addEventListener) {
        el.addEventListener( ev,fn, false );
    } else if (el.attachEvent) {
        el.attachEvent(`on${ev}` , func)
    } else {
        el[`on${ev}`] = func;
    }
}

const bindReady = function() {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        window.addEventListener("load", jQuery.ready, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", DOMContentLoaded);
        window.attachEvent("onload", jQuery.ready);
    }
}

const module = (function() {
    const _private = {
        i: 5,
        get : function() {
            console.log('current value:' + this.i);
        },
        set : function(val) {
            this.i = val;
        },
        run : function() {
            console.log( 'running' );
        },
        jump: function(){
            console.log( 'jumping' );
        }
    };

    return {
        facade : function(args) {
            _private.set(args["val"]);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    }
}());

// Consume a feature without needing to worry about implementation-level details
module.facade({run: true, val: 10});