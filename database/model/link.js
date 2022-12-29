const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("../conn")

require('dotenv').config()


const link = sequelize.define("link", {
    link: {
        type:DataTypes.STRING,
        allowNull:false
    },

    code: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

});

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = {sequelize,link}