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
        
        this.bank = new Bank(userId);
        this.inventory = new Inventory(userId);
        this.wallet = new Wallet(userId);
    }
}
