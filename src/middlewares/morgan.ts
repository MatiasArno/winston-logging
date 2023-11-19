import morgan from 'morgan';
import { httpLogger } from '../loggers/http-logger';

const morganMiddleware = morgan(
	':method :url :status :res[content-length] - :response-time ms',
	{
		stream: {
			write: (message) => httpLogger.http(message.trim()),
		},
	}
);

export { morganMiddleware };
