const products=[];
const userId=document.querySelector('#user-Id').innerHTML;
const add_product=document.querySelector('#add');


//adding a product to the database
add_product.onclick=(e)=>{
e.preventDefault();

    fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Products: products, UserId: userId
        })
    }).then((res)=>{
        console.log(`Product Succesfully added ${res}`)
    })

}

