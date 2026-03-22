import cds from '@sap/cds';

export class CartRepository {
    async findCartById(cartId: string) {
        return cds.run(
            SELECT.one.from('shopify.Cart').where({ ID: cartId })
        );
    }

    async findCartItemById(cartItemId: string) {
        return cds.run(
            SELECT.one.from('shopify.CartItem').where({ ID: cartItemId })
        );
    }

    async findCartItem(cartId: string, productId: string) {
        return cds.run(
            SELECT.one.from('shopify.CartItem').where({
                cart_ID: cartId,
                product_ID: productId
            })
        );
    }

    async findCartItems(cartId: string) {
        return cds.run(
            SELECT.from('shopify.CartItem').where({ cart_ID: cartId })
        );
    }

    async createCartItem(data: {
        cart_ID: string;
        product_ID: string;
        quantity: number;
    }) {
        await cds.run(
            INSERT.into('shopify.CartItem').entries(data)
        );
    }

    async updateCartItemQuantity(id: string, quantity: number) {
        await cds.run(
            UPDATE('shopify.CartItem').set({ quantity }).where({ ID: id })
        );
    }

    async deleteCartItem(id: string) {
        await cds.run(
            DELETE.from('shopify.CartItem').where({ ID: id })
        );
    }

    async getCartWithItems(cartId: string) {
        const cart = await this.findCartById(cartId);
        if (!cart) {
            return null;
        }

        const items = await this.findCartItems(cartId);

        return {
            ...cart,
            items
        };
    }
}
