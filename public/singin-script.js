const signInName=document.querySelector('#username');
const signInPassword= document.querySelector('#password');
const submit= document.querySelector('#Submit');

submit.onclick=(e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Name: signInName.value, Password: signInPassword.value
        })
    })
    .then(response=> response.json())
    .then((data)=>{
        signInName.value='';
        signInPassword.value='';
        console.log(data);
        let token=data.accessToken;
        localStorage.setItem('authToken', token);
        localStorage.setItem('authId', data.user._id);
        localStorage.setItem('authName', data.user.Name);
        console.log(localStorage.getItem('authToken').toString());
        let url= `http://localhost:5000/products?category=all`

        window.location.href=url;

       /* let header={
            'Content-type': 'application/json',
            'token': `Bearer ${data.accessToken}`
        }
        let options= {
            method: 'GET',
            headers: header,
        }
fetch(url, options).then((res)=>{
    let url= res.url;
    if(res.ok) window.location.href=url
   //document.querySelector('body').innerHTML=res;     
//console.log(redirectUrl);
      })*/
        
    }
)
}