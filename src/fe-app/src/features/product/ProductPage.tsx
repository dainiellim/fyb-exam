import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMe, type User } from '../../api/users/meApi';
import { removeAuthToken } from '../../api/auth';
import type { ApiError } from '../../api/ApiError';
import ProductList from '../../components/product/ProductList';
import ProductForm from '../../components/product/ProductForm';
import { MOCK_PRODUCTS, type Product } from './mockProducts';

interface PageState {
    products: Product[];
    formOpen: boolean;
    editingId: string | null;
    formData: Omit<Product, 'id'>;
    page: number;
    total: number;
    loading: boolean;
    user: User | null;
}

type PageAction =
    | { type: 'LOAD_DATA_START' }
    | { type: 'LOAD_DATA_SUCCESS'; payload: { products: Product[]; total: number; user: User } }
    | { type: 'LOAD_DATA_FAILURE'; payload: ApiError | any }
    | { type: 'OPEN_FORM'; payload?: Product }
    | { type: 'CLOSE_FORM' }
    | { type: 'UPDATE_FORM_DATA'; payload: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> }
    | { type: 'SUBMIT_FORM_SUCCESS'; payload: Product[] }
    | { type: 'DELETE_PRODUCT_SUCCESS'; payload: Product[] }
    | { type: 'SET_PAGE'; payload: number };

const emptyProduct: Omit<Product, 'id'> = {
    sku: '',
    brand: '',
    category: '',
    name: '',
    description: '',
};

const initialState: PageState = {
    products: [],
    formOpen: false,
    editingId: null,
    formData: emptyProduct,
    page: 1,
    total: 0,
    loading: true,
    user: null,
};

const pageReducer = (state: PageState, action: PageAction): PageState => {
    switch (action.type) {
        case 'LOAD_DATA_START':
            return { ...state, loading: true };
        case 'LOAD_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                products: action.payload.products,
                total: action.payload.total,
            };
        case 'LOAD_DATA_FAILURE':
            return { ...state, loading: false };
        case 'OPEN_FORM':
            return {
                ...state,
                formOpen: true,
                editingId: action.payload?.id || null,
                formData: action.payload
                    ? {
                        sku: action.payload.sku,
                        brand: action.payload.brand,
                        category: action.payload.category || '',
                        name: action.payload.name,
                        description: action.payload.description,
                    }
                    : emptyProduct,
            };
        case 'CLOSE_FORM':
            return { ...state, formOpen: false, editingId: null, formData: emptyProduct };
        case 'UPDATE_FORM_DATA':
            return { ...state, formData: { ...state.formData, [action.payload.target.name]: action.payload.target.value } };
        case 'SUBMIT_FORM_SUCCESS':
            return { ...state, products: action.payload, total: action.payload.length, formOpen: false, editingId: null, formData: emptyProduct };
        case 'DELETE_PRODUCT_SUCCESS':
            return { ...state, products: action.payload, total: state.total - 1 };
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

const ITEMS_PER_PAGE = 10;

const ProductPage: React.FC = () => {
    const [state, dispatch] = useReducer(pageReducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        const getPageData = async () => {
            dispatch({ type: 'LOAD_DATA_START' });

            // This is a mock API call
            const fetchProducts = (page: number) => new Promise<{ data: Product[], total: number }>((resolve) => {
                setTimeout(() => {
                    const start = (page - 1) * ITEMS_PER_PAGE;
                    const end = start + ITEMS_PER_PAGE;
                    resolve({
                        data: MOCK_PRODUCTS.slice(start, end),
                        total: MOCK_PRODUCTS.length,
                    });
                }, 400);
            });

            try {
                const [user, productData] = await Promise.all([fetchMe(), fetchProducts(state.page)]);
                dispatch({ type: 'LOAD_DATA_SUCCESS', payload: { user, products: productData.data, total: productData.total } });
            } catch (error: ApiError | any) {
                console.error("Failed to load page data:", error);
                if (error.status === 401) {
                    navigate('/');
                }
                dispatch({ type: 'LOAD_DATA_FAILURE', payload: error });
            }
        };

        getPageData();
    }, [state.page, navigate]);

    const handleEdit = (product: Product) => dispatch({ type: 'OPEN_FORM', payload: product });
    const closeForm = () => dispatch({ type: 'CLOSE_FORM' });
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'UPDATE_FORM_DATA', payload: e });

    const handleDelete = (id: string) => {
        // In a real app, you would make an API call to delete the product
        const updatedProducts = state.products.filter(product => product.id !== id);
        dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: updatedProducts });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would make an API call to create/update the product
        let updatedProducts: Product[];
        if (state.editingId === null) {
            const newProduct: Product = { id: Math.random().toString(36).slice(2), ...state.formData };
            updatedProducts = [newProduct, ...state.products];
        } else {
            updatedProducts = state.products.map(p => p.id === state.editingId ? { id: state.editingId, ...state.formData } : p);
        }
        dispatch({ type: 'SUBMIT_FORM_SUCCESS', payload: updatedProducts });
    };

    const handleSignOut = () => {
        removeAuthToken();
        navigate('/auth');
    };

    const formatUserName = (user: User | null) => {
        if (!user) return '';
        return [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(' ');
    };

    const totalPages = Math.ceil(state.total / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl text-gray-900 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold">Product List</h1>
                    <div className="text-right">
                        <p className="text-gray-600">
                            Welcome, {state.loading ? '...' : formatUserName(state.user)}
                        </p>
                        <a href="/auth" onClick={(e) => { e.preventDefault(); handleSignOut(); }} className="text-sm text-gray-800">
                            Sign Out
                        </a>
                    </div>
                </div>

                {state.loading ? (
                    <div className="text-center py-8 text-gray-400">Loading...</div>
                ) : (
                    <ProductList
                        products={state.products}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}

                <div className="flex justify-between items-center mt-6">
                    <button onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page - 1 })} disabled={state.page === 1} className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">
                        Previous
                    </button>
                    <span className="text-gray-700">Page {state.page} of {totalPages}</span>
                    <button onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page + 1 })} disabled={state.page === totalPages || state.products.length < ITEMS_PER_PAGE} className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">
                        Next
                    </button>
                </div>

                <button onClick={() => dispatch({ type: 'OPEN_FORM' })} className="w-full mt-8 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300">
                    Add Product
                </button>

                <ProductForm
                    formOpen={state.formOpen}
                    editingId={state.editingId}
                    formData={state.formData}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                    closeForm={closeForm}
                />
            </div>
        </div>
    );
};

export default ProductPage; 