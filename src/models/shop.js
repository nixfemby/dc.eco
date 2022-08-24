import { model, Schema } from "mongoose";

export default model('eco-client-shop', new Schema({
    name: String,
    items: { type: Array, default: [] },
    lastUpdated: { type: Date, default: new Date() },
}));
