import profileSchema from "../../models/profile";
import { User } from "../Structure/User";

export class UserManager {
    constructor () {}

    /**
     * Create a user and save it to the database
     * @param {string} userId 
     * @returns {Promise<User>}
     */
    create(userId) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));

            const isUser = await profileSchema.findOne({ userId });
            if (isUser) return res(null);

            await profileSchema.create({ userId });
            return res(new User(userId));
        });
    }

    /**
     * Delete a user from the database
     * @param {string} userId 
     */
    delete(userId) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));

            const user = await profileSchema.findOne({ userId });
            if (!user) return res(null);

            await profileSchema.findOneAndDelete({ userId });
            return res(true);
        });
    }

    /**
     * Fetch a user from the database. Not providing a user ID will fetch all user's
     * @param {string} userId 
     * @returns {Promise<User>}
     */
    fetch(userId) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));
            const user = await profileSchema.findOne({ userId });
            if (!user) return res(await this.create(userId));

            return res(new User(userId));
        });
    }
}