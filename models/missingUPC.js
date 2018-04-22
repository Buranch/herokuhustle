const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({

        item_ids: [ // this is ids from other sources besides us
            {
                source: {type: String},
                id: {type: String}
            }
        ],
        item_name: {type: String, required: true},
        walmartCategoryPath: {type: String},
        brand_name: {type: String},
        image_thumbnail: {type: String},
        image_large: {type: String},
        dateAdded: { type: Date, default: Date.now },
        updateHistory: [
            { type: Date, default: Date.now }
        ],
        addedBy: {type: String},
        updateBy: [
            {type: String}
        ],
    },
    {
        timestamps: {
            createdAt: 'created_at'
        }
    });

// schema.save();

module.exports = mongoose.model('MissingUPC', schema, 'missingUPC');



