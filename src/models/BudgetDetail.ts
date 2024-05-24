import { randomUUID } from "crypto";
import ActivityDetails from "./ActivityDetails";

class BudgetDetail {
  public IdBudget: string = randomUUID();
  public ActivityName: string = "none";
  public ActivityDetails: ActivityDetails[] = [];
  public constructor() {}
}

export default BudgetDetail;
