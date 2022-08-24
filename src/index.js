import { UserManager } from "./Classes/Managers/UserManager";
import { ShopManager } from "./Classes/Managers/ShopManager";

export default class EconomyClient {
    /**
     * Initialize the discord economy client
     * @param {string} dbURI
     */
    constructor (dbURI) {
        if (process.version.slice(1, 3) - 0 < 16) throw new TypeError("NodeJS version 16 or higher is required for this package to work. Go to https://nodejs.org/ to update your NodeJS version");
        if (!dbURI) throw new TypeError("A MongoDB URL was not provided");
        
        setTimeout(async () => await mongoose.connect(dbURI), 1000);

        this.users = new UserManager();
        this.shop = new ShopManager();
    }
}