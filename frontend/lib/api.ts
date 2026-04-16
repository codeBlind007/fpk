const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export interface ProductImageDto {
  id: number;
  product_id: number;
  image_url: string;
}

export interface ProductSpecDto {
  id: number;
  product_id: number;
  spec_key: string;
  spec_value: string;
}

export interface ProductByIdDto {
  id: number;
  name: string;
  price: string;
  stock_quantity: number;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
  images: ProductImageDto[];
  specs: ProductSpecDto[];
}

export interface ProductByIdResponse {
  success: boolean;
  product: ProductByIdDto;
}

export interface ProductListItemDto {
  id: number;
  name: string;
  price: string;
  stock_quantity: number;
  category: string;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponseDto {
  success: boolean;
  results: number;
  products: ProductListItemDto[];
}

export interface ProductListItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  success: boolean;
  results: number;
  products: ProductListItem[];
}

export interface CartListItemDto {
  id: number;
  product_id: number;
  quantity: number;
  stock_quantity?: number;
  name?: string;
  price?: string;
  image_url?: string;
}

export interface CartListResponseDto {
  success: boolean;
  results: number;
  cartItems: CartListItemDto[];
}

export interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    stock_quantity: number;
    image_url?: string;
  };
}

export interface CartListResponse {
  success: boolean;
  results: number;
  cartItems: CartItem[];
}

export interface AddToCartServiceResultDto {
  message: string;
  item?: {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
    created_at?: string;
    updated_at?: string;
  };
  alreadyInCart: boolean;
}

export interface AddToCartResponseDto {
  success: boolean;
  cartItem: AddToCartServiceResultDto;
}

export interface AddToCartResponse {
  success: boolean;
  cartItem: {
    id: string;
    product_id: string;
    quantity: number;
    message: string;
    alreadyInCart: boolean;
  };
}

export interface UpdateCartItemDto {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateCartItemResponse {
  success: boolean;
  cartItem: UpdateCartItemDto;
}

export interface RemoveCartItemResponse {
  success: boolean;
  deletedItem: UpdateCartItemDto;
}

export interface CartSummaryDto {
  total_price: string | null;
  total_items: string | null;
}

export interface CartSummaryResponseDto {
  success: boolean;
  summary: CartSummaryDto;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping_charge: number;
  total_items: number;
}

export interface CartSummaryResponse {
  success: boolean;
  summary: CartSummary;
}

export interface OrderRequestItem {
  product_id: string | number;
  quantity: number;
}

export interface OrderSummaryItemDto {
  product_id: number;
  name: string;
  price: string;
  quantity: number;
  itemTotal: number;
}

export interface OrderSummaryDto {
  items: OrderSummaryItemDto[];
  totalAmount: number;
}

export interface OrderSummaryResponseDto {
  success: boolean;
  summary: OrderSummaryDto;
}

export interface OrderSummaryItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface OrderSummary {
  items: OrderSummaryItem[];
  totalAmount: number;
}

export interface OrderSummaryResponse {
  success: boolean;
  summary: OrderSummary;
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  orderId: number;
}

export interface OrderByIdItemDto {
  product_id: number;
  quantity: number;
  price: string;
}

export interface OrderByIdDto {
  id: number;
  total_amount: string;
  shipping_address: {
    full_name: string;
    phone_number?: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  };
  created_at: string;
  items: OrderByIdItemDto[];
}

export interface OrderByIdResponseDto {
  success: boolean;
  order: OrderByIdDto;
}

export interface OrderById {
  id: string;
  status: string;
  items: Array<{
    product_id: string;
    quantity: number;
    product_name: string;
    price: number;
  }>;
  shipping_address: {
    full_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  };
  total_amount: number;
  created_at: string;
}

export interface OrderByIdResponse {
  success: boolean;
  order: OrderById;
}

export interface OrderHistoryItemDto {
  product_id: number;
  name: string;
  image_url?: string;
  quantity: number;
  price: string;
}

export interface OrderHistoryDto {
  id: number;
  total_amount: string;
  status: string | null;
  shipping_address: {
    full_name: string;
    phone_number?: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  };
  created_at: string;
  items: OrderHistoryItemDto[];
}

export interface OrderHistoryResponseDto {
  success: boolean;
  count: number;
  orders: OrderHistoryDto[];
}

export interface OrderHistoryItem {
  product_id: string;
  name: string;
  image_url?: string;
  quantity: number;
  price: number;
}

export interface OrderHistory {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: {
    full_name: string;
    phone_number?: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  };
  created_at: string;
  items: OrderHistoryItem[];
}

export interface OrderHistoryResponse {
  success: boolean;
  count: number;
  orders: OrderHistory[];
}

export interface WishlistItemDto {
  product_id: number;
  name: string;
  price: string;
  image_url?: string;
  created_at: string;
}

export interface WishlistItem {
  product_id: string;
  name: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export interface WishlistResponseDto {
  success: boolean;
  items: WishlistItemDto[];
}

export interface WishlistResponse {
  success: boolean;
  items: WishlistItem[];
}

export interface AddToWishlistResponseDto {
  success: boolean;
  message: string;
  item?: {
    user_id: string;
    product_id: number;
    created_at?: string;
  };
  alreadyExists: boolean;
}

export interface AddToWishlistResponse {
  success: boolean;
  message: string;
  item?: {
    user_id: string;
    product_id: string;
    created_at?: string;
  };
  alreadyExists: boolean;
}

export interface RemoveFromWishlistResponse {
  success: boolean;
  message: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image_url?: string;
  images: string[];
  specifications: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface ProductDetailsResponse {
  success: boolean;
  product: ProductDetails;
}

function getImageBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_IMAGE_BASE_URL) {
    return process.env.NEXT_PUBLIC_IMAGE_BASE_URL.replace(/\/$/, "");
  }

  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "";
  }
}

