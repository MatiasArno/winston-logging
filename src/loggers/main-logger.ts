import { isDevelopEnvironment, LOGTAIL_TOKEN } from '../constants';

import { createLogger, format, transports, config, http } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json, printf, errors } = format;

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
const logtail = new Logtail(LOGTAIL_TOKEN);

const cliLogFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} | ${level}: ${message}`;
});

const fileRotateTransport = new transports.DailyRotateFile({
	filename: './logs/%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '3d',
	format: json(),
});

const mainLogger = createLogger({
	levels: config.syslog.levels,
	level: isDevelopEnvironment() ? 'debug' : 'warning',
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
			filename: './dev-logs/api.log',
			format: json(),
		}),
		new transports.File({
			filename: './logs/api-errors.log',
			level: 'warning',
			format: json(),
		}),
		new LogtailTransport(logtail),
	],
	exitOnError: false,
});

export { mainLogger };
