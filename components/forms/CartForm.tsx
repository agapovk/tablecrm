"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Item, ItemContent } from "../ui/item"
import { useStore } from "@/lib/store"

export function CartForm() {
  const { items, removeItem, updateItem } = useStore()

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value, 10) || 1
    if (quantity > 0) {
      updateItem(id, { quantity })
    }
  }

  const handlePriceChange = (id: string, value: string) => {
    const price = parseFloat(value) || 0
    if (price >= 0) {
      updateItem(id, { price })
    }
  }

  if (items.length === 0) {
    return (
      <Item variant="outline">
        <ItemContent className="py-8 text-center text-muted-foreground">
          Корзина пуста. Добавьте товары.
        </ItemContent>
      </Item>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Item key={item.id} variant="outline" size="sm">
          <ItemContent className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.nomenclature_name}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="mb-1 block font-medium">Кол-во</label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="h-8"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium">Цена</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price.toFixed(2)}
                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
                  className="h-8"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium">Сумма</label>
                <div className="flex h-8 items-center rounded-md border border-input bg-background px-3 py-2">
                  <span className="text-sm font-medium">
                    {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
