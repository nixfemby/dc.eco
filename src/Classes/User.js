import profileSchema from "../models/profile";
// import { Bank } from "./Bank";
// import { Inventory } from "./Inventory";
// import { Wallet } from "./Wallet";

export class User {
    constructor (userId) {
      this.userId = userId;
      
      // this.bank = new Bank(userId);
      // this.inventory = new Inventory(userId);
      // this.wallet = new Wallet(userId);
    }
}
