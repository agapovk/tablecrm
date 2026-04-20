/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStore } from "@/lib/store"
import React from "react"
import { toast } from "sonner"

const formSchema = z.object({
  organization: z.string().min(1, "Выберите организацию"),
  account: z.string().min(1, "Выберите счёт"),
  warehouse: z.string().min(1, "Выберите склад"),
  pricetype: z.string().min(1, "Выберите тип цены"),
})

export function SaleForm() {
  const {
    organizations,
    payboxes,
    warehouses,
    pricetypes,
    selected_organization_id,
    selected_paybox_id,
    selected_warehouse_id,
    selected_pricetype_id,
    setSelectedOrganization,
    setSelectedPayBox,
    setSelectedWarehouse,
    setSelectedPriceType,
  } = useStore()

  const form = useForm({
    defaultValues: {
      organization: selected_organization_id || "",
      account: selected_paybox_id || "",
      warehouse: selected_warehouse_id || "",
      pricetype: selected_pricetype_id || "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success(JSON.stringify(value))
      // Values are handled by the individual select handlers
    },
  })

  // Sync store values to form when they change
  React.useEffect(() => {
    form.setFieldValue("organization", selected_organization_id || "")
    form.setFieldValue("account", selected_paybox_id || "")
    form.setFieldValue("warehouse", selected_warehouse_id || "")
    form.setFieldValue("pricetype", selected_pricetype_id || "")
  }, [
    selected_organization_id,
    selected_paybox_id,
    selected_warehouse_id,
    selected_pricetype_id,
    form,
  ])

  return (
    <form id="sale-form">
      <FieldGroup className="gap-4">
        <form.Field
          name="organization"
          children={(field) => (
            <Field>
              <FieldLabel>Организация</FieldLabel>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  setSelectedOrganization(value)
                  field.handleChange(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите организацию" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.length > 0 ? (
                    organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id.toString()}>
                        {org.short_name || org.full_name || org.work_name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      Нет доступных организаций
                    </div>
                  )}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <form.Field
          name="account"
          children={(field) => (
            <Field>
              <FieldLabel>Счёт</FieldLabel>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  setSelectedPayBox(value)
                  field.handleChange(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите счёт" />
                </SelectTrigger>
                <SelectContent>
                  {payboxes.length > 0 ? (
                    payboxes.map((box) => (
                      <SelectItem key={box.id} value={box.id.toString()}>
                        {box.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      Нет доступных касс
                    </div>
                  )}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <form.Field
          name="warehouse"
          children={(field) => (
            <Field>
              <FieldLabel>Склад</FieldLabel>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  setSelectedWarehouse(value)
                  field.handleChange(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите склад" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.length > 0 ? (
                    warehouses.map((wh) => (
                      <SelectItem key={wh.id} value={wh.id.toString()}>
                        {wh.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      Нет доступных складов
                    </div>
                  )}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <form.Field
          name="pricetype"
          children={(field) => (
            <Field>
              <FieldLabel>Тип цены</FieldLabel>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  setSelectedPriceType(value)
                  field.handleChange(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип цены" />
                </SelectTrigger>
                <SelectContent>
                  {pricetypes.length > 0 ? (
                    pricetypes.map((pt) => (
                      <SelectItem key={pt.id} value={pt.id.toString()}>
                        {pt.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      Нет доступных типов цен
                    </div>
                  )}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
