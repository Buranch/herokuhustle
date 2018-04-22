const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let schema = new Schema({

    categoryName: {type: String, required: true},
    categoryId: {type: String, required: true, unique:true},
    productDataRetrieved: {type: Boolean, required: true, default: false},
    productDataRetrievedDate: {type: Date},
    productsInserted: {type: Boolean,  required: true, default: false},
    numPages: {type: String, required: true, default: 0},
    numItems: {type: String, required: true, default: 0},
    hasError:  {type: Boolean,  required: true, default: false}
},
{
    timestamps: {
        createdAt: 'created_at'
    }
});
var WalmartCategoriesRequested =  module.exports = mongoose.model('WalmartCategoriesRequested', schema, 'walmartCategoriesRequested');

// schema.save();

module.exports.insert = (doc, callback) =>{
    console.log('onWalmert ');
    console.log(doc);
    var newd = WalmartCategoriesRequested(doc);
    newd.save(callback);
}

