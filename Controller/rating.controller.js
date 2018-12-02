const { getDbConnection } = require("../Utils/dbConnections");
const { handleError ,logWriter} = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const keys = require("../Config/keys");
const { generateToken } = require("../Services/passport.service");

//external imports
const fetch = require("node-fetch");

//internal imports
const fs = require("fs");

exports.userHistory = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`user history-i-started`);
        let user_id = req.params.user_id;
        let result = await client.query('select * from rating_and_review where user_id = $1', [user_id]);
        res.send(result.rows);
        logWriter(`user history-i-finished`);
    } catch (error) {
        logWriter(`user history-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.adminHistory = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`admin history-i-started`);
        let result = await client.query('select * from rating_and_review ');
        res.send(result.rows);
        logWriter(`admin history-i-finished`);
    } catch (error) {
        logWriter(`admin history-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.productHistory = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`product history-i-started`);
        let product_id = req.params.product_id;
        let result = await client.query('select (select round(avg(rating),1) from rating_and_review  where product_id = $1 group by product_id) as avg_rating, user_id,review_title,review_description,rating,likes,dislikes,helpful from rating_and_review where product_id = $1 and abuse != 1', [product_id]);
        res.send(result.rows);
        logWriter(`product history-i-finished`);
    } catch (error) {
        logWriter(`product history-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
        // handleError(500, res, error.toString());
    } finally {
        client.end();
    }
}

exports.getRating = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`get rating-i-started`);
        let product_id = req.params.product_id;
        let result = await client.query('select product_id,round(avg(rating),1) from rating_and_review  where product_id = $1 group by product_id', [product_id]);
        res.send(result.rows);
        logWriter(`get rating-i-finished`);
    } catch (error) {
        logWriter(`get rating-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}


exports.insertRating = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`insert rating-i-started`);
        //need to code
        res.send('hai');
        logWriter(`insert rating-i-finished`);
    } catch (error) {
        logWriter(`insert rating-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}


exports.updateLikes = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`update likes-i-started`);
        review_id = req.params.review_id;
        let result = await client.query('update rating_and_review set likes=likes+1 where review_id=$1', [review_id]);
        res.send("hai");
        logWriter(`update likes-i-finished`);
    } catch (error) {
        logWriter(`update likes-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}


exports.updateDislikes = async (req, res) => {
    let client = getDbConnection();
    try {
        logWriter(`update dislkes-i-started`);
        review_id = req.params.review_id;
        let result = await client.query('update rating_and_review set dislikes=dislikes+1 where review_id=$1', [review_id]);
        res.send("hai");
        logWriter(`update dislkes-i-finished`);
    } catch (error) {
        logWriter(`update dislkes-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}