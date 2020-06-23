const Pubsub = {};

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
}(Pubsub));

/**
 * Usage
 */
const testHandler = function (topics, data) {
    console.log(topics + ": " + data);
};

const testSubscription = Pubsub.subscribe('example1', testHandler);

Pubsub.publish('example1', 'hello world!');
Pubsub.publish('example1', ['test', 'a', 'b', 'c']);
Pubsub.publish('example1', [{'color': 'blue'}, {'text': 'hello'}]);

Pubsub.unsubscribe(testSubscription);

Pubsub.publish('example1', 'hello again! (this will fail)');

/**
 * Examples
 */
const grid = {
    addEntry: function (data) {
        if (data !== 'undefined') {
            console.log(`Entry: ${data.title} Changenet / % ${data.changenet} / ${data.percentage}% added`);
        }
    },
    updateCounter: function (timestamp) {
        console.log('grid last updated at: ' + timestamp);
    }
};

// Mediator
const gridUpdate = function(topics, data){
    grid.addEntry(data);
    grid.updateCounter(data.timestamp);
}

const dataSubscription = Pubsub.subscribe( 'dataUpdated', gridUpdate );

Pubsub.publish('dataUpdated', {
    title: "Microsoft shares",
    changenet: 4,
    percentage: 33,
    timestamp: '17:34:12'
});

Pubsub.publish('dataUpdated', {
    title: "Dell shares",
    changenet: 10,
    percentage: 20,
    timestamp: '17:35:16'
});

Pubsub.unsubscribe(dataSubscription);

// function getCurrentTime () {
//     const date = new Date(),
//         m = date.getMonth() + 1,
//         d = date.getDate(),
//         y = date.getFullYear(),
//         t = date.toLocaleTimeString().toLowerCase();
//     return (m + '/' + d + '/' + y + ' ' + t);
// }