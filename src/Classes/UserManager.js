const profileSchema = require("../models/profile");

class UserManager {
    constructor () {}

    /**
     * Create a user and save it to the database
     * @param {string} userId 
     */
    create(userId) {
        return new Promise(async (res, rej) => {
            if (!userId) return rej(new TypeError("A user ID was not provided"));

            const isUser = await profileSchema.findOne({ userId });
            if (isUser) return res(null);

            const user = await profileSchema.create({ userId });
            return res(user);
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
     */
    fetch(userId) {
        return new Promise(async (res, rej) => {
            if (userId) {
                const user = await profileSchema.findOne({ userId });
                if (!user) return res(await this.create(userId));

                return res(user);
            } else {
                const users = await profileSchema.find();
                return res(users);
            }
        });
    }
}

module.exports = { UserManager };