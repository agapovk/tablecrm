import { create } from "zustand"
import {
  SaleState,
  SaleItem,
  Organization,
  Warehouse,
  PayBox,
  PriceType,
  Nomenclature,
  Contragent,
} from "./types"

interface StoreState extends SaleState {
  // Data from API
  organizations: Organization[]
  warehouses: Warehouse[]
  payboxes: PayBox[]
  pricetypes: PriceType[]
  nomenclatures: Nomenclature[]
  contragents: Contragent[]

  // Loading states
  loading: boolean
  itemLoading: boolean

  // Actions
  setToken: (token: string) => void
  setOrganizations: (organizations: Organization[]) => void
  setWarehouses: (warehouses: Warehouse[]) => void
  setPayBoxes: (payboxes: PayBox[]) => void
  setPriceTypes: (pricetypes: PriceType[]) => void
  setNomenclatures: (nomenclatures: Nomenclature[]) => void
  setContragents: (contragents: Contragent[]) => void
  setPhone: (phone: string) => void
  setSelectedContragent: (id: string | null) => void
  setSelectedOrganization: (id: string | null) => void
  setSelectedWarehouse: (id: string | null) => void
  setSelectedPayBox: (id: string | null) => void
  setSelectedPriceType: (id: string | null) => void
  addItem: (item: Omit<SaleItem, "id">) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<SaleItem>) => void
  setComment: (comment: string) => void
  setLoading: (loading: boolean) => void
  setItemLoading: (loading: boolean) => void
  reset: () => void
  getTotalAmount: () => number
  getTotalItems: () => number
}

const initialState: SaleState = {
  token: null,
  phone: "",
  selected_contragent_id: null,
  selected_organization_id: null,
  selected_warehouse_id: null,
  selected_paybox_id: null,
  selected_pricetype_id: null,
  items: [],
  comment: "",
}

export const useStore = create<StoreState>((set, get) => ({
  ...initialState,
  organizations: [],
  warehouses: [],
  payboxes: [],
  pricetypes: [],
  nomenclatures: [],
  contragents: [],
  loading: false,
  itemLoading: false,

  setToken: (token: string) => set({ token }),
  setOrganizations: (organizations: Organization[]) => {
    // console.log("Setting organizations:", organizations)
    set({ organizations })
  },
  setWarehouses: (warehouses: Warehouse[]) => {
    // console.log("Setting warehouses:", warehouses)
    set({ warehouses })
  },
  setPayBoxes: (payboxes: PayBox[]) => {
    // console.log("Setting payboxes:", payboxes)
    set({ payboxes })
  },
  setPriceTypes: (pricetypes: PriceType[]) => {
    // console.log("Setting pricetypes:", pricetypes)
    set({ pricetypes })
  },
  setNomenclatures: (nomenclatures: Nomenclature[]) => {
    // console.log("Setting nomenclatures:", nomenclatures)
    set({ nomenclatures })
  },
  setContragents: (contragents: Contragent[]) => {
    // console.log("Setting contragents:", contragents)
    set({ contragents })
  },
  setPhone: (phone: string) => set({ phone }),
  setSelectedContragent: (selected_contragent_id: string | null) =>
    set({ selected_contragent_id }),
  setSelectedOrganization: (selected_organization_id: string | null) =>
    set({ selected_organization_id }),
  setSelectedWarehouse: (selected_warehouse_id: string | null) =>
    set({ selected_warehouse_id }),
  setSelectedPayBox: (selected_paybox_id: string | null) =>
    set({ selected_paybox_id }),
  setSelectedPriceType: (selected_pricetype_id: string | null) =>
    set({ selected_pricetype_id }),

  addItem: (item: Omit<SaleItem, "id">) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.nomenclature_id === item.nomenclature_id
      )

      if (existingItem) {
        // If item already exists, increase quantity
        return {
          items: state.items.map((i) =>
            i.id === existingItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }

      // If item doesn't exist, add it with a new ID
      const id = `item-${Date.now()}-${Math.random()}`
      return {
        items: [...state.items, { ...item, id }],
      }
    })
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  updateItem: (id: string, updates: Partial<SaleItem>) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }))
  },

  setComment: (comment: string) => set({ comment }),
  setLoading: (loading: boolean) => set({ loading }),
  setItemLoading: (itemLoading: boolean) => set({ itemLoading }),

  reset: () => set(initialState),

  getTotalAmount: () => {
    const state = get()
    return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  },

  getTotalItems: () => {
    const state = get()
    return state.items.length
  },
}))
