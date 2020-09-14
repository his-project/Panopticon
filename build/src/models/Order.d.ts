import { Model } from 'sequelize/types';
export interface OrderAttribute {
    productId: string;
    time: number;
    amount: number;
    pricePerUnit: number;
    orders: number;
}
export declare class BuyOrderModel extends Model<OrderAttribute> implements OrderAttribute {
    productId: string;
    time: number;
    amount: number;
    pricePerUnit: number;
    orders: number;
}
export declare class SellOrderModel extends Model<OrderAttribute> implements OrderAttribute {
    productId: string;
    time: number;
    amount: number;
    pricePerUnit: number;
    orders: number;
}
