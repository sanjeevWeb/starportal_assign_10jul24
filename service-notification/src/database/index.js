const mongoose = require('mongoose');


async function connectDB(DATABASE_URI) {
    try {
        const DB_OPTIONS = {
            dbName: "starportaldb"
        }
        await mongoose.connect(DATABASE_URI, DB_OPTIONS)
        console.log('connected to database succesfully');
    }
    catch (error) {
        console.log('error', error);
        await mongoose.disconnect();
    }
}

module.exports = connectDB