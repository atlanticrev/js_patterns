// Simple singleton
// const singleton = {
//     property1: "something",
//     property2: "something else",
//     method1: function () {
//         console.log("hello world");
//     }
// };

// Private members with closure
// const Singleton = (function () {
//     // Private property
//     let instantiated;
//
//     // Private method (returns singleton object)
//     function init () {
//         const privateVariable = 'something private';
//
//         function showPrivate() {
//             console.log(privateVariable);
//         }
//
//         // Instance interface
//         return {
//             publicMethod: function () {
//                 showPrivate();
//             },
//             publicVariable: "something public"
//         };
//     }
//
//     // Singleton's interface
//     return {
//         // Public method
//         getInstance: function () {
//             if (!instantiated) {
//                 instantiated = init();
//             }
//             return instantiated;
//         }
//     };
//
// })();
//
// const single = Singleton.getInstance();
// console.log(single.publicVariable);

// Singleton example
const SingletonTester = (function () {

    /**
     * @param {Object} options
     * @constructor
     */
    function Singleton (options) {
        options = options || {};
        this.name = "SingletonTester";
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    let instance;

    // Interface
    return {
        name: "SingletonTester",
        getInstance: function (options) {
            if (!instance) {
                instance = new Singleton(options);
            }
            return instance;
        },
    };

})();

const singletonTest = SingletonTester.getInstance({pointX: 20});
console.log(singletonTest);