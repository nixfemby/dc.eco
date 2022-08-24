import profileSchema from "../../models/profile";

export class Wallet {
    /**
     * Represents a user's wallet
     * @param {string} userId 
     */
    constructor (userId) {
        this.userId = userId;
    }

    /**
     * Add a certain amount of currency to the user's wallet
     * @param {number} amount
     */
    addBalance(amount) {
        return new Promise(async (res, rej) => {
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId: this.userId });

            user.wallet += amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Subtract a certain amount of currency from the user's wallet
     * @param {number} amount 
     */
    subtractBalance(amount) {
        return new Promise(async (res, rej) => {
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId: this.userId });

            user.wallet -= amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Set the balance of the user's wallet
     * @param {number} amount
     */
    setBalance(amount) {
        return new Promise(async (res, rej) => {
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId: this.userId });

            user.wallet = amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }
}