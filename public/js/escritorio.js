
const searchParams = new URLSearchParams(window.location.search);


if(!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('escritorio');
console.log({desktop});


// Referencias del HTML
const lblDesktop = document.querySelector('h1');
const dispatchButton = document.querySelector('button');
const actual = document.querySelector('h4');
const noTicket = document.querySelector('#no-ticket');
const lblQueue = document.querySelector("#lblPendientes");

const socket = io();
noTicket.style.display = 'none';

socket.on('connect', () => {

  dispatchButton.disabled = false;

});

socket.on('disconnect', () => {

  dispatchButton.disabled = true;

});

socket.on('queue', (count) => {
  lblQueue.innerHTML = count;
});

dispatchButton.addEventListener('click', () => {

  socket.emit('dispatch-ticket', desktop , (ticket) => {
    if(!ticket) {
      noTicket.style.display = 'block';
      actual.innerHTML = 'No hay mas tickets';
      return;
    }
    
    actual.innerHTML = 'Atendiendo a Ticket ' + ticket;
  });

});