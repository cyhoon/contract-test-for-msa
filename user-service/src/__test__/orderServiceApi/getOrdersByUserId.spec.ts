import { OrderServiceApi } from './../../orderServiceApi';
import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import { eachLike, term } from '@pact-foundation/pact/src/dsl/matchers';

pactWith({ consumer: 'UserService > Get Order By User Id', provider: 'OrderService' }, async (provider) => {
  let client: OrderServiceApi;

  beforeEach(() => {
    client = new OrderServiceApi(provider.mockService.baseUrl);
  });

  // 유저가 존재한다면
  // 기대한 값을 반환한다
  // 유저가 존재하지 않는다면
  // 요청했을 때 찾을 수 없다고 에러를 반환한다

  describe('GetOrdersByUserId spec', () => {

    beforeEach(() => {
      provider.addInteraction({
        state: 'state',
        uponReceiving: 'upon',
        withRequest: {
          method: 'GET',
          // path: term({ generate: '/users/hoon', matcher: '/users/hoon' }),
          path: '/users/hoon',
          headers: {
            Accept: 'application/json',
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            message: Matchers.like('ok'),
            data: {
              userId: Matchers.like('hoon'),
              orders: eachLike({
                id: '1',
                title: 'product#1',
                price: 3000,
              }, { min: 0 }),
            },
          }
        }
      });
    });

    describe('정상적인 값으로 요청했을 때', () => {

      test('기대한 값을 반환한다', async () => {
        const response = await client.getOrdersByUserId('hoon');

        console.log('response: ', response);

        expect(response.data.orders[0].id).toBe('1');
        expect(response.data.orders[0].title).toBe('product#1');
        expect(response.data.orders[0].price).toBe(3000);
      });
    });
  });
});
