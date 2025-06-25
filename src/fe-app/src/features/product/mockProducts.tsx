export interface Product {
    id: string;
    sku: string;
    brand: string;
    category: string | null;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1', sku: '123', brand: 'nestle', category: 'beverage', name: 'nescafe', description: 'coffee nescafe',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '2', sku: '456', brand: 'coca-cola', category: 'beverage', name: 'coke', description: 'soft drink',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '3', sku: '789', brand: 'pepsi', category: 'beverage', name: 'pepsi', description: 'soft drink',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '4', sku: '321', brand: 'unilever', category: 'food', name: 'lipton', description: 'tea',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '5', sku: '654', brand: 'nestle', category: 'food', name: 'maggi', description: 'noodles',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '6', sku: '987', brand: 'cadbury', category: 'confectionery', name: 'dairy milk', description: 'chocolate',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '7', sku: '111', brand: 'lays', category: 'snacks', name: 'lays classic', description: 'potato chips',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '8', sku: '222', brand: 'pringles', category: 'snacks', name: 'pringles original', description: 'potato crisps',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '9', sku: '333', brand: 'nestle', category: 'dairy', name: 'milkmaid', description: 'condensed milk',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '10', sku: '444', brand: 'amul', category: 'dairy', name: 'butter', description: 'dairy butter',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '11', sku: '555', brand: 'parle', category: 'biscuits', name: 'parle-g', description: 'biscuits',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '12', sku: '666', brand: 'britannia', category: 'biscuits', name: 'good day', description: 'biscuits',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '13', sku: '777', brand: 'nestle', category: 'beverage', name: 'milo', description: 'chocolate drink',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    },
    {
        id: '14', sku: '888', brand: 'nestle', category: 'beverage', name: 'nesquik', description: 'chocolate milk',
        created_at: '2025-06-23T14:56:40.380Z', updated_at: '2025-06-23T14:56:40.380Z', deleted_at: null
    }
]; 