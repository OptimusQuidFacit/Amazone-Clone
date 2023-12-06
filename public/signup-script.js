const userName= document.querySelector('#user-name');
const email= document.querySelector('#user-email');
const password = document.querySelector('#user-password');
const passwordConfirm= document.querySelector('#password-confirm');
const submit= document.querySelector('#user-submit');



submit.onclick=(e)=>{
e.preventDefault();
if(password.value==passwordConfirm.value){
    fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Name: userName.value, Password: password.value, ConfirmPassword:passwordConfirm.value, Email: email.value
        })
    }).then(()=>{
        userName.value="";
        email.value="";
        password.value="";
        passwordConfirm.value="";
    })
}
else{
    alert("Passwords don't match");
}
}