function resolveProductImageUrl(imageUrl?: string | null): string | undefined {
  if (!imageUrl) {
    return undefined;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const baseUrl = getImageBaseUrl();
  let normalizedImageUrl = imageUrl.trim();

  if (normalizedImageUrl.startsWith("/api/images/")) {
    normalizedImageUrl = normalizedImageUrl.replace("/api/images/", "/images/");
  } else if (normalizedImageUrl.startsWith("api/images/")) {
    normalizedImageUrl = normalizedImageUrl.replace("api/images/", "/images/");
  } else if (normalizedImageUrl.startsWith("images/")) {
    normalizedImageUrl = `/${normalizedImageUrl}`;
  } else if (
    normalizedImageUrl.startsWith("/") &&
    !normalizedImageUrl.startsWith("/images/")
  ) {
    normalizedImageUrl = `/images${normalizedImageUrl}`;
  } else if (!normalizedImageUrl.startsWith("/")) {
    normalizedImageUrl = `/images/${normalizedImageUrl}`;
  }

  if (!baseUrl) {
    return normalizedImageUrl;
  }

  return `${baseUrl}${normalizedImageUrl}`;
}

function mapProductByIdResponse(
  data: ProductByIdResponse,
): ProductDetailsResponse {
  const images =
    data.product.images
      ?.map((img) => resolveProductImageUrl(img.image_url))
      .filter((image): image is string => Boolean(image)) ?? [];

  return {
    success: data.success,
    product: {
      id: String(data.product.id),
      name: data.product.name,
      price: Number(data.product.price),
      stock: data.product.stock_quantity,
      category: data.product.category,
      description: data.product.description,
      image_url: images[0],
      images,
      specifications:
        data.product.specs?.reduce<Record<string, string>>((acc, spec) => {
          acc[spec.spec_key] = spec.spec_value;
          return acc;
        }, {}) ?? {},
      created_at: data.product.created_at,
      updated_at: data.product.updated_at,
    },
  };
}

function mapProductListResponse(
  data: ProductListResponseDto,
): ProductListResponse {
  return {
    success: data.success,
    results: data.results,
    products: data.products.map((product) => ({
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      stock: product.stock_quantity,
      category: product.category,
      description: product.description,
      image_url: resolveProductImageUrl(product.image_url),
      created_at: product.created_at,
      updated_at: product.updated_at,
    })),
  };
}

function mapCartListResponse(data: CartListResponseDto): CartListResponse {
  return {
    success: data.success,
    results: data.results,
    cartItems: data.cartItems.map((item) => ({
      id: String(item.id),
      quantity: Number(item.quantity),
      product_id: String(item.product_id),
      product: {
        id: String(item.product_id),
        name: item.name ?? "Product",
        price: Number(item.price ?? 0),
        stock_quantity: Number(item.stock_quantity ?? 0),
        image_url: resolveProductImageUrl(item.image_url),
      },
    })),
  };
}

function mapAddToCartResponse(data: AddToCartResponseDto): AddToCartResponse {
  return {
    success: data.success,
    cartItem: {
      id: String(data.cartItem.item?.id ?? ""),
      product_id: String(data.cartItem.item?.product_id ?? ""),
      quantity: Number(data.cartItem.item?.quantity ?? 0),
      message: data.cartItem.message,
      alreadyInCart: data.cartItem.alreadyInCart,
    },
  };
}

function mapCartSummaryResponse(
  data: CartSummaryResponseDto,
): CartSummaryResponse {
  const subtotal = Number(data.summary?.total_price ?? 0);
  const totalItems = Number(data.summary?.total_items ?? 0);

  return {
    success: data.success,
    summary: {
      subtotal,
      tax: 0,
      shipping_charge: 0,
      total_items: totalItems,
    },
  };
}

function mapOrderSummaryResponse(
  data: OrderSummaryResponseDto,
): OrderSummaryResponse {
  return {
    success: data.success,
    summary: {
      totalAmount: data.summary.totalAmount,
      items: data.summary.items.map((item) => ({
        product_id: String(item.product_id),
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        itemTotal: item.itemTotal,
      })),
    },
  };
}

function mapOrderByIdResponse(data: OrderByIdResponseDto): OrderByIdResponse {
  return {
    success: data.success,
    order: {
      id: String(data.order.id),
      status: "confirmed",
      items: data.order.items.map((item) => ({
        product_id: String(item.product_id),
        quantity: item.quantity,
        product_name: `Product #${item.product_id}`,
        price: Number(item.price),
      })),
      shipping_address: {
        full_name: data.order.shipping_address.full_name,
        address: data.order.shipping_address.address,
        city: data.order.shipping_address.city,
        state: data.order.shipping_address.state,
        postal_code: data.order.shipping_address.postal_code,
      },
      total_amount: Number(data.order.total_amount),
      created_at: data.order.created_at,
    },
  };
}

function mapOrderHistoryResponse(
  data: OrderHistoryResponseDto,
): OrderHistoryResponse {
  return {
    success: data.success,
    count: data.count,
    orders: data.orders.map((order) => ({
      id: String(order.id),
      total_amount: Number(order.total_amount),
      status: order.status ?? "placed",
      shipping_address: {
        full_name: order.shipping_address.full_name,
        phone_number: order.shipping_address.phone_number,
        address: order.shipping_address.address,
        city: order.shipping_address.city,
        state: order.shipping_address.state,
        postal_code: order.shipping_address.postal_code,
      },
      created_at: order.created_at,
      items: order.items.map((item) => ({
        product_id: String(item.product_id),
        name: item.name,
        image_url: resolveProductImageUrl(item.image_url),
        quantity: item.quantity,
        price: Number(item.price),
      })),
    })),
  };
}

function mapWishlistResponse(data: WishlistResponseDto): WishlistResponse {
  return {
    success: data.success,
    items: (data.items || []).map((item) => ({
      product_id: String(item.product_id),
      name: item.name,
      price: Number(item.price),
      image_url: resolveProductImageUrl(item.image_url),
      created_at: item.created_at,
    })),
  };
}

function mapAddToWishlistResponse(
  data: AddToWishlistResponseDto,
): AddToWishlistResponse {
  return {
    success: data.success,
    message: data.message,
    item: data.item
      ? {
          user_id: data.item.user_id,
          product_id: String(data.item.product_id),
          created_at: data.item.created_at,
        }
      : undefined,
    alreadyExists: data.alreadyExists,
  };
}

// Helper function to make API calls with auth and error handling
async function apiCall<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("auth_token");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Add mock userId for demo
  headers.set("X-User-Id", "user_123");

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;

      try {
        const errorBody = (await response.json()) as {
          message?: string;
          error?: string;
        };

        if (errorBody?.message) {
          errorMessage = errorBody.message;
        } else if (errorBody?.error) {
          errorMessage = errorBody.error;
        }
      } catch {
        // Ignore JSON parse failures and keep the fallback message.
      }

      throw new Error(errorMessage);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
}

