import {
  app,
  connectToServer,
  dbConnect
} from '@app/configs';

(async function () {
  try {
    const message = await dbConnect();
    // eslint-disable-next-line no-console
    console.log(message);
    connectToServer();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();

export default app;
