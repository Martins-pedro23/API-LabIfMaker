export class Equipament {
  public readonly id?: string;
  public name!: string;
  public description!: string;
  public type!: string;
  public brand!: string;
  public software!: string;
  public extensions!: string;
  public materials!: string;
  public moreInformation!: string;
  public handbook!: Array<Equipament>;
  public image!: Array<Equipament>;

  constructor(props: Equipament, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
