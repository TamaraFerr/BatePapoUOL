let nomeUsuario;
let chat = [];

const salaChat = document.getElementById('chat');

criaUsuario()

function criaUsuario() {
    nomeUsuario = prompt("Bem-vindo! Qual é seu nome?");
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nomeUsuario }).then((resposta) => {
        acompanhaStatus();
    });
}

function acompanhaStatus() {
    setInterval(() => {
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nomeUsuario }).then((resposta) => {
            renderizaChat();
        });
    }, 5000);
}

function renderizaChat() {
    let chatHTML = '';
    
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then((resposta) => {
        console.log(resposta);
        chat = resposta.data;

        chat.forEach((message) => {
            chatHTML += montaMensagem(message);
        });
        salaChat.innerHTML = chatHTML;
    });
}

function montaMensagem(message) {
    switch(message.type){
        case "status":
            return `<li class="default-message status">
                        <span class="hour">(${message.time})</span>
                        <span><strong>${message.from}</strong> ${message.text}</span>
                    </li>`;
        case "private_message":
            return `<li class="default-message private_message">
                        <span class="hour">(${message.time})</span>
                        <span><strong>${message.from}</strong> reservadamente para <strong>${message.to}</strong>:</span>
                        <span> ${message.text}</span>
                    </li>`;
        default: 
            return `<li class="default-message message">
                        <span class="hour">(${message.time})</span>
                        <span><strong>${message.from}</strong> para <strong>${message.to}</strong>:</span>
                        <span> ${message.text}</span>
                    </li>`;
    }
}