const Product = require("../models/product.js");

exports.getItems = function(req, res) {
    Product.find()
        .then((allItems) => {
            if(req.params.storeid == "all") {
                return res.json(allItems);
            } else {
                let allParsedItems = [];
                for(let i = 0; i < allItems.length; i++) {
                    let parsedItem = {
                        prodNumber: allItems[i].prodNumber,
                        prodName: allItems[i].prodName,
                        prodPrice: allItems[i].prodPrice,
                        unitAmount: allItems[i].unitAmount,
                        stock: allItems[i].stock.get(req.params.storeid)
                    };
                    allParsedItems.push(parsedItem);
                }
                return res.json(allParsedItems);
            }
        })
}

exports.addItem = function(req, res) {
    const productToAdd = req.body;
    
    if(!productToAdd.prodNumber || !productToAdd.prodName || !productToAdd.prodPrice || !productToAdd.unitAmount) {
        return res.json({message: "Please enter all fields"});
    }

    Product.findOne({ prodNumber: productToAdd.prodNumber})
        .then((prod) => {
            if(prod) {
                return res.json("message: product with product number already exists");
            } else {
                const newProd = new Product({
                    prodNumber: productToAdd.prodNumber,
                    prodName: productToAdd.prodName,
                    prodPrice: productToAdd.prodPrice,
                    unitAmount: productToAdd.unitAmount,
                    stock: {
                        1: 0,
                        2: 0,
                        3: 0
                    }
                });
                newProd.save(function(err) {
                    if(err) return console.log(err);
                })
                return res.json({message: "Success"});
            }
        })
}

exports.editItem = function(req, res) {
    res.send("NOT IMPLEMENTED YET");
}

exports.removeItem = function(req, res) {
    res.send("NOT IMPLEMENTED YET");
}