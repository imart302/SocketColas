const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('last-four', ticketControl.lastFour);
  socket.emit('queue', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next();
    socket.broadcast.emit('last-ticket', ticketControl.last);
    socket.broadcast.emit('queue', ticketControl.tickets.length);
    callback(next);
  });

  socket.on('dispatch-ticket', (desktop, callback) => {
    if (!desktop) {
      return;
    }

    if (ticketControl.tickets.length === 0) {
      callback(null);
      return;
    }

    const ticket = ticketControl.dispatchTicket(desktop);

    socket.broadcast.emit('last-four', ticketControl.lastFour);
    socket.broadcast.emit('queue', ticketControl.tickets.length);
    socket.emit('queue', ticketControl.tickets.length);

    callback(ticket.number);
  });
};

module.exports = {
  socketController,
};
