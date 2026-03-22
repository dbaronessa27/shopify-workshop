namespace shopify;

using { cuid, managed } from '@sap/cds/common';

entity Category : cuid, managed {
  name        : String(100);
  description : String(500);
  products    : Association to many Product on products.category = $self;
}

entity Product : cuid, managed {
  name        : String(100);
  description : String(1000);
  price       : Decimal(10,2);
  stock       : Integer;
  category    : Association to Category;
}

entity Cart : cuid, managed {
  buyer : String(255);
  items  : Composition of many CartItem on items.cart = $self;
}

entity CartItem : cuid, managed {
  cart     : Association to Cart;
  product  : Association to Product;
  quantity : Integer;
}

entity Order : cuid, managed {
  buyer  : String(255);
  status : String(30);
  total  : Decimal(10,2);
  items  : Composition of many OrderItem on items.order = $self;
}

entity OrderItem : cuid, managed {
  order    : Association to Order;
  product  : Association to Product;
  quantity : Integer;
  price    : Decimal(10,2);
}
