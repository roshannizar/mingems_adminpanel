export class ResponseModel<T> {
    totalRecords: number;
    data = new Array<T>();
}
