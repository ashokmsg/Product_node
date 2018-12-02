module.exports = {
    error_messages: {
        invalid_title: "Invalid Title",
        inalid_description:"Invlid Description",
        invalid_image:"Invalid Image",
        invalid_price:"Invalid Price"
    },
    
    response_code:{
        not_found:404,
        external_server_error:503,
        internal_server_error:500,
        bad_request:400,
        conflict_occured:409
    },
    
    query:
{
    insertProduct:"insert into products (title,isbn,page_count,type,published_date,thumbnail_url,status,authors,categories,unit,special_price,original_price) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    getId:'select max(id) as id from products',
    soft_delete_query:"UPDATE PRODUCT_DETAILS SET IS_DELETE='true' WHERE PRODUCT_ID=$1"
}
}

