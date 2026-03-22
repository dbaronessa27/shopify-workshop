import cds from '@sap/cds';

export class ProductRepository {
    async findById(productId: string) {
        return cds.run(
            SELECT.one.from('shopify.Product').where({ ID: productId })
        );
    }
}
