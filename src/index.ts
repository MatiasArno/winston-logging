import app from './app';
import pc from 'picocolors';

const PORT = process.env.PORT ?? 45009;

app.listen(PORT, () => console.log('Server running on port', pc.yellow(PORT)));
