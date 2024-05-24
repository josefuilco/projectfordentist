import { randomUUID } from "crypto";

class ActivityDetails {
  public IdDetail: string = randomUUID();
  public Resources: string = "none";
  public Metrics: string = "none";
  public Amount: string = "none";
  public Cost: number = 0.0;
  public CostTotal: number = 0.0;

  public constructor() {}
}

export default ActivityDetails;
