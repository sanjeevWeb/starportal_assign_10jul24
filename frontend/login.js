const regEmail = document.querySelector('#regEmail');
const password = document.querySelector('#password');
const loginForm = document.querySelector('#loginForm');

const gotoRegister = document.querySelector('a');
const baseUrl = `http:localhost:4001/api`

gotoRegister.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './signup.html';
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!regEmail.value || !password.value){
        alert('all fields are mandatory')
        return;
    }
    const obj = { email: regEmail.value, password: password.value };
    const response = await axios.post(`${baseUrl}/login`, obj);
    console.log(response)
    if(response.status === 400 || response.status === 401 || response.data.error){
        alert(response.data.error)
        return;
    }
    if(response.data.token){
        localStorage.setItem('token',response.data.token)
    }

    alert('logged in successfully')
    window.location.href = './chat.html'
})