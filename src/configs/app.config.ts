/**

Application configuration object.
@typedef {Object} AppConfig
@property {Object} env - Environment configuration.
@property {string | number} env.PORT - Port number to listen on.
@property {Object} db - Database configuration.
@property {string} db.DB_URI - URI to connect to the database.
@property {Object} cookie - Cookie configuration.
@property {string} cookie.KEY_SECRET - Secret key to sign cookies.
*/
/**

The configuration object of the application.
@type {AppConfig}
*/
const appConfig = {
  env: {
    PORT: process.env.PORT || 3000,
  },
  db: {
    DB_URI: process.env.DB_URI || '',
  },
  cookie: {
    KEY_SECRET: process.env.KEY_SECRET || '',
  },
};

export default appConfig;
