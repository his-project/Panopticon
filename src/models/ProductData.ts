import {Model} from 'sequelize';

export interface ProductDataAttribute {
  productId: string;
  time: number;
  sellPrice: number;
  sellVolume: number;
  sellMovingWeek: number;
  sellOrders: number;
  buyPrice: number;
  buyVolume: number;
  buyMovingWeek: number;
  buyOrders: number;
}

export class ProductDataModel
  extends Model<ProductDataAttribute>
  implements ProductDataAttribute {
  public productId!: string;
  public time!: number;
  public sellPrice!: number;
  public sellVolume!: number;
  public sellMovingWeek!: number;
  public sellOrders!: number;
  public buyPrice!: number;
  public buyVolume!: number;
  public buyMovingWeek!: number;
  public buyOrders!: number;
}
