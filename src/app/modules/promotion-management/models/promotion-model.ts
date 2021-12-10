import { PromotionLinesModel } from "./promotion-lines-model";

export class PromotionModel {
    id: string;
    promotionLines: Array<PromotionLinesModel>;
    promotionImage: string;
    description: string;
    startDate: Date;
    endDate: Date;
}