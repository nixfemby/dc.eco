import shopSchema from "../../models/shop";

export class ShopManager {
    constructor () {}

    /**
     * Create an item for the shop
     * @param {import("../../Interfaces/ShopManager").CreateItemOptions} options 
     */
    createItem(options) {
        return new Promise(async (res, rej) => {
            if (!options.name) return rej(new TypeError("An item name was not provided"));
            if (!options.price || isNaN(parseInt(options.price)) || options.price <= 0 ) return rej(new TypeError("Item price is invalid"));

            const item = await shopSchema.findOne({ name: options.name });
            if (item) return res(null);

            const newItem = await shopSchema.create({ name: options.name, price: options.price, data: options?.data });
            return res(newItem);
        });
    }

    /**
     * Delete an item from the shop
     * @param {string} name 
     */
    deleteItem(name) {
        return new Promise(async (res, rej) => {
            if (!name) return rej(new TypeError("An item name was not provided"));

            const item = await shopSchema.findOne({ name });
            if (!item) return res(null);

            await shopSchema.deleteOne({ name });
            return res(true);
        });
    }

    /**
     * Fetch all items of the shop
     */
    fetch() {
        return new Promise(async (res) => {
            const itemsArray = await shopSchema.find();
            return res(itemsArray);
        });
    }

    /**
     * Fetch an item from the shop
     * @param {string} name 
     */
    fetchItem(name) {
        return new Promise(async (res, rej) => {
            if(!name) return rej(new TypeError("An item name was not provided"));

            const item = await shopSchema.findOne({ name });
            if(!item) return res(null);

            return res(item);
        });
    }

    /**
     * Clear all the items in the shop
     */
    clear() {
        return new Promise(async (res, rej) => {
            await shopSchema.deleteMany();
            return res(true);
        });
    }
}
