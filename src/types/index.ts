// src/types/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CarouselImage {
  url: string;
  title: string;
  subtitle: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "error" | "success";
  fullWidth?: boolean;
  className?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  shadow?: string;
  rounded?: string;
  hover?: boolean;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

export interface CarouselProps {
  images?: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showPlayPause?: boolean;
  className?: string;
}

export interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onClearFilters: () => void;
  className?: string;
}

export interface ProductTableProps {
  products: Product[];
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  loading?: boolean;
  className?: string;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onUpdate?: (productData: Partial<Product>) => void;
  showUpdateForm?: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  signup: (userData: SignupData) => Promise<AuthResult>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categoryFilter: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  searchProducts: (term: string) => void;
  filterByCategory: (category: string) => void;
  sortProducts: (field: string, order?: "asc" | "desc") => void;
  clearFilters: () => void;
  getProductById: (id: number) => Product | undefined;
  fetchProducts: () => void;
  updateProduct: (
    id: number,
    productData: Partial<Product>
  ) => Promise<ApiResult<Product>>;
  deleteProduct: (id: number) => Promise<ApiResult<Product>>;
  createProduct: (productData: Partial<Product>) => Promise<ApiResult<Product>>;
  totalProducts: number;
  filteredCount: number;
  hasProducts: boolean;
  hasFilteredProducts: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PageProps {
  onNavigate: (page: string) => void;
}

export interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color?: string;
  bgColor?: string;
}
