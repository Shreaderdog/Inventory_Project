const Product = require("../models/product.js");

exports.getItems = function(req, res) {
    Product.find()
        .then((allItems) => {
            console.log(req.params.storeid)
            if(req.params.storeid == "all") {
                console.log(allItems)
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
                return res.json({message: "product with product number already exists"});
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
    const inputProd = req.body;

    Product.findOne({ prodNumber: inputProd.prodNumber })
        .then((prod) => {
            if(!prod) {
                return res.json({message: "product with that product number does not exist"});
            } else {
                if (inputProd.prodName) {
                    prod.prodName = inputProd.prodName;
                }
                if (inputProd.prodPrice) {
                    prod.prodPrice = inputProd.prodPrice;
                }
                if (inputProd.unitAmount) {
                    prod.unitAmount = inputProd.unitAmount;
                }
                if (inputProd.stocks) {
                    let stockarray = inputProd.stocks.replace(/[^0-9\.]+/g, ""); //remove anything that isnt number
                    let i = 0;
                    for (const key of prod.stock.keys()) {
                        adjustment = Number(stockarray[i]);
                        if (adjustment != 0) {
                            prod.stock.set(key, adjustment);
                        }
                        i++;
                    }
                }
                prod.save();
            }
            return res.json({message: "Successfully edited item"});
        })
}

exports.removeItem = function(req, res) {
    const inputProd = req.body;
    if (inputProd.prodNumber) {
        Product.deleteOne({ prodNumber: inputProd.prodNumber })
            .then((result, err) =>{
                if (result) {
                    res.send(result);
                } else {
                    res.send(err);
                }
            })
    } else {
        return res.json({message: "Product with that product number not found"});
    }
}