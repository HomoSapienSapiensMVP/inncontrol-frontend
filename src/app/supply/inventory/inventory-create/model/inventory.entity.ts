export class Inventory {


  id: number;
  productTitle: string;
  productDescription: string;
  Brand: string;
  Quantity: number;



  constructor(id: number, name: string, description: string,  Brand: string,  Quantity: number) {
    this.id = id;
    this.productTitle = name;
    this.productDescription = description;
    this.Brand = Brand;
    this.Quantity = Quantity;
  }
  getInventoryById(inventories: Inventory[], inventoryId: number): Inventory | undefined {
    return inventories.find(inventory => inventory.id === inventoryId);
  }

}


