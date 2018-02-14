let transportType = signalR.TransportType.WebSockets;
let http = new signalR.HttpConnection(`http://${document.location.host}/chat`, {
    transport: transportType
});
let connection = new signalR.HubConnection(http);
connection.start();

connection.on('Send', (name, message) => {
    const myName = document.getElementById('your-name').innerText;
    appendLine(name, message, isMe(name, myName));
});

document.getElementById('frm-send-message')
    .addEventListener('submit', event => {
        const name = document.getElementById('your-name').innerText;
        const message = document.getElementById('message').value;

        document.getElementById('message').value = '';

        connection.invoke('Send', name, message);
        event.preventDefault();
    });

function appendLine(name, message, isMe) {
    const nameElement = document.createElement('strong');
    nameElement.innerText = `${name}:`;
    if (isMe) {
        nameElement.style.color = 'blue';
    }

    const msgElement = document.createElement('em');
    msgElement.innerText = ` ${message}`;

    const li = document.createElement('li');
    li.appendChild(nameElement);
    li.appendChild(msgElement);

    document.getElementById('messages').append(li);
};

function continueToChat() {
    document.getElementById('your-name').innerText = document.getElementById('name').value;
    document.getElementById('entrance').style.display = 'none';
    document.getElementById('chat').style.display = '';
}

function isMe(senderName, receiverName) {
    return senderName === receiverName ? true : false;
}
