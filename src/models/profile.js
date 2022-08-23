import { model, Schema } from "mongoose";

export default model('eco-client-profiles', new Schema({
    userId: { type: String },
    inventory: { type: Array, default: [] },
    wallet: { type: Number, default: 1 },
    bank: { type: Number, default: 1 },
    lastUpdated: { type: Date, default: new Date() },
}));