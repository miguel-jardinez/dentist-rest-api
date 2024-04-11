export class ResponseApi<T> {
  constructor(
    public data: T,
    public success: boolean,
    public date: string,
    public message?: string,
  ) {}
}
