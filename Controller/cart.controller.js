const { getDbConnection, getElasticConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const keys = require("../Config/keys");
const { generateToken } = require("../Services/passport.service");

//external imports
const fetch = require("node-fetch");

exports.fetchCart = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`cart fetchCart-i-started`);
        let pg_result = await client.query(constants.query.cart.fetch_cart);
        if (pg_result.rowCount == 0) {
            handleError(constants.response_code.not_found, res, constants.error_messages.product.product_not_found);
            return;
        }
        res.send(pg_result.rows);
        logWriter(`cart fetchCart-i-finished`);
    } catch (error) {
        logWriter(`cart fetchCart-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.addCart = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`cart addCart-i-started`);
        var result_id = await client.query(constants.query.cart.get_id);
        var cart_id = result_id.rows[0].id + 1;
        let pg_result = await client.query(constants.query.cart.insert_cart,[cart_id,req.body.user_id,req.body.product_id,req.body.quantity]);
        let elastic_result = await elastic.index
        ({
            "index": "cart",
            "type": "doc",
            "id": cart_id,
            "body":
            {
                "product_id":req.body.product_id,
                "user_id":req.body.user_id,
                "quantity":req.body.quantity,
                "amount":req.body.amount
            }
        });
        res.end();
        logWriter(`cart addCart-i-finished`);
    } catch (error) {
        logWriter(`cart addCart-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.updateCart = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`cart updateCart-i-started`);
        let pg_result = await client.query(constants.query.cart.update_cart,[req.params.cart_id,req.body.quantity]);
        if (pg_result.rowCount == 0) {
            handleError(constants.response_code.not_found, res, constants.error_messages.product.product_not_found);
            return;
        }
        console.log(pg_result);
        await elastic.update
        ({
            "index": "cart",
            "type": "doc",
            "id": req.params.cart_id,
            "body":
            {
                doc:
                {
                "product_id":req.body.product_id,
                "user_id":req.body.user_id,
                "quantity":req.body.quantity,
                }
            }
        });
        res.end();
        logWriter(`cart updateCart-i-finished`);
    } catch (error) {
        logWriter(`cart updateCart-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.deleteCart = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`cart deleteCart-i-started`);
        let pg_result = await client.query(constants.query.cart.delete_cart,[req.params.cart_id]);
        let elastic_result = await elastic.delete({
            "index": "cart",
            "type": "doc",
            "id": req.params.cart_id
        });
        res.end();
        logWriter(`cart deleteCart-i-finished`);
    } catch (error) {
        logWriter(`cart deleteCart-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}