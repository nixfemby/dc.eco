import shopSchema from "../../models/shop";

export class ShopManager {
    constructor () {}

    /**
     * Add an item to the global shop
     * @param {string} name 
     * @param {number} price
     * @param {object} data
     */
    addItem(name, price, data) {
        return new Promise(async (res, rej) => {
            if(!name) return rej(new TypeError("An item name was not provided"));
            if(!price || isNaN(parseInt(price)) || price <= 0 ) return rej(new TypeError("Item price is invalid"));

            const shop = await shopSchema.findOne({ id: 1 });
            if (!shop) {
                const newShop = await shopSchema.create({ id: 1, items: [{ name, price, data }] });
                return res(newShop);
            }

            shop.items.push({ name, price, data });
            shop.lastUpdated = new Date();

            await shop.save();
            return res(shop);
        });
    }

    /**
     * Remove an item from the global shop
     * @param {string} name
     */
    removeItem(name) {
        return new Promise(async (res, rej) => {
            if(!name) return rej(new TypeError("An item name was not provided"));

            const isShopItem = await shopSchema.findOne({ id: 1, items: { $elemMatch: { name } } });
            if(!isShopItem) return res(null);

            const filteredItems = isShopItem.shopItems.filter((item) => item.name !== name);

            isShopItem.items = filteredItems;

            await isShopItem.save();
            return res(isShopItem);
        });
    }

    /**
     * Fetch the shop items
     */
    fetch() {
        return new Promise(async (res, rej) => {
            const shop = await shopSchema.findOne({ id: 1 });
            if(!shop) return res(null);

            return res(shop.items);
        });
    }

    /**
     * Fetch an item from the shop
     * @param {string} name 
     */
    fetchItem(name) {
        return new Promise(async (res, rej) => {
            if(!name) return rej(new TypeError("An item name was not provided"));

            const shop = await shopSchema.findOne({ id: 1, items: { $elemMatch: { name } } });
            if(!shop) return res(null);

            return res(shop.items.find(item => item.name === name));
        });
    }

    /**
     * Clear the shop
     */
    clear() {
        return new Promise(async (res, rej) => {
            const shop = await shopSchema.findOne({ id: 1 });
            if(!shop) return res(null);

            shop.items = [];
            shop.lastUpdated = new Date();

            await shop.save();
            return res(shop);
        });
    }
}
