// Common utility types

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SortOption {
  value: string;
  label: string;
  order: 'asc' | 'desc';
}

export interface FilterOption {
  id: string | number;
  name: string;
  count?: number;
  selected?: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: Status;
  error: string | null;
}

