import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
    private readonly repo = new ProductRepository();

    async getAllProducts() {
        return this.repo.findAll();
    }
}
