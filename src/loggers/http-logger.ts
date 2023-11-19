import { LOGTAIL_TOKEN } from '../constants';

import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json, printf, errors } = format;

import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
const logtail = new Logtail(LOGTAIL_TOKEN);

const cliLogFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} | ${level}: ${message}`;
});

const fileRotateTransport = new transports.DailyRotateFile({
	filename: './logs/http-requests-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '3d',
	format: json(),
});

const httpLogger = createLogger({
	level: 'http',
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
			filename: './dev-logs/http-requests.log',
			format: json(),
		}),
		new transports.Http({
			level: 'http',
			format: json(),
			host: 'localhost',
		}),
		new LogtailTransport(logtail),
	],
	exitOnError: false,
});

export { httpLogger };
