const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let schema = new Schema({
    userId: {type: String, required: true},
    groupId: {type: String, required: true},
    inventoryId: [
        {type: Schema.Types.ObjectId, ref: 'inventories'}
    ],
    listName: {type: String, required: true},
    groupName: {type: String, required: true},
    summary: {
        totalItems: {type: Number},
        totalCost: {type: Number},
        itemsFromSuggested: {type: Number},
        itemsFromRecipes: {type: Number},
        itemsFromUsers: {type: Number},
        estimatedSavings: {type: Number},
    },
    totalPrice: {type: Number},
    quantity: {type: Number},
    listCanBeDeleted: {type: Boolean, default: false, required: true},
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    archived: {type: Boolean, default: false, required: true},
    active: {type: Boolean, default: true, required: true},
    listItems: [{
        itemId: {type: Schema.Types.ObjectId, ref: 'products'},
        item_name: {type: String, required: true},
        net_wt: {type: String},
        wt_uom: {type: String},
        dept: {type: String, required: true},
        deptDisplayName: {type: String},
        categories: [
            {
                catId: {type: Schema.Types.ObjectId, ref: 'categories'},
                displayName: {type: String, required: true},
                systemCategory: {type: Boolean, default: true, required: true}
            }
        ],
        price_avg: {type: Number},
        price_msrp: {type: Number},
        price_current: {type: Number},
        quantity: {type: Number, required: true},
        recurring: {type: Boolean, default: false, required: true},
        useBulk: {type: Boolean, default: true, required: true},
        upc:{type: String, required: true},
        ean:{type: String},
        image:{type: String},
        currentlySuggested: {type: Boolean, default: false, required: true},
    }]
},
{
    timestamps: {
        createdAt: 'created_at'
    }
});

schema.save();

module.exports = mongoose.model('GroceryList', schema, 'groceryLists');
