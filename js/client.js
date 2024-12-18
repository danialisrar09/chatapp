const socket = io('http://localhost:3002    ');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");
var audio = new Audio('beep.mp3')


const append = (message, position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play()

    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You ${message}`, 'right')
    socket.emit(`send`, message);
    messageInput.value = ''

})
const naam = prompt("Enter your name: ");
socket.emit('new-user-joined', naam);

socket.on('user joined', name=>{
    append(`${name} joined the chat`, 'right')

})

socket.on('recieve', data =>{
    append(`${data.user}: ${data.message}`, 'left')
})

socket.on('left', data =>{
    append(`${data.user} left the chat`, 'left')

})