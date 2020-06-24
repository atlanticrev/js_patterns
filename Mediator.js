const mediator = (function () {
    const channels = {}; // Events

    const subscribe = function (channel, func) {
        if (!channels[channel]) {
            channels[channel] = [];
        }
        channels[channel].push({
            context: this,
            callback: func
        });
        return this;
    };

    const publish = function (channel, ...args) {
        if (!channels[channel]) {
            return false;
        }
        for (let i = 0; i < channels[channel].length; i++) {
            const subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        publish,
        subscribe,
        installTo: function (obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
}());

/**
 * Usage
 */

(function(m){
    let person = "Luke";

    m.subscribe('nameChange', function(arg) {
        console.log(person); // Luke
        person = arg;
        console.log(person); // David
    });

    m.publish( 'nameChange', 'David' );
}(mediator));