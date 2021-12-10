import { CategoryModel } from './category-model';
import { ProductDescriptionModel } from './product-description-model';

export class ProductModel {
    id: string;
    name: string;
    longDescription: string;
    categoryId: string;
    category: CategoryModel;
    descriptionLines: Array<ProductDescriptionModel>;
    creationDate: Date;
    modifiedDate: Date;
}
