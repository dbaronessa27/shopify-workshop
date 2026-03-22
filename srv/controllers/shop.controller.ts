import cds from '@sap/cds';
import { BaseController } from '../common';
import { CartService } from '../services/cart.service';

export default class ShopController extends BaseController {
    private readonly cartService = new CartService();

    async init(): Promise<void> {
        this.on('ping', async (req) => this.onPing(req));
        this.on('addProductToCart', async (req) => this.onAddProductToCart(req));
        this.on('updateCartItemQuantity', async (req) => this.onUpdateCartItemQuantity(req));
        this.on('removeCartItem', async (req) => this.onRemoveCartItem(req));

        await super.init();
    }

    async onPing(req: cds.Request): Promise<string | void> {
        try {
            return 'Shopify CAP app is running 🚀';
        } catch (error) {
            this.handleError(req, error);
        }
    }

    async onAddProductToCart(req: cds.Request) {
        try {
            const { cartID, productID, quantity } = req.data as {
                cartID: string;
                productID: string;
                quantity: number;
            };

            return await this.cartService.addProductToCart(cartID, productID, quantity);
        } catch (error) {
            this.handleError(req, error);
        }
    }

    async onUpdateCartItemQuantity(req: cds.Request) {
        try {
            const { cartItemID, quantity } = req.data as {
                cartItemID: string;
                quantity: number;
            };

            return await this.cartService.updateCartItemQuantity(cartItemID, quantity);
        } catch (error) {
            this.handleError(req, error);
        }
    }

    async onRemoveCartItem(req: cds.Request) {
        try {
            const { cartItemID } = req.data as {
                cartItemID: string;
            };

            return await this.cartService.removeCartItem(cartItemID);
        } catch (error) {
            this.handleError(req, error);
        }
    }
}
