import profileSchema from "../../models/profile";

export class Inventory {
    /**
     * Represents a user's inventory
     * @param {string} userId 
     */
    constructor (userId) {
        this.userId = userId;
    }

    /**
     * Add an item to the user's inventory
     * @param {object} item
     */
    addItem(item) {
        return new Promise(async (res, rej) => {
            if(!item) return rej(new TypeError("An item was not provided"));
            if(!item.name) return rej(new TypeError("The item does not have a name"));

            const user = await profileSchema.findOne({ userId: this.userId });

            user.inventory.push(item);
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Remove an item from the user's inventory
     * @param {object} item
     */
    removeItem(item) {
        return new Promise(async (res, rej) => {
            if(!item) return rej(new TypeError("An item was not provided"));
            if(!item.name) return rej(new TypeError("The item does not have a name")); 

            const user = await profileSchema.findOne({ userId: this.userId });

            const itemIndex = user.inventory.findIndex((i) => i.name === item.name);
            if(itemIndex === -1) return res(null);

            user.inventory.splice(itemIndex, 1);
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Fetch the inventory of the user
     */
    fetch() {
        return new Promise(async (res, rej) => {
            const user = await profileSchema.findOne({ userId: this.userId })
            return res(user);
        });
    }

    /**
     * Fetch an item from the user's inventory
     * @param {object} item 
     */
    fetchItem(item) {
        return new Promise(async (res, rej) => {
            if(!item) return rej(new TypeError("An item was not provided"));
            if(!item.name) return rej(new TypeError("The item does not have a name")); 

            const user = await profileSchema.findOne({ userId: this.userId });

            const itemIndex = user.inventory.findIndex((i) => i.name === item.name);
            if(itemIndex === -1) return res(null);
            
            return res(user.inventory[itemIndex]);
        });
    }

    /**
     * Clear the inventory of the user
     */
    clear() {
        return new Promise(async (res, rej) => {
            const user = await profileSchema.findOne({ userId: this.userId });

            user.inventory = [];
            
            await user.save();
            return res(user);
        });
    }
}