import express, { json } from 'express';
import { morganMiddleware } from './middlewares/morgan';
import { mainLogger } from './loggers/main-logger';

const app = express();

app.use(json());
app.use(morganMiddleware);

app.get('/', (req, res) => {
	mainLogger.emerg('Probando emerg');
	mainLogger.alert('Probando alert');
	mainLogger.crit('Probando crit');
	mainLogger.error('Probando error');
	mainLogger.warning('Probando warning');
	mainLogger.notice('Probando notice');
	mainLogger.info('Probando info');
	mainLogger.debug('Probando debug');

	res.json({ status: true });
});

export default app;
