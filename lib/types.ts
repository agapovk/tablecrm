// API Types
export interface Organization {
  id: number
  type: string
  short_name: string
  full_name: string
  work_name: string
  prefix: string
  inn: number
  kpp: number
  okved: number
  okved2: number
  okpo: number
  ogrn: number | null
  org_type: string
  tax_type: string
  tax_percent: number
  registration_date: number
  updated_at: number
  created_at: number
}

export interface Warehouse {
  id: number
  name: string
  type: string | null
  description: string
  address: string | null
  phone: string | null
  parent: string | null
  is_public: boolean
  status: boolean
  updated_at: number
  created_at: number
  longitude: number | null
  latitude: number | null
  qr_hash: string | null
  qr_url: string | null
}

export interface PayBox {
  id: number
  external_id: number | null
  name: string
  start_balance: number
  balance: number
  balance_date: number
  created_at: number
  update_start_balance: number
  update_start_balance_date: number
  organization_id: number | null
  updated_at: number
  deleted_at: number | null
}

export interface PriceType {
  id: number
  name: string
  tags: string[]
  updated_at: number
  created_at: number
}

export interface Nomenclature {
  id: number | string
  name: string
  type: string
  description_short?: string
  description_long?: string
  code?: string
  unit?: number
  category?: number
  manufacturer?: number
  global_category_id?: number
  chatting_percent?: number
  cashback_type?: string
  cashback_value?: number
  external_id?: string
  tags?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  production_time_min_from?: number
  production_time_min_to?: number
  address?: string
  latitude?: number
  longitude?: number
  video_link?: string
  unit_name?: string
  barcodes?: string[]
  prices?: Array<{
    price: number
    price_type: string
  }>
  balances?: Array<{
    warehouse_name: string
    current_amount: number
  }>
  attributes?: Array<{
    id: number
    attribute_id: number
    name: string
    alias: string
    value: string
  }>
  photos?: Array<Record<string, unknown>>
  videos?: Array<{
    id: number
    nomenclature_id: number
    url: string
    description: string
    tags: string[]
    created_at: string
    updated_at: string
  }>
  group_id?: number
  group_name?: string
  is_main?: boolean
  qr_hash?: string
  qr_url?: string
  updated_at?: number
  created_at?: number
  price?: number
  pricetype?: string
}

export interface Contragent {
  id: string
  name: string
  phone?: string
}

// Form State Types
export interface SaleItem {
  id: string
  nomenclature_id: string
  nomenclature_name: string
  quantity: number
  price: number
}

export interface SaleState {
  token: string | null
  phone: string
  selected_contragent_id: string | null
  selected_organization_id: string | null
  selected_warehouse_id: string | null
  selected_paybox_id: string | null
  selected_pricetype_id: string | null
  items: SaleItem[]
  comment: string
}

// API Response Types
export interface ContragentsResponse {
  result: Contragent[]
  count: number
}

export interface WarehousesResponse {
  result: Warehouse[]
  count: number
}

export interface PayBoxesResponse {
  result: PayBox[]
  count: number
}

export interface OrganizationsResponse {
  result: Organization[]
  count: number
}

export interface PriceTypesResponse {
  result: PriceType[]
  count: number
}

export interface NomenclatureResponse {
  result: Nomenclature[]
  count: number
}

export interface CreateSalesPayload {
  contragent_id: string
  organization_id: string
  warehouse_id: string
  paybox_id: string
  pricetype_id: string
  items: Array<{
    nomenclature_id: string
    quantity: number
    price: number
  }>
  comment?: string
  is_draft?: boolean
}
