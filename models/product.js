const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({

    upc: {type: String, required: true},
    ean: {type: String},
    item_ids: [ // this is ids from other sources besides us
        {
            source: {type: String},
            id: {type: String}
        }
    ],
    item_name: {type: String, required: true},
    item_description_short: {type: String, default:''},
    item_description_long: {type: String, default:''},
    price: {type: Number},
    price_msrp: {type: Number},
    price_avg: {type: Number},
    price_history: [
        {type: Number}
    ],
    imp_size: {type: String},
    imp_uom: {type: String},
    metric_size: {type: String},
    metric_uom: {type: String},
    system_dept: {type: String},
    system_categories: [
        {
            catId: {type: Schema.Types.ObjectId, ref: 'categories'},
            displayName: {type: String},
            systemCategory: Boolean
        }
    ],
    walmartCategoryPath: {type: String},
    brand_id: {type: String},
    brand_name: {type: String},
    image_thumbnail: {type: String},
    image_large: {type: String},
    aisle: {type: String},
    dateAdded: { type: Date, default: Date.now },
    updateHistory: [
        { type: Date, default: Date.now }
    ],
    addedBy: {type: String},
    updateBy: [
        {type: String}
    ],
    nf_ingredient_statement: {type: String},
    nf_calories: {type: String},
    nf_calories_from_fat: {type: String},
    nf_total_fat: {type: String},
    nf_saturated_fat: {type: String},
    nf_trans_fatty_acid: {type: String},
    nf_polyunsaturated_fat: {type: String},
    nf_monounsaturated_fat: {type: String},
    nf_cholesterol: {type: String},
    nf_sodium: {type: String},
    nf_total_carbohydrate: {type: String},
    nf_dietary_fiber: {type: String},
    nf_sugars: {type: String},
    nf_protein: {type: String},
    nf_vitamin_a_dv: {type: String},
    nf_vitamin_c_dv: {type: String},
    nf_calcium_dv: {type: String},
    nf_iron_dv: {type: String},
    nf_potassium: {type: String},
    nf_servings_per_container: {type: String},
    nf_serving_size_qty: {type: String},
    nf_serving_size_unit: {type: String},
    nf_serving_weight_grams: {type: String}

},
{
    timestamps: {
        createdAt: 'created_at'
    }
});

// schema.save();

module.exports = mongoose.model('Product', schema, 'products');



