import { Sequelize } from 'sequelize';
export declare class HypixelDatabase {
    sequelize: Sequelize;
    private PRODUCT_DATA_TABLE;
    private BUY_ORDER_TABLE;
    private SELL_ORDER_TABLE;
    private synced;
    constructor(path: string);
    private sync;
    pushCurrentData(): Promise<void>;
    private getBazzarData;
}
