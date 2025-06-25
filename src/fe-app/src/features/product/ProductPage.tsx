import { useNavigate } from 'react-router-dom';
import { fetchMe, type User } from '../../api/users/meApi';
import { listProducts, createProduct, deleteProduct, updateProduct } from '../../api/product/productApi';
import { removeAuthToken } from '../../api/auth/loginApi';
import { useEffect, useState } from 'react';
import { getAuthToken } from '../../api/auth/loginApi';
import ProductList from '../../components/product/ProductList';
import ProductForm from '../../components/product/ProductForm';

type Product = {
  id: string;
  sku: string;
  brand: string;
  category: string | null;
  name: string;
  description: string;
};

function ProductPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    brand: '',
    category: '',
    name: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    setLoading(true);
    listProducts(page, limit)
      .then(res => {
        setProducts(res.data);
        setTotal(res.total);
        setError(null);
      })
      .catch(err => {
        if (err && err.status === 401) {
          navigate('/');
        } else {
          setError(err.message || 'Failed to fetch products');
          setProducts([]);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate, page]);

  console.log(products);

  const handleSignOut = () => {
    removeAuthToken();
    navigate('/auth');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      sku: product.sku,
      brand: product.brand,
      category: product.category || '',
      name: product.name,
      description: product.description,
    });
    setFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
      } else {
        await createProduct(formData);
      }
      setFormOpen(false);
      setEditingId(null);
      setFormData({ sku: '', brand: '', category: '', name: '', description: '' });
      setLoading(true);
      listProducts(page, limit)
        .then(res => {
          setProducts(res.data);
          setTotal(res.total);
          setError(null);
        })
        .catch(err => {
          if (err && err.status === 401) {
            navigate('/');
          } else {
            setError(err.message || 'Failed to fetch products');
            setProducts([]);
          }
        })
        .finally(() => setLoading(false));
    } catch (err: any) {
      if (err && err.status === 401) {
        navigate('/');
      } else {
        setError(err.message || 'Failed to save product');
      }
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData({ sku: '', brand: '', category: '', name: '', description: '' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setLoading(true);
      listProducts(page, limit)
        .then(res => {
          setProducts(res.data);
          setTotal(res.total);
          setError(null);
        })
        .catch(err => {
          if (err && err.status === 401) {
            navigate('/');
          } else {
            console.log(err);
            setError(err.message || 'Failed to fetch products');
            setProducts([]);
          }
        })
        .finally(() => setLoading(false));
    } catch (err: any) {
      if (err && err.status === 401) {
        navigate('/');
      } else {
        console.log(err);
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl text-gray-900 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Product Page</h1>
          <div className="text-right">
            <p className="text-gray-600">
              Welcome, {user ? [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(' ') : '...'}
            </p>
            <a
              href="/auth"
              onClick={e => {
                e.preventDefault();
                handleSignOut();
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Sign Out
            </a>
          </div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="text-center text-gray-500">No products found.</div>
            ) : (
              <ProductList
                products={products}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
            <div className="flex justify-center mt-6 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-3 py-1">Page {page} of {Math.ceil(total / limit) || 1}</span>
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / limit)}
              >
                Next
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={() => setFormOpen(true)}
              >
                Create Product
              </button>
            </div>
          </div>
        )}
        <ProductForm
          formOpen={formOpen}
          editingId={editingId}
          formData={formData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          closeForm={closeForm}
        />
      </div>
    </div>
  );
}

export default ProductPage;