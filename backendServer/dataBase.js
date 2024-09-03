const mongoose = require('mongoose')
require('dotenv').config();

const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,
            console.log('Server Connected')
        )
    } catch (error) {
        console.log(error)
    }

}

module.exports = ConnectDB