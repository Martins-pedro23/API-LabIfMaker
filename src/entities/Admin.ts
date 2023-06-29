import mongoose, { ObjectId } from "mongoose";

export class Admin {
  public readonly id?: ObjectId;
  public name?: string;
  public email?: string;
  public password?: string;

  constructor(props: Omit<Admin, "id">, id?: ObjectId) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
