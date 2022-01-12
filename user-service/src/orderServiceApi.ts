import axios from 'axios';

type GetOrderByUserIdResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    orders: { id: number, title: string, price: number }[];
  };
}

export class OrderServiceApi {
  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async getOrdersByUserId(userId: string): Promise<GetOrderByUserIdResponse> {
    const url = `${this.apiUrl}/users/${userId}`;
    const response = await axios.get(url, { headers: { Accept: 'application/json' } });

    return response.data;
  }
}
