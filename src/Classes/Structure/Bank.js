import profileSchema from "../../models/profile";

export class Bank {
    /**
     * Represents a user's bank account
     * @param {string} userId 
     */
    constructor (userId) {
        this.userId = userId;
    }

    /**
     * Add a certain amount of currency to the user's bank account
     * @param {number} amount
     */
    addBalance(amount) {
        return new Promise(async (res, rej) => {
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId: this.userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId: this.userId, bank: amount });
                return res(newUser);
            }

            user.bank += amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Subtract a certain amount of currency from the user's bank account
     * @param {number} amount 
     */
    subtractBalance(amount) {
        return new Promise(async (res, rej) => {
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId: this.userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId: this.userId, bank: 1 });
                return res(newUser);
            };

            user.bank -= amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }

    /**
     * Set the balance of the user's bank account
     * @param {number} amount
     */
    setBalance(amount) {
        return new Promise(async (res, rej) => {
            if (!amount) return rej(new TypeError("An amount was not provided"));
            if (typeof amount !== "number") return rej(new TypeError("The amount provided is not a number"));
            if (amount < 1) return rej(new TypeError("The amount must be greater than 0"));

            const user = await profileSchema.findOne({ userId: this.userId });
            if (!user) {
                const newUser = await profileSchema.create({ userId: this.userId, bank: amount });
                return res(newUser);
            };

            user.bank = amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }
}