export default class Session {
  constructor(user, maxProducts = 9) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.jwt = user.token;
    this.maxProducts = maxProducts;
    if (this.maxProducts <= 0 || this.maxProducts === '') {
      this.maxProducts = 9;
    }
  }
}
