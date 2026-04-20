/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const organizations = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

const accounts = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

const warehouses = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

const priceTypes = [
  { label: "Рубль", value: "rub" },
  { label: "Доллар США", value: "usd" },
  { label: "Юань", value: "cny" },
] as const

const formSchema = z.object({
  organization: z.string(),
  account: z.string(),
  warehouse: z.string(),
  priceType: z.string(),
})

export function SaleForm() {
  const form = useForm({
    defaultValues: {
      organization: "",
      account: "",
      warehouse: "",
      priceType: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <form
      id="org"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-3"
    >
      {/* ORGANIZATIONS */}
      <FieldGroup>
        <form.Field
          name="organization"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="w-fit">
                <FieldContent>
                  <FieldLabel htmlFor="organization-id">Организация</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id="organization-id"
                    aria-invalid={isInvalid}
                    className="min-w-fit"
                  >
                    <SelectValue placeholder="Выберите организацию" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {organizations.map((org) => (
                      <SelectItem key={org.value} value={org.value}>
                        {org.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )
          }}
        />
      </FieldGroup>

      {/* ACCOUNT */}
      <FieldGroup>
        <form.Field
          name="account"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="w-fit">
                <FieldContent>
                  <FieldLabel htmlFor="account-id">Счёт</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id="account-id"
                    aria-invalid={isInvalid}
                    className="min-w-fit"
                  >
                    <SelectValue placeholder="Выберите счёт" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {accounts.map((acc) => (
                      <SelectItem key={acc.value} value={acc.value}>
                        {acc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )
          }}
        />
      </FieldGroup>

      {/* WAREHOUSE */}
      <FieldGroup>
        <form.Field
          name="warehouse"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="w-fit">
                <FieldContent>
                  <FieldLabel htmlFor="warehouse-id">Склад</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id="warehouse-id"
                    aria-invalid={isInvalid}
                    className="min-w-fit"
                  >
                    <SelectValue placeholder="Выберите склад" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {warehouses.map((wh) => (
                      <SelectItem key={wh.value} value={wh.value}>
                        {wh.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )
          }}
        />
      </FieldGroup>

      {/* PRICE TYPE */}
      <FieldGroup>
        <form.Field
          name="priceType"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="w-fit">
                <FieldContent>
                  <FieldLabel htmlFor="priceType-id">Тип цены</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id="priceType-id"
                    aria-invalid={isInvalid}
                    className="min-w-fit"
                  >
                    <SelectValue placeholder="Выберите тип цены" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {priceTypes.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )
          }}
        />
      </FieldGroup>
    </form>
  )
}
