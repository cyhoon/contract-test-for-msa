import fastify from 'fastify';

const server = fastify({ logger: true });

server.get<{ Params: { userId: string } }>('/users/:userId', async (request, reply) => {
  const { userId } = request.params;

  return {
    message: 'ok',
    data: {
      userId,
      orders: [
        {
          id: 1,
          title: 'product#1',
          price: 3000,
        },
        {
          id: 2,
          title: 'product#2',
          price: 5000,
        }
      ],
    }
  };
});

const start = async () => {
  try {
    await server.listen(3000);
    console.log('server listening on 3000');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();
