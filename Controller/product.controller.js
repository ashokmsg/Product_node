const { getDbConnection, getElasticConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const keys = require("../Config/keys");
const { generateToken } = require("../Services/passport.service");

//external imports
const fetch = require("node-fetch");

exports.addProduct = async (req, res) => {
    let client = getDbConnection();
    let elastic = getElasticConnection();
    try {
        logWriter(`add product-i-started`);
        var result_id = await client.query(constants.query.product.get_id);
        var product_id = result_id.rows[0].id + 1;
        let pg_result = await client.query(constants.query.product.insert_product, [product_id, req.body.title, req.body.isbn, req.body.page_count, req.body.type, req.body.published_date, req.body.thumbnail_url, req.body.status, req.body.authors, req.body.categories, req.body.unit, req.body.special_price, req.body.original_price]);
        let elastic_result = await elastic.index
            ({
                "index": "product",
                "type": "doc",
                "id": product_id,
                "body":
                {
                    "author": req.body.authors,
                    "isbn": req.body.isbn,
                    "title": req.body.title,
                    "unit": req.body.unit,
                    "type": req.body.product_type,
                    "special_price": req.body.special_price,
                    "orginal_price": req.body.original_price,
                    "category": req.body.categories,
                    "published_date": req.body.published_date,
                    "page_count": req.body.page_count,
                    "status": req.body.status,
                    "thumbnail_url": req.body.thumbnail_url,
                    "published_date": req.body.published_date
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
    let elastic = getElasticConnection();
    try {
        logWriter(`update product-i-started`);
        let pg_result = await client.query(constants.query.product.update_product, [product_id, req.body.title, req.body.isbn, req.body.page_count, req.body.type, req.body.published_date, req.body.thumbnail_url, req.body.status, req.body.authors, req.body.categories, req.body.unit, req.body.special_price, req.body.original_price]);
        if (pg_result.rowCount == 0) {
            handleError(constants.response_code.not_found, res, constants.error_messages.product.product_not_found);
            return;
        }
        await elastic.update
            ({
                "index": "product",
                "type": "doc",
                "id": req.params.product_id,
                "body":
                {
                    doc:
                    {
                        "author": req.body.authors,
                        "isbn": req.body.isbn,
                        "title": req.body.title,
                        "unit": req.body.unit,
                        "type": req.body.product_type,
                        "special_price": req.body.special_price,
                        "orginal_price": req.body.original_price,
                        "category": req.body.categories,
                        "published_date": req.body.published_date,
                        "page_count": req.body.page_count,
                        "status": req.body.status,
                        "thumbnail_url": req.body.thumbnail_url,
                        "published_date": req.body.published_date
                    }
                }
            });
        res.end();
        logWriter(`update product-i-finished`);

        // logWriter(`update product-i-finished`);
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
    let elastic = getElasticConnection();
    try {
        logWriter(`delete product-i-started`);
        let pg_result = await client.query(constants.query.product.soft_delete_query, [req.params.product_id]);
        if (pg_result.rowCount == 0) {
            handleError(constants.response_code.not_found, res, constants.error_messages.product.product_not_found);
            return;
        }
        let elastic_result = await elastic.delete({
            "index": "product",
            "type": "doc",
            "id": req.params.product_id
        });
        res.end();
        logWriter(`delete product-i-finished`);
    } catch (error) {
        logWriter(`delete product-e-${error.toString()}`);
        console.log(error.toString());
        handleError(constants.response_code.internal_server_error, res, constants.error_messages.internal_server_error);
    } finally {
        client.end();
    }
}