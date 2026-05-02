//1

export interface Inventory{
    inventoryId : string;
    productVariantId: string;
    availableQty: number;
    reservedQty : number;
    updatedAt : Date
}

export interface ReserveStockInput {
    productVariantId : string;
    quantity : number
}