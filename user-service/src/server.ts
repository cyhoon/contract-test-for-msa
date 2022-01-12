import fastify from 'fastify';
import { OrderServiceApi } from './orderServiceApi';

const server = fastify({ logger: true });

const orderServiceApi = new OrderServiceApi('https://localhost:5000');

server.get<{ Params: { userId: string } }>('/users/:userId', async (request, reply) => {
  const { userId } = request.params;

  const { data: { orders } } = await orderServiceApi.getOrdersByUserId(userId);

  return {
    message: 'ok',
    data: {
      id: userId,
      name: 'ctfm',
      orders,
    }
  };
});

const start = async () => {
  try {
    await server.listen(9000);
    console.log('server listening on 9000');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();
