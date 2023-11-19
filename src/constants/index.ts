const PORT = process.env.PORT ?? 45009;
const ENVIRONMENT = process.env.ENVIRONMENT;
const LOGTAIL_TOKEN = process.env.LOGTAIL_TOKEN || '';

const isDevelopEnvironment = () => ENVIRONMENT === 'development';

export { PORT, ENVIRONMENT, LOGTAIL_TOKEN, isDevelopEnvironment };