// Products API
export const productsAPI = {
  getAll: async (): Promise<ProductListResponse> => {
    const data = await apiCall<ProductListResponseDto>("/products");
    return mapProductListResponse(data);
  },

  getById: async (id: string | number): Promise<ProductDetailsResponse> => {
    const data = await apiCall<ProductByIdResponse>(`/products/details/${id}`);
    return mapProductByIdResponse(data);
  },

  getDetails: (id: string | number): Promise<ProductDetailsResponse> =>
    productsAPI.getById(id),

  filterByCategory: async (category: string): Promise<ProductListResponse> => {
    const data = await apiCall<ProductListResponseDto>(
      `/products/filter?category=${encodeURIComponent(category)}`,
    );
    return mapProductListResponse(data);
  },

  search: async (name: string): Promise<ProductListResponse> => {
    const data = await apiCall<ProductListResponseDto>(
      `/products/search?name=${encodeURIComponent(name)}`,
    );
    return mapProductListResponse(data);
  },
};

// Cart API
export const cartAPI = {
  getItems: async (): Promise<CartListResponse> => {
    const data = await apiCall<CartListResponseDto>("/cart");
    return mapCartListResponse(data);
  },

  addItem: async (productId: string | number): Promise<AddToCartResponse> => {
    const data = await apiCall<AddToCartResponseDto>(`/cart/${productId}`, {
      method: "POST",
    });
    return mapAddToCartResponse(data);
  },

  updateItem: (cartId: string | number, quantity: number) =>
    apiCall<UpdateCartItemResponse>(`/cart/${cartId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  removeItem: (cartId: string | number) =>
    apiCall<RemoveCartItemResponse>(`/cart/${cartId}`, { method: "DELETE" }),

  getSummary: async (): Promise<CartSummaryResponse> => {
    const data = await apiCall<CartSummaryResponseDto>("/cart/summary");
    return mapCartSummaryResponse(data);
  },
};

// Orders API
export const ordersAPI = {
  getOrderSummary: async (
    items: OrderRequestItem[],
  ): Promise<OrderSummaryResponse> => {
    const data = await apiCall<OrderSummaryResponseDto>("/orders/summary", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
    return mapOrderSummaryResponse(data);
  },

  placeOrder: (
    items: OrderRequestItem[],
    shippingAddress: Record<string, unknown>,
  ) =>
    apiCall<PlaceOrderResponse>("/orders", {
      method: "POST",
      body: JSON.stringify({ items, shipping_address: shippingAddress }),
    }),

  getOrderById: async (id: string | number): Promise<OrderByIdResponse> => {
    const data = await apiCall<OrderByIdResponseDto>(`/orders/${id}`);
    return mapOrderByIdResponse(data);
  },

  getOrderHistory: async (): Promise<OrderHistoryResponse> => {
    const data = await apiCall<OrderHistoryResponseDto>("/orders/history");
    return mapOrderHistoryResponse(data);
  },
};

export const wishlistAPI = {
  getItems: async (): Promise<WishlistResponse> => {
    const data = await apiCall<WishlistResponseDto>("/wishlist");
    return mapWishlistResponse(data);
  },

  addItem: async (
    productId: string | number,
  ): Promise<AddToWishlistResponse> => {
    const data = await apiCall<AddToWishlistResponseDto>("/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });

    return mapAddToWishlistResponse(data);
  },

  removeItem: (productId: string | number) =>
    apiCall<RemoveFromWishlistResponse>(`/wishlist/${productId}`, {
      method: "DELETE",
    }),
};
