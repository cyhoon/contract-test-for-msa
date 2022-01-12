import path from 'path';
import { pactWith } from 'jest-pact';
import { OrderServiceApi } from './orderServiceApi';
import { Pact, Matchers } from '@pact-foundation/pact';

const { eachLike, like } = Matchers;

pactWith({ consumer: 'UserService', provider: 'OrderService' }, async (provider: Pact) => {
  let client: OrderServiceApi;

  beforeEach(() => {
    client = new OrderServiceApi(provider.mockService.baseUrl);
  });

  // GetOrdersByUserId Spec
  // - 정상적인 값으로 요청했을 때
  //  - 기대한 값을 반환한다
  // - 존재하지 않는 데이터로 요청했을 때
  // - 예상한 오류를 반환한다
  // - 규칙에 맞지 않는 값을 요청했을 때
  // - 예상한 오류를 반환한다
  // - 서버에 오류가 발생했을 때
  // - 예상한 오류를 반환한다

  describe('GetOrdersByUserId spec', () => {
    beforeEach(() => {
      provider.addInteraction({
        state: 'state',
        uponReceiving: 'upon',
        withRequest: {
          method: 'GET',
          path: '/users/hoon',
          headers: {
            Accept: 'application/json',
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json;',
          },
          body: {
            message: 'ok',
            data: {
              userId: like('hoon'),
              orders: eachLike({
                id: 1,
                title: 'product#1',
                price: 3000,
              }),
            },
          },
        }
      });
    });

    it('returns server health', async () => {
      const response = await client.getOrdersByUserId('hoon');

      console.log('response: ', response);

      expect(response.data.orders[0].id).toBe(1);
      expect(response.data.orders[0].title).toBe('product#1');
      expect(response.data.orders[0].price).toBe(3000);
    });
  });
});
