import { connect, connection } from 'mongoose';
import envVars from './env-variables';

const { mongo: mongoConfig } = envVars || {};
const { host: mongoUri } = mongoConfig || {};

function dbConnect() {
  connect(mongoUri, { keepAlive: 1, useNewUrlParser: true });

  return new Promise((resolve, reject) => {
    connection
      .on('error', () => {
        reject(`Unable to connect to database: ${ mongoUri }`);
      })
      .once('open', () => {
        resolve('We\'re connected to database!');
      });
  });
}

export default dbConnect;