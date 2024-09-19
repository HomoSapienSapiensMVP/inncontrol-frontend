export class UsermessageEntity {

  id: string;
  name: string

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getId() {
    return Number(this.id);
  }

  concatName() {
    return this.name;
  }

}
