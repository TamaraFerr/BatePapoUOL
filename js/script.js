let nomeUsuario;
let chat = [
	{
		from: "João",
		to: "Todos",
		text: "entra na sala...",
		type: "status",
		time: "08:01:17"
	},
	{
		from: "João",
		to: "Todos",
		text: "Bom dia",
		type: "message",
		time: "08:02:50"
	},
    {
		from: "João",
		to: "Todos",
		text: "Bom dia",
		type: "private_message",
		time: "08:02:50"
	},
]
const salaChat = document.getElementById('chat');

criaUsuario()

function criaUsuario() {
    nomeUsuario = prompt("Bem-vindo! Qual é seu nome?");
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nomeUsuario }).then((resposta) => {
        renderizaChat();
    });
}

function renderizaChat() {
    let chatHTML = '';
    salaChat.innerHTML = '';
    
    chat.forEach((message) => {
        chatHTML += montaMensagem(message);
    });
    salaChat.innerHTML = chatHTML;
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