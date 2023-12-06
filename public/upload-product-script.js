const productName= document.querySelector('#name');
const description= document.querySelector('#desc');
const category= document.querySelector('#category');
const quantity= document.querySelector('#qty');
const productId = document.querySelector('#id');
const productPrice= document.querySelector('#price');
const imgSrc= document.querySelector('#img');
const add_product= document.querySelector('#add');



add_product.onclick=(e)=>{
e.preventDefault();

    fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Title: productName.value, Category:category.value, Price: productPrice.value, Quantity:quantity.value, ID: productId.value, Img:imgSrc.value, Description: description.value
        })
    }).then((res)=>{
        console.log(`Product Succesfully added ${res}`)
    })

}

