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
        });
    }, 5000); 
    atualizaChat();
}

function atualizaChat() {
    setInterval(renderizaChat, 3000);
}

function renderizaChat() {
    let chatHTML = '';
    
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then((resposta) => {
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
            return `<li class="default-message status" data-test="message">
                        <span class="hour">(${message.time})</span>
                        <span><strong>${message.from}</strong> ${message.text}</span>
                    </li>`;
        case "private_message":
            if(message.to == nomeUsuario){
                return `<li class="default-message private_message" data-test="message">
                            <span class="hour">(${message.time})</span>
                            <span><strong>${message.from}</strong> reservadamente para <strong>${message.to}</strong>:</span>
                            <span> ${message.text}</span>
                        </li>`;
            }
            return "";
        default: 
            return `<li class="default-message message" data-test="message">
                        <span class="hour">(${message.time})</span>
                        <span><strong>${message.from}</strong> para <strong>${message.to}</strong>:</span>
                        <span> ${message.text}</span>
                    </li>`;
    }
}

function enviaMensagem() {
    let input = document.getElementById("mensagem");
    let mensagem = {
        from: nomeUsuario,
        to: "Todos",
        text: input.value,
        type: "message"
    }
    if(!mensagem.text) return;
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem).then((resposta) => {
        console.log(resposta);
        input.value = '';
        renderizaChat();
    }).catch((erro) => {
        console.log(`erro: ${erro}`);
        window.location.reload();
    });
}