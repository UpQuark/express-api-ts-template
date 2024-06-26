import http from 'http';
import app from './app';

const normalizePort = (val: string | number): number | string | boolean => {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number

  return false;
};

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);