import { CategoryModel } from './category-model';
import { ProductDescriptionModel } from './product-description-model';
import {RecordStateEnum} from './record-state-enum';

export class UpdateProductModel {
    id: string;
    name: string;
    longDescription: string;
    categoryId: string;
    category: CategoryModel;
    tentativePrice: number | null;
    descriptionLines: Array<ProductDescriptionModel>;
    creationDate: Date;
    recordState: RecordStateEnum | null
}
