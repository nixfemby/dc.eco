import { model, Schema } from "mongoose";

export default model('eco-client-shop', new Schema({
    id: String,
    items: { type: Array, default: [] },
    lastUpdated: { type: Date, default: new Date() },
}));
