export class CustomResponse<Type> {
  constructor(public result: Result, public data?: Type) {}
}

export interface Result {
    code: string;
    message: string;
}
