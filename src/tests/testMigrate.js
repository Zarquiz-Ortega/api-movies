require('../models')
const sequelize = require('../utils/connection');

const testMigrate = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("DB reset 🤗👌🏻");
    } catch (error) {
        console.log(error)
    }
}

testMigrate();
