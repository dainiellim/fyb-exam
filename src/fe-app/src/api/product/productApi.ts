import { get, post, put, del } from '../apiHandler';
import { apiError } from '../apiError';
import { getAuthToken } from '../auth/loginApi';

export interface Product {
  id: string;
  sku: string;
  category: string;
  brand: string;
  name: string;
  description: string;
}

export interface ProductCreate {
  sku: string;
  category: string;
  brand: string;
  name: string;
  description: string;
}

export interface ProductResponse {
  data: Product;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
}

const baseUrl = '/api/products';

function validateToken(): string | apiError {
  const token = getAuthToken();
  if (!token) {
    throw new apiError('No authentication token found.', 401);
  }
  return token;
}

export async function createProduct(product: ProductCreate): Promise<ProductResponse> {
  try {
    const token = validateToken();
    return await post<ProductResponse>({
      url: baseUrl,
      payload: product,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (error) {
    throw error instanceof apiError ? error : new apiError('Failed to create product', 500);
  }
}

export async function updateProduct(id: string, product: Partial<ProductCreate>): Promise<ProductResponse> {
  try {
    const token = validateToken();
    return await put<ProductResponse>({
      url: `${baseUrl}/${id}`,
      payload: product,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (error) {
    throw error instanceof apiError ? error : new apiError('Failed to update product', 500);
  }
}

export async function listProducts(page?: number, limit?: number): Promise<ProductListResponse> {
  try {
    const token = validateToken();
    const params: Record<string, any> = {};
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    return await get<ProductListResponse>({
      url: baseUrl,
      params,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (error) {
    throw error instanceof apiError ? error : new apiError('Failed to list products', 500);
  }
}

export async function showProduct(id: string): Promise<ProductResponse> {
  try {
    const token = validateToken();
    return await get<ProductResponse>({
      url: `${baseUrl}/${id}`,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (error) {
    throw error instanceof apiError ? error : new apiError('Failed to fetch product', 500);
  }
}

export async function deleteProduct(id: string): Promise<ProductResponse> {
  try {
    const token = validateToken();
    return await del<ProductResponse>({
      url: `${baseUrl}/${id}`,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error instanceof apiError ? error : new apiError('Failed to delete product', 500);
  }
} 