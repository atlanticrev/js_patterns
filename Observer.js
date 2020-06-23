const pubsub = {};

(function (q) {
    const topics = {};
    let subUid = -1;

    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }
        const subscribers = topics[topic];
        let length = subscribers ? subscribers.length : 0;
        while (length--) {
            subscribers[length].func(topic, args);
        }
        return this;
    };

    q.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        const token = (++subUid).toString();
        topics[topic].push({
            token,
            func
        });
        return token;
    };

    q.unsubscribe = function (token) {
        for (let t in topics) {
            if (topics[t]) {
                for (let i = 0; i < topics[t].length; i++) { // all entries in topic
                    if (topics[t][i].token === token) {
                        topics[t].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(pubsub));