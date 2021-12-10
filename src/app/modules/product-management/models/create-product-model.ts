import { CategoryModel } from './category-model';
import { ProductDescriptionModel } from './product-description-model';

export class CreateProductModel {
    id: string;
    name: string;
    longDescription: string;
    categoryId: string;
    category: CategoryModel;
    descriptionLines: Array<ProductDescriptionModel>;
    creationDate: Date;
}
