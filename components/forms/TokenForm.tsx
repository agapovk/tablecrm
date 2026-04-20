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
import { useStore } from "@/lib/store"
import {
  // getContragents,
  getWarehouses,
  getPayBoxes,
  getOrganizations,
  getPriceTypes,
  getNomenclature,
  getContragents,
} from "@/lib/api"

const formSchema = z.object({
  token: z.string().min(5, "Токен должен быть не менее 5 символов."),
})

export function TokenForm() {
  const {
    setToken,
    setOrganizations,
    setWarehouses,
    setPayBoxes,
    setPriceTypes,
    setContragents,
    setNomenclatures,
  } = useStore()
  const [loadingState, setLoadingState] = React.useState({
    isLoading: false,
    error: null as string | null,
  })

  const form = useForm({
    defaultValues: {
      token: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoadingState({ isLoading: true, error: null })

        // Set token to store
        setToken(value.token)

        // Fetch all required data
        // console.log("Starting API calls with token:", value.token)
        const [
          orgs,
          warehouses,
          payboxes,
          pricetypes,
          contragents,
          nomenclature,
        ] = await Promise.all([
          getOrganizations(value.token),
          getWarehouses(value.token),
          getPayBoxes(value.token),
          getPriceTypes(value.token),
          getContragents(value.token),
          getNomenclature(value.token),
        ])

        // console.log("API responses:", {
        //   orgs,
        //   warehouses,
        //   payboxes,
        //   pricetypes,
        //   contragents,
        //   nomenclature,
        // })

        // Update store with data using actions
        setOrganizations(orgs.result || [])
        setWarehouses(warehouses.result || [])
        setPayBoxes(payboxes.result || [])
        setPriceTypes(pricetypes.result || [])
        setContragents(contragents.result || [])
        setNomenclatures(nomenclature.result || [])

        // console.log("Store updated with data")

        toast.success("Касса успешно подключена", {
          description: `Загружено: ${orgs.result?.length || 0} организаций, ${warehouses.result?.length || 0} складов, ${contragents.result?.length || 0} контрагентов, ${nomenclature.result?.length || 0} товаров`,
        })

        setLoadingState({ isLoading: false, error: null })
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ошибка при подключении кассы"
        setLoadingState({ isLoading: false, error: errorMessage })
        toast.error(errorMessage)
      }
    },
  })

  return (
    <div className="flex flex-col gap-3">
      <form
        id="token-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="token"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Token API</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Введите token кассы"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="token-form"
        disabled={loadingState.isLoading}
        className="w-full"
      >
        {loadingState.isLoading ? "Подключение..." : "Подключить"}
      </Button>
      {loadingState.error && (
        <p className="text-sm text-red-500">{loadingState.error}</p>
      )}
    </div>
  )
}
