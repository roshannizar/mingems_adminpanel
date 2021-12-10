export class PromotionProductModel {
    id: string;
    name: string;
    descriptionLines: Array<PromotionProductDescriptionModel>;
}

export class PromotionProductDescriptionModel {
    id: string;
    name: string;
    mrp: number;
    quantity: number;
}