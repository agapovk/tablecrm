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
import { CheckCircle2 } from "lucide-react"
import { ProductsForm } from "@/components/forms/ProductForm"
import { CommentForm } from "@/components/forms/CommentForm"

export default function Page() {
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
          <ItemFooter>
            <Badge variant={"secondary"}>Касса не подключена</Badge>
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
          <ItemContent>Добавьте хотя бы один товар</ItemContent>
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
                <ItemDescription>0.00 ₽</ItemDescription>
              </ItemContent>
            </Item>
            <Button disabled>Создать продажу</Button>
            <Button variant={"outline"}>
              <CheckCircle2 />
              Создать и провести
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}
