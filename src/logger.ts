import { createLogger, format, transports, config } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json, printf, errors } = format;

const isDevelepmentEnvironment = process.env.ENVIRONMENT == 'development';

const cliLogFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} | ${level}: ${message}`;
});

const fileRotateTransport = new transports.DailyRotateFile({
	filename: './logs/%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '28d',
	format: json(),
});

// FALTA LOGGEAR ERRORES NO TRATADOS

const logger = createLogger({
	levels: config.syslog.levels,
	level: isDevelepmentEnvironment ? 'debug' : 'warning',
	format: combine(
		errors({ stack: true }),
		json(),
		timestamp({
			format: 'YYYY-MM-DD hh:mm:ss.SSS A',
		}),
		cliLogFormat
	),
	transports: [
		fileRotateTransport,
		new transports.Console(),
		new transports.File({
			filename: './logs/api.log',
			format: json(),
		}),
		new transports.File({
			filename: './logs/api-errors.log',
			level: 'warning',
			format: json(),
		}),
		new transports.Http({
			level: 'debug',
			format: json(),
		}),
	],
	exitOnError: false,
});

export default logger;
