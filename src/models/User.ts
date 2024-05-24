import { randomUUID } from "crypto";

class User {
  private _id: string = randomUUID();
  private names: string;
  private surnames: string;
  private email: string;
  private password: string;

  public constructor(
    names: string,
    surnames: string,
    email: string,
    password: string
  ) {
    this.names = names;
    this.surnames = surnames;
    this.email = email;
    this.password = password;
  }

  setId(idUser: string): void {
    this._id = idUser;
  }

  getParams(): Array<string> {
    return [this._id, this.names, this.surnames, this.email, this.password];
  }

  getParamsById(): Array<string> {
    return [this.names, this.surnames, this.email, this.password, this._id];
  }

  getName(): string {
    return this.names;
  }

  getSurname(): string {
    return this.surnames;
  }
}

export default User;
