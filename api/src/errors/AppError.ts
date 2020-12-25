class AppError {
  public readonly message: string;

  public readonly type:
    | 'request_error'
    | 'permission_error'
    | 'auth_error'
    | 'server_error';

  public readonly statusCode: number;

  constructor(
    message: string,
    type:
      | 'request_error'
      | 'permission_error'
      | 'auth_error'
      | 'server_error' = 'request_error',
    statusCode = 400,
  ) {
    this.message = message;
    this.type = type || 'request_error';
    this.statusCode = statusCode;
  }
}

export default AppError;
