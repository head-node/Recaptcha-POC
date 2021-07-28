import React, { FC, useMemo, useState, useCallback } from 'react'
import {
  FormContext,
  JSONSchemaType,
  JSONSubSchemaInfo,
  getDataFromPointer,
  OnSubmitParameters,
} from 'react-hook-form-jsonschema'
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from 'react'
function recaptchaValidation(recaptchaValue: string | null | undefined) {
  return new Promise((resolve, reject) => {

    if (recaptchaValue == "") {
      reject("Recaptcha Error")
    } else {
      console.log(recaptchaValue, "This is the recaptchaValue")
      resolve("Recaptcha Completed Successfully")

    }


  })
}
import { useMutation } from 'react-apollo'
import { ExtensionPoint } from 'vtex.render-runtime'
import { GraphQLError } from 'graphql'

import createDocumentV2 from '../graphql/createDocument.graphql'
import { FormProps } from '../typings/FormProps'
import { parseMasterDataError } from '../logic/masterDataError'
import { useSubmitReducer, SubmitContext } from '../logic/formState'

export const FormHandler: FC<{
  schema: JSONSchemaType
  formProps: FormProps
}> = props => {
  const [createDocumentMutation, { error }] = useMutation(createDocumentV2)

  const masterDataErrors = useMemo(() => parseMasterDataError(error), [error])
  const [lastErrorFieldValues, setLastErrorFieldValues] = useState<
    Record<string, string>
  >({})

  const [submitState, dispatchSubmitAction] = useSubmitReducer()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const onSubmit = useCallback(
    async ({ data, methods, event }: OnSubmitParameters) => {
      if (event) {
        event.preventDefault()
      }
      dispatchSubmitAction({ type: 'SET_LOADING' })
      const recaptchaValue = recaptchaRef.current?.getValue()
      try {
        const response = await recaptchaValidation(recaptchaValue)
        console.log(response)

      } catch (error) {
        console.log(error)

        dispatchSubmitAction({ type: 'SET_RECAPTCHA_ERROR' })
        return;

      }
      await createDocumentMutation({
        variables: {
          dataEntity: props.formProps.entity,
          document: { document: data },
          schema: props.formProps.schema,
        },
      })
        .then(() => {
          dispatchSubmitAction({ type: 'SET_SUCCESS' })
        })
        .catch(e => {
          setLastErrorFieldValues(data)

          if (e.graphQLErrors) {
            for (const graphqlError of e.graphQLErrors as GraphQLError[]) {
              if (
                graphqlError.extensions?.exception?.name === 'UserInputError'
              ) {
                dispatchSubmitAction({ type: 'SET_USER_INPUT_ERROR' })
              } else {
                dispatchSubmitAction({
                  type: 'SET_SERVER_INTERNAL_ERROR',
                })
              }
            }
          } else {
            dispatchSubmitAction({ type: 'SET_SERVER_INTERNAL_ERROR' })
          }

          methods.triggerValidation()
        })
    },
    [
      createDocumentMutation,
      dispatchSubmitAction,
      props.formProps.entity,
      props.formProps.schema,
    ]
  )

  if (submitState.success) {
    return <ExtensionPoint id="form-success" />
  }

  return (
    <FormContext
      schema={props.schema}
      onSubmit={onSubmit}
      customValidators={{
        graphqlError: (value, context: JSONSubSchemaInfo) => {
          const lastValue = getDataFromPointer(
            context.pointer,
            lastErrorFieldValues
          )
          if (
            masterDataErrors[context.pointer] &&
            ((!lastValue && !value) || lastValue === value)
          ) {
            return masterDataErrors[context.pointer][0]
          }
          return true
        },
      }}
    >
      <SubmitContext.Provider value={submitState}>
        {props.children}
        <div style={{ marginLeft: "120px", marginTop: "15px", marginBottom: "15px" }}>
          <ReCAPTCHA
            sitekey="6LfFz20bAAAAALEFR-Fe8tjEBTV-du4Sk57dqIJ-"
            ref={recaptchaRef}

          />
        </div>

      </SubmitContext.Provider>
    </FormContext>
  )
}
