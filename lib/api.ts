import {
  ContragentsResponse,
  WarehousesResponse,
  PayBoxesResponse,
  OrganizationsResponse,
  PriceTypesResponse,
  NomenclatureResponse,
  CreateSalesPayload,
} from "./types"

const API_BASE_URL = "https://app.tablecrm.com/api/v1"

async function apiCall<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  url.searchParams.append("token", token)

  // console.log(`API Call: ${url.toString()}`)

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  // console.log(`API Response status: ${response.status} ${response.statusText}`)

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`API Error response: ${errorText}`)
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorText}`
    )
  }

  const data = await response.json()
  // console.log(`API Response data:`, data)
  return data
}

export async function getContragents(
  token: string,
  phone?: string
): Promise<ContragentsResponse> {
  let endpoint = "/contragents/"
  if (phone) {
    endpoint += `?phone=${encodeURIComponent(phone)}`
  }
  return apiCall(endpoint, token)
}

export async function getWarehouses(
  token: string
): Promise<WarehousesResponse> {
  return apiCall("/warehouses/", token)
}

export async function getPayBoxes(token: string): Promise<PayBoxesResponse> {
  return apiCall("/payboxes/", token)
}

export async function getOrganizations(
  token: string
): Promise<OrganizationsResponse> {
  return apiCall("/organizations/", token)
}

export async function getPriceTypes(
  token: string
): Promise<PriceTypesResponse> {
  return apiCall("/price_types/", token)
}

export async function getNomenclature(
  token: string,
  search?: string
): Promise<NomenclatureResponse> {
  let endpoint = "/nomenclature/"
  if (search) {
    endpoint += `?name=${encodeURIComponent(search)}`
  }
  return apiCall(endpoint, token)
}

export async function createSale(
  token: string,
  payload: CreateSalesPayload,
  process: boolean = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const endpoint = process ? "/sales/?process=true" : "/sales/"
  return apiCall(endpoint, token, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
