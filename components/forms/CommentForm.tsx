/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store"
import React from "react"

const formSchema = z.object({
  comment: z.string(),
})

export function CommentForm() {
  const { comment, setComment } = useStore()

  const form = useForm({
    defaultValues: {
      comment: comment,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async () => {
      // Comment is handled by onChange
    },
  })

  React.useEffect(() => {
    form.setFieldValue("comment", comment)
  }, [comment, form])

  return (
    <form
      id="form-tanstack-textarea"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="comment"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Textarea
                  id="form-tanstack-textarea-about"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                    setComment(e.target.value)
                  }}
                  aria-invalid={isInvalid}
                  placeholder="Комментарий к заказу (необязательно)"
                  className="min-h-30"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
    </form>
  )
}
