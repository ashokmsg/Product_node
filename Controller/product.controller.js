const { getDbConnection, getElasticConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const keys = require("../Config/keys");
const { generateToken } = require("../Services/passport.service");

//external imports
const fetch = require("node-fetch");


exports.sampleSearch = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`sample search-i-started`);
        let result = await elastic.search({
            "index": "kibana_sample_data_flights",
        });
        res.send(result);

        logWriter(`sample search-i-finished`);
    } catch (error) {
        logWriter(`sample search-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}

exports.addProduct = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`add product-i-started`);
        var f = req.body.id;
        let result = await elastic.index
            ({
                "index": "product_details",
                "type": "_doc",
                "body":
                {
                    "author": req.body.autor,
                    "isbn": req.body.isbn,
                    "title": req.body.title,
                    "unit": req.body.unit,
                    "product_type": req.body.product_type,
                    "special_price": req.body.special_price,
                    "orginal_price": req.body.original_price,
                    "category": req.body.category,
                    "published_date": req.body.published_date,
                    "page_count": req.body.page_count,
                    "status": req.body.status,
                    "thumbnail_url": req.body.thumbnail_url
                }
            });
        res.end();
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
        var product_ID = req.body.id;
        let searchResult = await elastic.search
            ({
                "index": "product_details",
                "type": "_doc",
                "id": product_ID
            });
        if (searchResult.hits.total == 1) {
            await elastic.index
                ({
                    "index": "product_details",
                    "type": "_doc",
                    "body":
                    {
                        "id": req.body.id,
                        "author": req.body.autor,
                        "isbn": req.body.isbn,
                        "title": req.body.title,
                        "unit": req.body.unit,
                        "product_type": req.body.product_type,
                        "special_price": req.body.special_price,
                        "orginal_price": req.body.original_price,
                        "category": req.body.category,
                        "published_date": req.body.published_date,
                        "page_count": req.body.page_count,
                        "status": req.body.status,
                        "thumbnail_url": req.body.thumbnail_url
                    }
                });
                res.end();
                logWriter(`update product-i-finished`);
        }
        else{
            logWriter(`update product-i-Product doesn't exist`)
        }
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


