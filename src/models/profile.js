const { model, Schema } = require('mongoose');

module.exports = model('eco-client-profiles', new Schema({
    userId: { type: String },
    wallet: { type: Number, default: 1 },
    bank: { type: Number, default: 1 },
    lastUpdated: { type: Date, default: new Date() },
}));