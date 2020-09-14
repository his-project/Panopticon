"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypixelDatabase = void 0;
const sequelize_1 = require("sequelize");
const request = require("request-promise");
const ProductData_1 = require("./models/ProductData");
const Order_1 = require("./models/Order");
class HypixelDatabase {
    constructor(path) {
        this.PRODUCT_DATA_TABLE = 'ProductData';
        this.BUY_ORDER_TABLE = 'BuyOrders';
        this.SELL_ORDER_TABLE = 'SellOrders';
        const sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: path,
        });
        this.sequelize = sequelize;
        ProductData_1.ProductDataModel.init({
            productId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            time: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
            },
            sellPrice: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            sellVolume: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            sellMovingWeek: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            sellOrders: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            buyPrice: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            buyVolume: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            buyMovingWeek: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            buyOrders: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: this.PRODUCT_DATA_TABLE,
        });
        Order_1.BuyOrderModel.init({
            productId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            time: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            pricePerUnit: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            orders: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, { sequelize, tableName: this.BUY_ORDER_TABLE });
        Order_1.SellOrderModel.init({
            productId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            time: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            pricePerUnit: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            orders: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, { sequelize, tableName: this.SELL_ORDER_TABLE });
        this.synced = false;
    }
    async sync() {
        await this.sequelize.sync({ alter: true });
    }
    async pushCurrentData() {
        if (!this.synced) {
            await this.sync();
        }
        // const ProductDataTable = this.sequelize.models[this.PRODUCT_DATA_TABLE];
        // ProductDataModel.bulkCreate()
    }
    getBazzarData() {
        request.get('https://api.hypixel.net/skyblock/bazaar', (_error, _response, body) => {
            const data = JSON.parse(body);
            console.log(data.products);
        });
    }
}
exports.HypixelDatabase = HypixelDatabase;
// export async function addData(sequelize: Sequelize, data: JsonResponse) {
//   ProductData.create
// }
//# sourceMappingURL=database.js.map