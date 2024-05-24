import User from "../models/User";
import UserRepository from "../repositories/UserRepository";

class UserService {
  public constructor(public readonly repository: UserRepository) {}

  public async getPerfilById(idUser: string) {
    try {
      const user = await this.repository.findById(idUser);
      return user;
    } catch (error) {
      console.error({ msg: error });
    }
  }

  public async setChange(userChanged: User) {
    try {
      const response = await this.repository.updateEntity(userChanged);
      return response;
    } catch (error) {
      console.error({ msg: error });
    }
  }

  public async deleteUser(idUser: string) {
    try {
      const response = await this.repository.deleteById(idUser);
      return response;
    } catch (error) {
      console.error({ msg: error });
    }
  }
}

export default UserService;
