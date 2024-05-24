interface IRepository<T> {
  createContent?(data: T): Promise<any | undefined>;
  findAll?(id: string): Promise<Array<T> | undefined>;
  findById(id: string): Promise<T | undefined>;
  updateEntity?(data: T): Promise<any | undefined>;
  deleteById(id: string): Promise<any | undefined>;
}

export default IRepository;
