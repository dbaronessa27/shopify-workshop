import { BadRequestException, NotFoundException } from '../common';
import { CartRepository } from '../repositories/cart.repository';
import { ProductRepository } from '../repositories/product.repository';

export class CartService {
    private readonly cartRepository = new CartRepository();
    private readonly productRepository = new ProductRepository();

    async addProductToCart(cartId: string, productId: string, quantity: number) {
        if (!quantity || quantity <= 0) {
            throw new BadRequestException('Quantity must be greater than 0');
        }

        const cart = await this.cartRepository.findCartById(cartId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const existingItem = await this.cartRepository.findCartItem(cartId, productId);

        if (existingItem) {
            await this.cartRepository.updateCartItemQuantity(
                existingItem.ID,
                existingItem.quantity + quantity
            );
        } else {
            await this.cartRepository.createCartItem({
                cart_ID: cartId,
                product_ID: productId,
                quantity
            });
        }

        return this.cartRepository.getCartWithItems(cartId);
    }

    async updateCartItemQuantity(cartItemId: string, quantity: number) {
        if (!quantity || quantity <= 0) {
            throw new BadRequestException('Quantity must be greater than 0');
        }

        const item = await this.cartRepository.findCartItemById(cartItemId);
        if (!item) {
            throw new NotFoundException('Cart item not found');
        }

        await this.cartRepository.updateCartItemQuantity(cartItemId, quantity);

        return this.cartRepository.getCartWithItems(item.cart_ID);
    }

    async removeCartItem(cartItemId: string) {
        const item = await this.cartRepository.findCartItemById(cartItemId);
        if (!item) {
            throw new NotFoundException('Cart item not found');
        }

        await this.cartRepository.deleteCartItem(cartItemId);

        return this.cartRepository.getCartWithItems(item.cart_ID);
    }
}
