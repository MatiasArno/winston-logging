import app from './app';
import pc from 'picocolors';
import { PORT } from './constants';

app.listen(PORT, () => console.log('Server running on port', pc.yellow(PORT)));
