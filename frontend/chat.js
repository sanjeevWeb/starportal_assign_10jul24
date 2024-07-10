const socket = io('ws://localhost:4003', {
  auth: {
    token: localStorage.getItem('token')
  }
})

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const baseUrl = `http:localhost:4002/api`


socket.on('notification', data => {
  console.log('noti', data);
  appendMessage(data)
})

socket.on('connection', name => {
  appendMessage(`${name} connected`)
})

socket.on('disconnect', msg => {
  appendMessage(msg)
})

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const message = messageInput.value
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}/notifications`, { message }, { headers: { 'Authorization': token } });
  }
  catch (error) {
    console.log(error);
  }
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

async function getAllMessage() {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${baseUrl}/notifications`, { headers: { 'Authorization': token } });
  console.log('response', response);
  let res = Array.from(response.data)
  console.log('res', res);
  if (res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      appendMessage(res[i].message);
    }
  }
}

getAllMessage()