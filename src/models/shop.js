import { model, Schema } from "mongoose";

export default model("eco-client-shop", new Schema({
    name: String,
    price: Number,
    data: { type: Object, default: {} }
}));
