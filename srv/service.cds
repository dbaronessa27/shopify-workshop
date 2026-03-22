using shopify from '../db/schema';

service ShopService {
  entity Categories as projection on shopify.Category;
  entity Products   as projection on shopify.Product;
  entity Carts      as projection on shopify.Cart;
  entity Orders     as projection on shopify.Order;

  action ping() returns String;

    action addProductToCart(
      cartID    : UUID,
      productID : UUID,
      quantity  : Integer
    ) returns Carts;

    action updateCartItemQuantity(
      cartItemID : UUID,
      quantity   : Integer
    ) returns Carts;

    action removeCartItem(
      cartItemID : UUID
    ) returns Carts;
}
