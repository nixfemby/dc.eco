const profileSchema = require("../models/profile");

class WalletManager {
    constructor () {}

    /**
     * Add a certain amount of currency to a user's wallet
     * @param {string} userId 
     * @param {number} amount
     */
    addBalance(userId, amount) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId, wallet: amount });
                return res(newUser);
            }

            user.wallet += amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Subtract a certain amount of currency from a user's wallet
     * @param {string} userId 
     * @param {number} amount 
     */
    subtractBalance(userId, amount) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId, wallet: 1 });
                return res(newUser);
            };

            user.wallet -= amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Set the balance of a user's wallet
     * @param {string} userId
     * @param {number} amount
     */
    setBalance(userId, amount) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId, wallet: amount });
                return res(newUser);
            };

            user.wallet = amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }
}

module.exports = { WalletManager };