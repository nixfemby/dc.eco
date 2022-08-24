import { model, Schema } from "mongoose";

export default model('eco-client-shop', new Schema({
    id: { type: Number, default: 1 },
    items: { type: Array, default: [] },
    lastUpdated: { type: Date, default: new Date() },
}));
