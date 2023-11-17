import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export const logRequestsInfo = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { method, url } = req;

	const date = new Date().toISOString();

	res.on('finish', () => {
		const { statusCode } = res;
        
		console.log(
			`${method} '${url}' - ${statusCode} - ${res.get(
				'X-Response-Time'
			)} | ${date}`
		);

		logger.http({
			method,
			url,
			date,
			responseTime: res.get('X-Response-Time'),
		});
	});

	next();
};
