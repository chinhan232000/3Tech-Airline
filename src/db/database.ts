import mongoose from 'mongoose';
import appConfig from '../configs/app.config';

/**

Class representing a database connection.
*/
export class Database {
  /*

Connects to the database using the DB_URI configuration from appConfig.
@async
*/
  async connect(): Promise<void> {
    /*
Connects to the database using mongoose.
*/
    mongoose.connect(appConfig.db.DB_URI);
    /**

Represents the database connection.
*/
    const db = mongoose.connection;
    /**

Event listener for mongoose error.
@event
@param {Error} err - The error object.
*/
    db.on('error', (err) => console.log('mongoose error: ', err));
    /**

Event listener for successful database connection.
@event
*/
    db.once('open', () => {
      console.log('DB Connect sucesses');
    });
  }
}
