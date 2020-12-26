export default {
  jwt: {
    secret: process.env.AUTH_TOKEN,
    expiresIn: process.env.AUTH_EXPIRESS,
  },
};
