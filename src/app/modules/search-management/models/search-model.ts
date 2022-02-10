export class SearchModel {
    barcode: string;
    measurement: string;
    unitPrice: string;
    weight: string;
    name: string;
    investorName: string;
    investorRefId: string;

    public setValue(name, weight, barcode, unitPrice, measurement, investorName, investorRefId) {
        this.name = name;
        this.weight = weight;
        this.barcode = barcode;
        this.unitPrice = unitPrice;
        this.measurement = measurement;
        this.investorName = investorName;
        this.investorRefId = investorRefId;
    }
}