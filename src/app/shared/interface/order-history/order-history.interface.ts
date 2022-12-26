export interface IBoughtProducts {
  name: string,
  quantity: number
}

export interface IOrderHistory {
  orderNumber: number,
  address: string,
  products: Array<IBoughtProducts>,
  totalAmount: number,
  orderTime: string,
  status: boolean
}
