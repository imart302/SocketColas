
// Referencias del HTML
const lblTicket1  = document.querySelector('#lblTicket1') 
const lblDesktop1 = document.querySelector("#lblEscritorio1")
const lblTicket2 = document.querySelector('#lblTicket2')
const lblDesktop2 = document.querySelector("#lblEscritorio2")
const lblTicket3 = document.querySelector('#lblTicket3')
const lblDesktop3 = document.querySelector("#lblEscritorio3")
const lblTicket4 = document.querySelector('#lblTicket4')
const lblDesktop4 = document.querySelector("#lblEscritorio4")


const socket = io();


socket.on('connect', () => {

});

socket.on('disconnect', () => {

});


socket.on('last-four', (payload) => {

  const audio = new Audio('./audio/new-ticket.mp3');
  audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if(ticket1) {
    lblTicket1.innerHTML = 'Ticket ' + ticket1.number;
    lblDesktop1.innerHTML = ticket1.desktop;
  }

  if(ticket2) {
    lblTicket2.innerHTML = 'Ticket ' + ticket2.number;
    lblDesktop2.innerHTML = ticket2.desktop;
  }

  if(ticket3) {
    lblTicket3.innerHTML = 'Ticket ' + ticket3.number;
    lblDesktop3.innerHTML = ticket3.desktop;
  }

  if(ticket4) {
    lblTicket4.innerHTML = 'Ticket ' + ticket4.number;
    lblDesktop4.innerHTML = ticket4.desktop;
  }

});