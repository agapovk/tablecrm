"use client"

import { TokenForm } from "@/components/forms/TokenForm"
import { ClientForm } from "@/components/forms/ClientForm"
import { SaleForm } from "@/components/forms/SaleForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import {
  AvatarIcon,
  BackpackIcon,
  ChatBubbleIcon,
  CubeIcon,
  Link2Icon,
} from "@radix-ui/react-icons"
import { CheckCircle2, Loader2 } from "lucide-react"
import { ProductsForm } from "@/components/forms/ProductForm"
import { CommentForm } from "@/components/forms/CommentForm"
import { CartForm } from "@/components/forms/CartForm"
import { useStore } from "@/lib/store"
// import { createSale } from "@/lib/api"
import { toast } from "sonner"
import { useCallback, useState } from "react"

export default function Page() {
  const {
    token,
    organizations,
    nomenclatures,
    selected_contragent_id,
    selected_organization_id,
    selected_warehouse_id,
    selected_paybox_id,
    items,
    getTotalAmount,
  } = useStore()

  const [submitting, setSubmitting] = useState(false)

  const isConnected = !!token
  const isFormValid =
    selected_contragent_id &&
    selected_organization_id &&
    selected_warehouse_id &&
    selected_paybox_id &&
    items.length > 0

  const totalAmount = getTotalAmount()

  const handleCreateSale = useCallback(
    async (process = false) => {
      if (!isFormValid) {
        toast.error("Заполните все обязательные поля и добавьте товары")
        return
      }

      try {
        setSubmitting(true)

        const payload = [
          {
            priority: 0,
            dated: Math.floor(Date.now() / 1000),
            operation: "Заказ",
            tax_included: true,
            tax_active: true,
            goods: items.map((item) => ({
              price: item.price,
              quantity: item.quantity,
              unit: 116, // Assuming unit is constant
              discount: 10, // Assuming discount is constant
              sum_discounted: 10, // Assuming sum_discounted is constant
              nomenclature: parseInt(item.nomenclature_id, 10),
            })),
            settings: {},
            loyality_card_id: 71047, // Assuming constant
            warehouse: parseInt(selected_warehouse_id!, 10),
            contragent: parseInt(selected_contragent_id!, 10),
            paybox: parseInt(selected_paybox_id!, 10),
            organization: parseInt(selected_organization_id!, 10),
            status: process,
            paid_rubles: getTotalAmount(),
            paid_lt: 0, // Assuming constant
          },
        ]

        const response = await fetch(
          `https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        )

        if (!response.ok) {
          throw new Error("Ошибка при создании продажи")
        }

        const data = await response.json()

        const message = process
          ? "Продажа создана и проведена"
          : "Продажа создана как черновик"

        toast.success(message, {
          description: `ID: ${data.id || "неизвестен"}`,
        })
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Ошибка при создании продажи"
        toast.error(errorMessage)
      } finally {
        setSubmitting(false)
      }
    },
    [
      isFormValid,
      token,
      selected_contragent_id,
      selected_organization_id,
      selected_warehouse_id,
      selected_paybox_id,
      items,
      getTotalAmount,
    ]
  )

  return (
    <main className="min-h-dvh">
      {/* MAIN */}
      <section className="mx-auto flex w-full max-w-lg flex-col gap-3 px-3 pt-4 pb-44">
        {/* TITLE */}
        <Item variant="outline">
          <ItemHeader className="text-xs text-muted-foreground">
            TABLECRM.COM
          </ItemHeader>
          <ItemContent>
            <ItemTitle className="text-xl font-semibold">
              <h1>Мобильный заказ</h1>
            </ItemTitle>
            <ItemDescription className="text-sm">
              WebApp для создания продажи и проведения в один клик
            </ItemDescription>
          </ItemContent>
          <ItemFooter className="justify-start text-secondary-foreground">
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "✓ Касса подключена" : "Касса не подключена"}
            </Badge>
            {isConnected && (
              <>
                <span>Организаций: {organizations.length}</span>
                <span>товаров: {nomenclatures.length}</span>
              </>
            )}
          </ItemFooter>
        </Item>

        {/* CASH REGISTER */}
        <Item variant="outline">
          <ItemHeader className="flex flex-col items-start gap-2">
            <ItemTitle className="font-medium">
              <Link2Icon />
              <h3>1. Подключение кассы</h3>
            </ItemTitle>
            <ItemDescription className="text-sm">
              Введите токен и загрузите справочники
            </ItemDescription>
          </ItemHeader>
          <ItemContent>
            <TokenForm />
          </ItemContent>
        </Item>

        {/* CLIENT */}
        <Item variant="outline">
          <ItemHeader className="flex flex-col items-start gap-2">
            <ItemTitle className="font-medium">
              <AvatarIcon />
              <h3>2. Клиент</h3>
            </ItemTitle>
            <ItemDescription className="text-sm">
              Поиск клиента по телефону
            </ItemDescription>
          </ItemHeader>
          <ItemContent>
            <ClientForm />
          </ItemContent>
        </Item>

        {/* SALE OPTIONS */}
        <Item variant="outline">
          <ItemHeader className="flex flex-col items-start gap-2">
            <ItemTitle className="font-medium">
              <Link2Icon />
              <h3>3. Параметры продажи</h3>
            </ItemTitle>
            <ItemDescription className="text-sm">
              Счёт, организация, склад и тип цены
            </ItemDescription>
          </ItemHeader>
          <ItemContent>
            <SaleForm />
          </ItemContent>
        </Item>

        {/* PRODUCTS */}
        <Item variant="outline">
          <ItemHeader className="flex flex-col items-start gap-2">
            <ItemTitle className="font-medium">
              <CubeIcon />
              <h3>4. Товары</h3>
            </ItemTitle>
            <ItemDescription className="text-sm">
              Поиск и добавление номенклатуры
            </ItemDescription>
          </ItemHeader>
          <ItemContent>
            <ProductsForm />
          </ItemContent>
        </Item>

        {/* CART */}
        <Item variant="outline">
          <ItemHeader className="flex flex-col items-start gap-2">
            <ItemTitle className="font-medium">
              <BackpackIcon />
              <h3>Корзина</h3>
            </ItemTitle>
            <ItemDescription className="text-sm">
              Количество, цена и сумма по позициям
            </ItemDescription>
          </ItemHeader>
          <ItemContent>
            <CartForm />
          </ItemContent>
        </Item>

        {/* COMMENTS */}
        <Item variant="outline">
          <ItemHeader className="flex flex-col items-start gap-2">
            <ItemTitle className="font-medium">
              <ChatBubbleIcon />
              <h3>Комментарий</h3>
            </ItemTitle>
          </ItemHeader>
          <ItemContent>
            <CommentForm />
          </ItemContent>
        </Item>
      </section>

      {/* FOOTER */}
      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto w-full max-w-lg px-3 py-3">
          <div className="flex flex-col gap-2">
            <Item variant="outline" size="sm" asChild>
              <ItemContent className="flex flex-row items-center justify-between">
                <ItemTitle>Итого</ItemTitle>
                <ItemDescription>{totalAmount.toFixed(2)} ₽</ItemDescription>
              </ItemContent>
            </Item>
            <Button
              disabled={!isFormValid || submitting}
              onClick={() => handleCreateSale(false)}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Создать продажу
            </Button>
            <Button
              variant={"outline"}
              disabled={!isFormValid || submitting}
              onClick={() => handleCreateSale(true)}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <CheckCircle2 className="h-4 w-4" />
              Создать и провести
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}
