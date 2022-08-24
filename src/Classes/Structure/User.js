import profileSchema from "../../models/profile";
import { Bank } from "./Bank";
import { Inventory } from "./Inventory";
import { Wallet } from "./Wallet";

export class User {
    /**
     * Create a new user instance
     * @param {string} userId 
     */
    constructor (userId) {
        if (!userId) throw new TypeError("A user ID was not provided");
        
        this.userId = userId;
        this.bank = new Bank(userId);
        this.inventory = new Inventory(userId);
        this.wallet = new Wallet(userId);
    }

    /**
     * Delete the user from the database
     */
    delete() {
        return new Promise(async (res, rej) => {
            const user = await profileSchema.findOne({ userId: this.userId });
            if (!user) return res(null);

            await profileSchema.findOneAndDelete({ userId: this.userId });
            return res(true);
        });
    }
}
