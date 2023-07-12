import { randomUUID } from "crypto";

class Instructor {
  public name: string;
  public id: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
