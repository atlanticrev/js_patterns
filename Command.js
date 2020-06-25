const CarManager = {
    requestInfo: function (model, id) {
        return `The information for ${model} with ID ${id} is foobar`;
    },

    buyVehicle: function (model, id) {
        return `You have successfully purchased Item ${id}, a ${model}`;
    },

    arrangeViewing: function (model, id) {
        return `You have successfully booked a viewing of ${model} (${id})`;
    }
};

CarManager.execute = function (name, ...args) {
    return CarManager[name] && CarManager[name].apply(CarManager, args);
};

CarManager.execute("buyVehicle", "Ford Escort", "453543");
CarManager.execute("arrangeViewing", "Ferrari", "14523");
CarManager.execute("requestInfo", "Ford Mondeo", "54323");
CarManager.execute("requestInfo", "Ford Escort", "34232");
CarManager.execute("buyVehicle", "Ford Escort", "34232");