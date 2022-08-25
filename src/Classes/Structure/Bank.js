import profileSchema from "../../models/profile";
import validateAmount from "../../Utils/ValidateAmount";

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
            const validationData = await validateAmount(options.price);
            if (validationData.invalid) return rej(new TypeError(validationData.error));

            const user = await profileSchema.findOne({ userId: this.userId });

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
            const validationData = await validateAmount(options.price);
            if (validationData.invalid) return rej(new TypeError(validationData.error));

            const user = await profileSchema.findOne({ userId: this.userId });

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
            const validationData = await validateAmount(options.price);
            if (validationData.invalid) return rej(new TypeError(validationData.error));

            const user = await profileSchema.findOne({ userId: this.userId });

            user.bank = amount;
            user.lastUpdated = new Date();

            await user.save();
            return res(user);
        });
    }
}
