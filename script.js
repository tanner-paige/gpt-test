const messageForm = document.getElementById('message-form');
const messageList = document.getElementById('message-list');

let messages = [];

function renderMessages() {
	messageList.innerHTML = '';
	messages.forEach((message, index) => {
		const element = document.createElement('div');
		element.classList.add('message');
		element.innerHTML = `
			<div class="votes">${message.votes}</div>
			<div class="content">${message.content}</div>
			<button class="upvote">Upvote</button>
			<button class="downvote">Downvote</button>
		`;
		const upvoteButton = element.querySelector('.upvote');
		upvoteButton.addEventListener('click', () => {
			messages[index].votes++;
			renderMessages();
		});
		const downvoteButton = element.querySelector('.downvote');
		downvoteButton.addEventListener('click', () => {
			messages[index].votes--;
			renderMessages();
		});
		messageList.appendChild(element);
	});
}

messageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const messageInput = document.getElementById('message-input');
	const messageContent = messageInput.value;
	messageInput.value = '';
	const message = {
		content: messageContent,
		votes: 0,
	};
	messages.push(message);
	renderMessages();
});

renderMessages();
