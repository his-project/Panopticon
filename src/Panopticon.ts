import {DataTypes, Sequelize} from 'sequelize';
import * as request from 'request-promise';
import {ProductDataModel} from './models/ProductData';
import {BuyOrderModel, SellOrderModel} from './models/Order';
import JsonResponse, {Order} from './JsonResponse';

/**
 * Represents the database storing bazaar product data.
 * Will create new database if it does not exist.
 * Will alter exisitng database if not formated correctly
 */
export default class Panopticon {
  sequelize: Sequelize;
  private PRODUCT_DATA_MODEL = 'ProductDataModel';
  private BUY_ORDER_MODEL = 'BuyOrderModel';
  private SELL_ORDER_MODEL = 'SellOrderModel';
  private BAZAAR_URI = 'https://api.hypixel.net/skyblock/bazaar';
  private synced: boolean;

  constructor(path: string) {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: path,
      logging: false,
    });

    this.sequelize = sequelize;
    ProductDataModel.init(
      {
        productId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        time: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        sellPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        sellVolume: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sellMovingWeek: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sellOrders: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        buyPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        buyVolume: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        buyMovingWeek: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        buyOrders: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'ProductData',
        timestamps: false,
      }
    );
    BuyOrderModel.init(
      {
        productId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        time: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pricePerUnit: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        orders: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {sequelize, tableName: 'BuyOrders', timestamps: false}
    );
    SellOrderModel.init(
      {
        productId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        time: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pricePerUnit: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        orders: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {sequelize, tableName: 'SellOrders', timestamps: false}
    );
    this.removeId();
    this.synced = false;
  }

  /**
   * Syncs models
   */
  private async sync() {
    this.removeId();
    await this.sequelize.sync({alter: true});
  }

  /**
   * Remove ID column from each model
   */
  private removeId() {
    this.sequelize.models[this.PRODUCT_DATA_MODEL].removeAttribute('id');
    this.sequelize.models[this.SELL_ORDER_MODEL].removeAttribute('id');
    this.sequelize.models[this.BUY_ORDER_MODEL].removeAttribute('id');
  }

  /**
   * Pushes current bazaar product data to database
   */
  async pushCurrentData() {
    if (!this.synced) {
      await this.sync();
    }
    const productDataModel = this.sequelize.models[this.PRODUCT_DATA_MODEL];
    const sellOrderModel = this.sequelize.models[this.SELL_ORDER_MODEL];
    const buyOrderModel = this.sequelize.models[this.BUY_ORDER_MODEL];

    await this.getBazzarData()
      .then(data => {
        Object.keys(data.products).forEach(async id => {
          const product = data.products[id];
          const sellOrders: Order[] = data.products[id].sell_summary;
          const buyOrders: Order[] = data.products[id].sell_summary;

          sellOrders.forEach(async order => {
            await sellOrderModel
              .create({
                productId: product.product_id,
                time: data.lastUpdated,
                amount: order.amount,
                pricePerUnit: order.pricePerUnit,
                orders: order.orders,
              })
              .catch(err => {
                console.error(err);
              });
          });

          buyOrders.forEach(async order => {
            await buyOrderModel
              .create({
                productId: product.product_id,
                time: data.lastUpdated,
                amount: order.amount,
                pricePerUnit: order.pricePerUnit,
                orders: order.orders,
              })
              .catch(err => {
                console.error(err);
              });
          });

          await productDataModel
            .create({
              productId: product.product_id,
              time: data.lastUpdated,
              sellPrice: product.quick_status.sellPrice,
              sellVolume: product.quick_status.sellVolume,
              sellMovingWeek: product.quick_status.sellMovingWeek,
              sellOrders: product.quick_status.sellOrders,
              buyPrice: product.quick_status.buyPrice,
              buyVolume: product.quick_status.buyVolume,
              buyMovingWeek: product.quick_status.buyMovingWeek,
              buyOrders: product.quick_status.buyOrders,
            })
            .catch(err => {
              console.error(err);
            });
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Returns current bazaar product data
   */
  private async getBazzarData(): Promise<JsonResponse> {
    return request(this.BAZAAR_URI, {json: true})
      .then(res => {
        const data: JsonResponse = res;
        return data;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }
}
