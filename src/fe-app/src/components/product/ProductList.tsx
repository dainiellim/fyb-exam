import React from 'react';

interface Product {
    id: string;
    sku: string;
    brand: string;
    category: string | null;
    name: string;
    description: string;
}

interface ProductListProps {
    products: Product[];
    handleEdit: (product: Product) => void;
    handleDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, handleEdit, handleDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">SKU</th>
                        <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Brand</th>
                        <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="w-4/12 text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                        <th className="w-2/12 text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="w-1/12 py-3 px-4">{product.sku}</td>
                            <td className="w-1/12 py-3 px-4">{product.brand}</td>
                            <td className="w-2/12 py-3 px-4">{product.name}</td>
                            <td className="w-4/12 py-3 px-4">{product.description}</td>
                            <td className="w-2/12 py-3 px-4 text-center">
                                <div className="flex justify-center items-center">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md mx-1 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md mx-1 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList; 