class AppError {
  public readonly message: string;

  public readonly type: string;

  public readonly statusCode: number;

  constructor(message: string, type = 'request_error', statusCode = 400) {
    this.message = message;
    this.type = type;
    this.statusCode = statusCode;
  }
}

export default AppError;
