/* eslint-disable react/no-children-prop */
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Item, ItemContent } from "../ui/item"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { getNomenclature } from "@/lib/api"
import { Nomenclature } from "@/lib/types"

const formSchema = z.object({
  products: z.string(),
})

export function ProductsForm() {
  const {
    token,
    nomenclatures,
    setNomenclatures,
    addItem,
    itemLoading,
    setItemLoading,
    items,
  } = useStore()

  const form = useForm({
    defaultValues: {
      products: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (!token) {
          toast.error("Сначала подключите кассу")
          return
        }

        if (!value.products.trim()) {
          setNomenclatures([])
          return
        }

        setItemLoading(true)
        const response = await getNomenclature(token, value.products)
        setNomenclatures(response.result || [])

        if (!response.result || response.result.length === 0) {
          toast("Товары не найдены")
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Ошибка при поиске товаров"
        toast.error(errorMessage)
      } finally {
        setItemLoading(false)
      }
    },
  })

  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredNomenclature = nomenclatures.filter(
    (product) =>
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.description_short?.toLowerCase().includes(searchQuery) ||
      product.code?.toLowerCase().includes(searchQuery)
  )

  const handleAddProduct = (product: Nomenclature) => {
    const productPrice = product.price ?? 0
    const existingItem = items.find(
      (item) => item.nomenclature_id === String(product.id)
    )

    addItem({
      nomenclature_id: String(product.id),
      nomenclature_name: product.name,
      quantity: 1,
      price: productPrice,
    })

    const message = existingItem
      ? `Количество "${product.name}" увеличено`
      : `${product.name} добавлен в корзину`
    toast.success(message)
  }

  return (
    <div className="flex flex-col gap-3">
      <form
        id="products-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="products"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const value = e.target.value
                      field.handleChange(value)
                      setSearchQuery(value.trim().toLowerCase())
                      form.handleSubmit()
                    }}
                    aria-invalid={isInvalid}
                    placeholder="Поиск товара по названию"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>

      <Item variant={"outline"}>
        <ItemContent className="flex flex-col gap-2">
          {itemLoading ? (
            <p className="text-sm text-muted-foreground">Загрузка...</p>
          ) : filteredNomenclature.length > 0 ? (
            <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
              {filteredNomenclature.map((product) => {
                const productPrice = product.price ?? 0

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {productPrice.toFixed(2)} ₽
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant={"ghost"}
                      onClick={() => handleAddProduct(product)}
                    >
                      Добавить
                    </Button>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Введите название товара для поиска
            </p>
          )}
        </ItemContent>
      </Item>
    </div>
  )
}
