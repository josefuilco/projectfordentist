import mysql, { FieldPacket, QueryResult } from "mysql2/promise";
import IConnection from "../interfaces/IConnection";

class MysqlConnection implements IConnection {
  private static _instance: MysqlConnection | null = null;
  private _connection: mysql.Connection | null = null;

  private constructor() {}

  public static getInstance(): MysqlConnection {
    if (!MysqlConnection._instance) {
      return new MysqlConnection();
    }
    return MysqlConnection._instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this._connection) {
        this._connection = await mysql.createConnection({
          host: process.env.MYSQL_HOST || "localhost",
          user: process.env.MYSQL_USER || "root",
          password: process.env.MYSQL_PASSWORD || "45213010Jo",
          database: process.env.MYSQL_DATABASE || "tesisplatform",
        });
      } else {
        throw "Conexión → Ya existe una conexión.";
      }
    } catch (error) {
      console.error({ msg: error });
    }
  }

  public async disconect() {
    try {
      if (this._connection) {
        await this._connection.end();
        this._connection = null;
      } else {
        throw "Desconexión → No existe una conexión.";
      }
    } catch (error) {
      console.error({ msg: error });
    }
  }

  private getConnection() {
    try {
      if (this._connection) {
        return this._connection;
      } else {
        throw "Obtener conexión → Conexión no existente.";
      }
    } catch (error) {
      console.error({ msg: error });
      return null;
    }
  }

  public async doQuery(
    sql: string,
    params: Array<any>
  ): Promise<mysql.QueryResult | undefined> {
    try {
      const connection = await this.getConnection();
      const [QueryResult, _FieldPacket] = (await connection!.execute(
        sql,
        params
      )) as [QueryResult, FieldPacket[]];
      return QueryResult as any;
    } catch (error) {
      console.error({ msg: error });
      return undefined;
    }
  }
}

export default MysqlConnection;
