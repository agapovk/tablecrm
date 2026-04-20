/* eslint-disable react/no-children-prop */
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useStore } from "@/lib/store"
import { getContragents } from "@/lib/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  phone: z.string().regex(/^[\d+\s()-]*$/, "Неверный формат телефона"),
  client: z.string(),
})

export function ClientForm() {
  const {
    token,
    phone,
    setPhone,
    contragents,
    setContragents,
    selected_contragent_id,
    setSelectedContragent,
    itemLoading,
    setItemLoading,
  } = useStore()

  const form = useForm({
    defaultValues: {
      phone: phone,
      client: selected_contragent_id || "",
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

        setItemLoading(true)
        const response = await getContragents(token, value.phone)
        setContragents(response.result || [])
        setPhone(value.phone)

        if (!response.result || response.result.length === 0) {
          toast("Клиент не найден")
        } else {
          toast.success(`Найдено ${response.result.length} клиентов`)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Ошибка при поиске клиента"
        toast.error(errorMessage)
      } finally {
        setItemLoading(false)
      }
    },
  })

  return (
    <div className="flex flex-col gap-3">
      <form
        id="client-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="phone"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Телефон</FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="+79990000000"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      form="client-form"
                      variant={"outline"}
                      size="icon"
                      disabled={itemLoading}
                    >
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          {contragents.length > 0 && (
            <form.Field
              name="client"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="client-select">Клиент</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        setSelectedContragent(value)
                        field.handleChange(value)
                      }}
                    >
                      <SelectTrigger id="client-select">
                        <SelectValue placeholder="Выберите клиента" />
                      </SelectTrigger>
                      <SelectContent>
                        {contragents.map((client) => (
                          <SelectItem key={client.id} value={String(client.id)}>
                            {client.name}
                            {client.phone && ` (${client.phone})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )
              }}
            />
          )}
        </FieldGroup>
      </form>
    </div>
  )
}
