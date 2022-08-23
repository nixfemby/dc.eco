import profileSchema from "../models/profile";

export class InventoryManager {
    constructor () {}

    /**
     * Add an item to a user's inventory
     * @param {string} userId 
     * @param {object} item
     */
    addItem(userId, item) {
        return new Promise(async (res, rej) => {
            if(!userId) return rej(new TypeError("A user ID was not provided"));
            if(!item) return rej(new TypeError("An item was not provided"));
            if(!item.name) return rej(new TypeError("The item does not have a name"));

            const user = await profileSchema.findOne({ userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId, inventory: [item] });
                return res(newUser);
            }

            user.inventory.push(item);
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Remove an item from a user's inventory
     * @param {string} userId
     * @param {object} item
     */
    removeItem(userId, item) {
        return new Promise(async (res, rej) => {
            if(!userId) return rej(new TypeError("A user ID was not provided"));
            if(!item) return rej(new TypeError("An item was not provided"));
            if(!item.name) return rej(new TypeError("The item does not have a name")); 

            const user = await profileSchema.findOne({ userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId });
                return res(newUser);
            }

            const itemIndex = user.inventory.findIndex((i) => i.name === item.name);
            if(itemIndex === -1) return res(null);

            user.inventory.splice(itemIndex, 1);
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Fetch the inventory of a user
     * @param {string} userId 
     */
    fetch(userId) {
        return new Promise(async (res, rej) => {
            if(!userId) return rej(new TypeError("A user ID was not provided"));

            const user = await profileSchema.findOne({ userId });
            if(!user) {
                const newUser = await profileSchema.create({ userId });
                return res(newUser);
            };

            return res(user);
        });
    }

    /**
     * Fetch an item from a user's inventory
     * @param {string} userId 
     * @param {object} item 
     */
    fetchItem(userId, item) {
        return new Promise(async (res, rej) => {
            if(!userId) return rej(new TypeError("A user ID was not provided"));
            if(!item) return rej(new TypeError("An item was not provided"));
            if(!item.name) return rej(new TypeError("The item does not have a name")); 

            const user = await profileSchema.findOne({ userId });
            if(!user) {
                await profileSchema.create({ userId });
                return res(null);
            };

            const itemIndex = user.inventory.findIndex((i) => i.name === item.name);
            if(itemIndex === -1) return res(null);
            
            return res(user.inventory[itemIndex]);
        });
    }

    /**
     * Clear the inventory of a user
     * @param {string} userId 
     */
    clear(userId) {
        return new Promise(async (res, rej) => {
            if(!userId) return rej(new TypeError("A user ID was not provided"));

            const user = await profileSchema.findOne({ userId });
            if(!user) {
                const newUser = await profileSchema.create({ userId });
                return res(newUser);
            };

            user.inventory = [];
            
            await user.save();
            return res(user);
        });
    }
}