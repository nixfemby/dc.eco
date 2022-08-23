import profileSchema from "../models/profile";

export class BankManager {
    constructor () {}

    /**
     * Add a certain amount of currency to a user's bank account
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
                const newUser = await profileSchema.create({ userId, bank: amount });
                return res(newUser);
            }

            user.bank += amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Subtract a certain amount of currency from a user's bank account
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
                const newUser = await profileSchema.create({ userId, bank: 1 });
                return res(newUser);
            };

            user.bank -= amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Set the balance of a user's bank account
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
                const newUser = await profileSchema.create({ userId, bank: amount });
                return res(newUser);
            };

            user.bank = amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }
}