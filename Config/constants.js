module.exports = {
    error_messages: {
        invalid_title: "Invalid Title",
        inalid_description: "Invlid Description",
        invalid_image: "Invalid Image",
        invalid_price: "Invalid Price",
        product: {
            product_not_found: "Product not found"
        }
    },
    response_code: {
        not_found: 404,
        external_server_error: 503,
        internal_server_error: 500,
        bad_request: 400,
        conflict_occured: 409
    },
    query:
    {
        product:
        {
            insert_product: "insert into product (id,title,isbn,page_count,type,published_date,thumbnail_url,status,authors,categories,unit,special_price,original_price) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
            get_id: 'select max(id) as id from products',
            soft_delete_query: "update product set is_delete='true' where id=$1",
            update_product: "update product set title=$2,isbn=$3,page_count=$4,type=$5,published_date=$6,thumbnail_url=$7,status=$8,authors=$9,categories=$10,unit=$11,special_price=$12,original_price=$13 where id=$1"
        },
        cart:
        {
            fetch_cart:"select * from cart where is_delete='false'",
            insert_cart:"insert into cart (id,user_id,product_id,quantity) values ($1,$2,$3,$4)",
            update_cart:"update cart set quantity = $2 where id=$1",
            get_id: 'select max(id) as id from cart',
            delete_cart:"update cart set is_delete='true' where id=$1"
        }
    }
}