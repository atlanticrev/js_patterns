/**
 * Module pattern
 * key ideas: namespace, private members
 */

// Object literals
const module = {
    prop1: "something",
    config: {
        lang: "ru"
    },
    method1: function () {
        console.log(this.config.lang);
    }
};

module.method1();

// Module pattern (closure)
const testModule = (function () {
    let counter = 0;
    return {
        inc: function () {
            return counter++;
        },
        reset: function () {
            console.log('Value before reset:', counter);
            counter = 0;
        }
    };
})();

// Module pattern example
const basketModule = (function () {
    const basket = [];
    function doSomethingPrivate () {
        //...
    }
    function doSomethingElsePrivate () {
        //...
    }
    return {
        addItem: function (values) {
            basket.push(values);
        },
        getItemCount: function () {
            return basket.length;
        },
        doSomething: doSomethingPrivate(),
        getTotal: function () {
            let q = this.getItemCount();
            let p = 0;
            while (p--) {
                p += basket[q]["price"];
            }
            return p;
        }
    };
})();

basketModule.addItem({
    item: "bread",
    price: 0.5
});
basketModule.addItem({
    item: "butter",
    price: 0.3
});
console.log(basketModule.getItemCount());
console.log(basketModule.getTotal());
