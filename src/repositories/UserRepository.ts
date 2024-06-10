import User from "../models/User";
import IRepository from "../interfaces/IRepository";
import IConnection from "../interfaces/IConnection";

class UserRepository implements IRepository<User> {
  public constructor(public readonly connection: IConnection) {}

  public async createContent(data: User) {
    try {
      await this.connection.connect();
      const sql =
        "INSERT INTO Users (IdUser, Names, Surnames, Email, UserPassword) VALUES (?, ?, ?, ?, ?);";
      const result = await this.connection.doQuery(sql, data.getParams());
      return result;
    } catch (error) {
      console.error({ msg: error });
    } finally {
      await this.connection.disconect();
    }
  }

  public async findByEmail(email: string) {
    try {
      await this.connection.connect();
      const sql = "SELECT IdUser, UserPassword FROM Users WHERE Email = ?;";
      const result: any = await this.connection.doQuery(sql, [email]);
      return {
        id: result[0]["IdUser"],
        password: result[0]["UserPassword"],
      };
    } catch (error) {
      console.error({ msg: error });
    } finally {
      await this.connection.disconect();
    }
  }

  public async findById(idUser: string) {
    try {
      await this.connection.connect();
      const sql =
        "SELECT Names, Surnames, Email, UserPassword FROM Users WHERE IdUser = ?;";
      const result: any = await this.connection.doQuery(sql, [idUser]);
      const user = new User(
        result[0]["Names"],
        result[0]["Surnames"],
        result[0]["Email"],
        result[0]["UserPassword"]
      );
      user.setId(idUser);
      return user;
    } catch (error) {
      console.error({ msg: error });
    } finally {
      await this.connection.disconect();
    }
  }

  public async updateEntity(userData: User) {
    try {
      await this.connection.connect();
      const sql =
        "UPDATE Users SET Names = ?, Surnames = ?, Email = ?, UserPassword = ? WHERE IdUser = ?;";
      const result = await this.connection.doQuery(
        sql,
        userData.getParamsById()
      );
      return result;
    } catch (error) {
      console.error({ msg: error });
    } finally {
      await this.connection.disconect();
    }
  }

  public async updatePasswordById(idUser: string, password: string) {
    try {
      await this.connection.connect();
      const sql = "UPDATE Users SET UserPassword = ? WHERE IdUser = ?;";
      const result = await this.connection.doQuery(sql, [password, idUser]);
      if (result) {
        return { msg: "Password → Cambio exitoso." };
      } else {
        throw "Password → Cambio no valido.";
      }
    } catch (error) {
      console.error({ msg: error });
    } finally {
      await this.connection.disconect();
    }
  }

  public async deleteById(idUser: string) {
    try {
      await this.connection.connect();
      // Eliminamos los presupuestos
      const activitiesQuery = "DELETE FROM ActivityDetails WHERE IdUser = ?;";
      const activitiesResult = await this.connection.doQuery(activitiesQuery, [
        idUser,
      ]);
      // Eliminamos los presupuestos
      const budgetQuery = "DELETE FROM BudgetDetail WHERE IdUser = ?;";
      const budgetResult = await this.connection.doQuery(budgetQuery, [idUser]);
      // Eliminamos los Detalles
      const detailQuery = "DELETE FROM ProjectDetail WHERE IdUser = ?;";
      const detailResult = await this.connection.doQuery(detailQuery, [idUser]);
      // Eliminamos el Proyecto
      const projectQuery = "DELETE FROM Projects WHERE IdUser = ?;";
      const projectResult = await this.connection.doQuery(projectQuery, [
        idUser,
      ]);
      // Eliminamos el Usuario
      const userQuery = "DELETE FROM Users WHERE IdUser = ?;";
      const userResult = await this.connection.doQuery(userQuery, [idUser]);
      // Retornamos los dos resultados
      return {
        user: userResult,
        project: projectResult,
        detail: detailResult,
        budget: budgetResult,
        activities: activitiesResult,
      };
    } catch (error) {
      console.error({ msg: error });
    } finally {
      await this.connection.disconect();
    }
  }
}

export default UserRepository;
