const mongoose = require('mongoose');
const logger = require('consola');
let mongoURL;

if (process.version.slice(1, 3) - 0 < 16) {
    throw new Error(
        `NodeJS Version 16 or newer is required, but you are using ${process.version}. See https://nodejs.org to update or use your distros package manager.`,
    );
}

class DcEco {
    constructor(URL) {

        if(!URL) throw new TypeError("Database URL is required!");

        mongoURL = URL;
        mongoose.connect(URL, { useNewUrlParser: true }).catch(e => logger.error(e));
    }


}

module.exports = DcEco;