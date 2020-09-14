import { Model } from 'sequelize/types';
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
export declare class ProductDataModel extends Model<ProductDataAttribute> implements ProductDataAttribute {
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
