
export interface Product  {
  price: number,
  title: string,
  thumbnail: string,
  description?: string,
  id?: number,
  stock:number,
  productId:string
};

export interface Cart {
  products: Array<Product>,
  id: number,
  cartId: string,
}
