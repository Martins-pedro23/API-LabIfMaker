import mongoose from "mongoose";

export class Admin {
  public readonly id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  constructor(props: Omit<Admin, "id">, id?: number) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}