
// Referencias del HTML
const lblNewTicket  = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');


const socket = io();



socket.on('connect', () => {

  btnCreate.disabled = false;

});

socket.on('disconnect', () => {

  btnCreate.disabled = true;

});


socket.on('last-ticket', (ticket) => {
  lblNewTicket.innerHTML = `Ticket ${ticket}`;
});

socket.on('queue', (count) => {
  if(count === 0) {
    lblNewTicket.innerHTML = 'No hay tickets';
  }
});

btnCreate.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        console.log(ticket);
        lblNewTicket.innerHTML = ticket;
    });

});