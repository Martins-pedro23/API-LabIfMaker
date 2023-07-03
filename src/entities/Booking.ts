import { ObjectId } from "mongoose";

export class Booking {
  public readonly id?: string;
  public bookedDay?: Date;
  public bookedHourInit?: string;
  public bookedHourLimit?: string;
  public equipament?: ObjectId;
  public username?: string;
  public email?: string;
  public phone?: number;
  public topic?: string;
  public description?: string;

  constructor(props: Omit<Booking, "id">, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
