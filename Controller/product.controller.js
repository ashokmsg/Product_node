const { getDbConnection } = require("../Utils/dbConnections");
const { handleError ,logWriter} = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const keys = require("../Config/keys");
const { generateToken } = require("../Services/passport.service");

//external imports
const fetch = require("node-fetch");



exports.addProduct = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`add product-i-started`);
        res.send("hai");
        //code for add product
        logWriter(`add product-i-finished`);
    } catch (error) {
        logWriter(`add product-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.updateProduct = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`update product-i-started`);
       //code for update product ---om
        logWriter(`update product-i-finished`);
    } catch (error) {
        logWriter(`update product-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.deleteProduct = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`delete product-i-started`);
        //code for delete product --sanjay
        logWriter(`delete product-i-finished`);
    } catch (error) {
        logWriter(`delete product-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}
