interface TokenSubjet {
  id: string;
  role: 'ADMIN' | 'USER';
}

declare namespace Express {
  export interface Request {
    user: {
      subject: TokenSubjet;
    };
  }
}
