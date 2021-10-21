const Product = require("../models/product.js");

exports.getItems = function(req, res) {
    Product.find({})
        .then((allItems) => {
            if(req.params.storeid == "all") {
                return res.json(allItems);
            } else {
                let allParsedItems = {};
                for(item in allItems) {
                    let parsedItem = {
                        prodNumber: item.prodNumber,
                        prodName: item.prodName,
                        prodPrice: item.prodPrice,
                        unitAmount: item.unitAmount,
                        stock: item.stock.store[req.params.storeid].storeStock
                    };
                    allParsedItems.push(parsedItem);
                }
                return res.json(allParsedItems);
            }
        })
}

exports.addItem = function(req, res) {
    res.send("NOT IMPLEMENTED YET");
}

exports.editItem = function(req, res) {
    res.send("NOT IMPLEMENTED YET");
}

exports.removeItem = function(req, res) {
    res.send("NOT IMPLEMENTED YET");
}