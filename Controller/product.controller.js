const { getDbConnection , getElasticConnection } = require("../Utils/dbConnections");
const { handleError ,logWriter} = require("../Utils/utilMethods");
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
        let pg_result=await client.query(constants.query.insertProduct,[req.body.title,req.body.isbn,req.body.page_count,req.body.type,req.body.published_date,req.body.thumbnail_url,req.body.status,req.body.authors,req.body.categories,req.body.unit,req.body.special_price,req.body.original_price]);
        var result_id = await client.query(constants.query.getId);
        var product_id=result_id.rows[0].id+1;
        let elastic_result=await elastic.index
        ({
            "index":"products",
            "type":"_doc",
            "body":
            {
          "id":product_id,
          "author" : req.body.authors,
          "isbn" : req.body.isbn,
          "title" : req.body.title,
          "unit" : req.body.unit,
          "type" : req.body.product_type,
          "special_price" : req.body.special_price,
          "orginal_price" : req.body.original_price,
          "category" : req.body.categories,
          "published_date":req.body.published_date,
          "page_count":req.body.page_count,
          "status":req.body.status,
          "thumbnail_url":req.body.thumbnail_url,
          "published_date":req.body.published_date
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


