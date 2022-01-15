import fastify from 'fastify';

const server = fastify({ logger: true });

server.get<{ Params: { userId: string } }>('/users/:userId', async (request, reply) => {
  const { userId } = request.params;

  reply.code(200).header('Content-Type', 'application/json').send({
    message: 'ok',
    data: {
      userId,
      orders: [
        {
          id: '3',
          title: 'product#1',
          price: 5000,
        }
      ],
    }
  });
});

export const start = async () => {
  try {
    await server.listen(3000);
    console.log('server listening on 3000');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export function startServer(port, callback) {
  server.listen(port, () => {
    callback(server);
  });
}
