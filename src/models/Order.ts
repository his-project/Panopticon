import {Model} from 'sequelize';

export interface OrderAttribute {
  productId: string;
  time: number;
  amount: number;
  pricePerUnit: number;
  orders: number;
}

export class BuyOrderModel
  extends Model<OrderAttribute>
  implements OrderAttribute {
  public productId!: string;
  public time!: number;
  public amount!: number;
  public pricePerUnit!: number;
  public orders!: number;
}

export class SellOrderModel
  extends Model<OrderAttribute>
  implements OrderAttribute {
  public productId!: string;
  public time!: number;
  public amount!: number;
  public pricePerUnit!: number;
  public orders!: number;
}
