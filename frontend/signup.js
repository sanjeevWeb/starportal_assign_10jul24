const signupForm = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');

const gotoLogin = document.querySelector('a');
const baseUrl = `http:localhost:4001/api`

gotoLogin.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html';
})


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!username.value || !email.value || !pass.value) {
        alert('all fields are mandatory');
        // showToast('all fields are mandatory', null)
        return;
    }
    const obj = {
        username: username.value,
        email: email.value,
        password: pass.value
    };
    const response = await axios.post(`${baseUrl}/register`, obj);
    if (response.data.error) {
        // showToast(response.data.error, null);
        alert(response.data.error);
        return
    }
    alert("signup successfull, please login")
    // showToast(null,response.data.message);
    window.location.href = './login.html'
})