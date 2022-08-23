import { BankManager } from "./Classes/BankManager";
import { UserManager } from "./Classes/UserManager";
import { WalletManager } from "./Classes/WalletManager";

export default class EconomyClient {
    /**
     * Initialize the discord economy client
     * @param {string} dbURI
     */
    constructor (dbURI) {
        if (process.version.slice(1, 3) - 0 < 16) throw new TypeError("NodeJS version 16 or higher is required for this package to work. Go to https://nodejs.org/ to update your NodeJS version");
        if (!dbURI) throw new TypeError("A MongoDB URL was not provided");
        await mongoose.connect(dbURI);

        this.users = new UserManager();
        this.bank = new BankManager();
        this.wallet = new WalletManager();
    }
}