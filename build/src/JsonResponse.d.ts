export default interface JsonResponse {
    success: boolean;
    lastUpdated: number;
    products: {
        [itemId: string]: Product;
    };
}
export interface Product {
    product_id: string;
    sell_summary: Order[];
    buy_summary: Order[];
    quick_status: {
        productId: string;
        sellprice: number;
        sellVolume: number;
        sellMovingWeek: number;
        sellOrders: number;
        buyPrice: number;
        buyVolume: number;
        buyMovingWeek: number;
        buyOrders: number;
    };
}
interface Order {
    amount: number;
    pricePerUnit: number;
    orders: number;
}
export {};
