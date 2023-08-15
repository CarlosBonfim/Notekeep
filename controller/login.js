const formLogin = document.querySelector('.formLoginContainer')
formLogin.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(formLogin)
  const data = {}
  for(let [key, value] of formData.entries()){
    data[key] = value;
  }
  console.log(data)
  const url = "http://localhost:3000/auth/login";
  fetch(url, {
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      "Content-Type": "application/json"
    },
  })
  .then(res => {
    if(res.status === 422){
      console.log('Deu erro 422')
      const loginFailureMsg = document.querySelector('.errLogin')
      loginFailureMsg.classList.remove('errHidden')
    }else{
      return res.json()
    }
  })
  .then((json) => {
    console.log(json)
    const userData = {
      userEmail: json.userEmail,
      token: json.token
    }
    sessionStorage.setItem('userData', JSON.stringify(userData))
    window.location.href = 'index.html'

  }).catch(err => {
    console.log('Hovue um erro', err)

  })
})


function authenticate() {
  const url = "http://localhost:3000/auth/login";
  const data = {
    userEmail: "bruno@email.com",
    userPassword: "batata",   
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const userData = {
        userEmail: json.userEmail,
        token: json.token,
      };
      // // sessionStorage.setItem('token', json.token)
      sessionStorage.setItem("userData", JSON.stringify(userData));
    })
    .catch((err) => console.error(err));
}