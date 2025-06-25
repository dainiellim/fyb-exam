import React from 'react';

// Assuming Product type is defined in a shared types file or passed down
interface Product {
    id: string;
    sku: string;
    brand: string;
    category: string | null;
    name: string;
    description: string;
}

type FormData = Omit<Product, 'id'>;

interface ProductFormProps {
    formOpen: boolean;
    editingId: string | null;
    formData: FormData;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
    closeForm: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
    formOpen,
    editingId,
    formData,
    handleFormChange,
    handleFormSubmit,
    closeForm,
}) => {
    if (!formOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
        >
            <form
                onSubmit={handleFormSubmit}
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4 text-center">{editingId === null ? 'Add Product' : 'Edit Product'}</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button
                        type="button"
                        onClick={closeForm}
                        className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm; 