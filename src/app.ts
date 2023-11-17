import express, { json } from 'express';
import logger from './logger';
import { logRequestsInfo } from './middlewares/requests-logger';
import responseTime from 'response-time';

const app = express();

app.use(json());
app.use(responseTime());
app.use(logRequestsInfo);

app.get('/', (req, res) => {
	logger.emerg('Probando emerg');
	logger.alert('Probando alert');
	logger.crit('Probando crit');
	logger.error('Probando error');
	logger.warning('Probando warning');
	logger.notice('Probando notice');
	logger.info('Probando info');
	logger.debug('Probando debug');

	res.json({ status: true });
});

app.get('/error', (req, res) => {
	try {
		throw new Error('PROBANDO EXCEPCIÓN');
	} catch (error) {
        logger.error(error);
		res.status(404).json({ error });
	}

    throw new Error('PROBANDO OTRA EXCEPCIÓN');
});

export default app;
