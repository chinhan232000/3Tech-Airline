import { Express } from 'express';
import authRouter from '../routers/auth.router';
import homeRouter from '../routers/home.router';
import passengerRouter from '../routers/passenger.router';
import flightRouter from '../routers/flight.router';
import airlineRouter from '../routers/airline.router';
import airportRouter from '../routers/airport.router';
import seatRouter from '../routers/seat.router';
import reservationRouter from '../routers/reservation.router';
import baggageRouter from '../routers/baggage.router';
import billRouter from '../routers/bill.router';
import ticketRouter from '../routers/ticket.router';

const routerConfig = (app: Express) => {
  app.use('/', authRouter);
  app.use('/home', homeRouter);
  app.use('/passenger', passengerRouter);
  app.use('/flight', flightRouter);
  app.use('/airline', airlineRouter);
  app.use('/airport', airportRouter);
  app.use('/seat', seatRouter);
  app.use('/reservation', reservationRouter);
  app.use('/baggage', baggageRouter);
  app.use('/bill', billRouter);
  app.use('/ticket', ticketRouter);
};

export default routerConfig;
