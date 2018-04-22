const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let schema = new Schema({
    auth0Id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    emailVerified: {type: Boolean, default: false},
    zipCode: {type: String, required: true},
    createdDate: { type: Date, default: Date.now },
    langPref: {type: String, required: true, default: 'en_us'},
    role: {type: String, default: 'customer'},
    billingInfo: {
        billingAddressLine1: {type: String},
        billingAddressLine2: {type: String},
        billingCity: {type: String},
        billingState: {type: String},
        billingZip: {type: String}
    },
    deliverySameAsBilling: {type: Boolean, default: true},
    deliveryInfo: {
        deliveryAddressLine1: {type: String},
        deliveryAddressLine2: {type: String},
        deliveryCity: {type: String},
        deliveryState: {type: String},
        deliveryZip: {type: String}
    },
    friends: [
        {
            friendId: {type: Schema.Types.ObjectId, ref: 'User'},
            username: {type: String}
        }
    ],
    groups: [
        {
            groupId: {type: Schema.Types.ObjectId, ref: 'Group'},
            groupname: {type: String},
        }
    ],
    pendingFriendInvites: [
        {
            friendId: {type: Schema.Types.ObjectId, ref: 'User'},
            friendEmail: {type: String},
            friendUsername: {type: String},
            requestDate: { type: Date, default: Date.now }
        }
    ],
    pendingGroupInvites: [
        {
            groupId: {type: Schema.Types.ObjectId, ref: 'Group'},
            groupname: {type: String},
            invitees: [
                {
                    friendEmail: {type: String},
                    friendUsername: {type: String},
                    requestDate: { type: Date, default: Date.now }
                }
            ]

        }
    ]


});




module.exports = mongoose.model('User', schema, 'users');
