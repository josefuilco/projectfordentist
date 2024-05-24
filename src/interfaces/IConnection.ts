interface IConnection {
  connect(): Promise<void>;
  disconect(): Promise<void>;
  doQuery(sql: string, params: Array<any>): Promise<any>;
}

export default IConnection;
