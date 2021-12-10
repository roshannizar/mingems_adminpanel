export class SliderModel {
    id: string;
    name: string;
    imageUrl: string;
    productId: string;
    products: SliderProductModel;
}

export class SliderProductModel {
    id: string;
    name: string;
}