import React, { useReducer } from 'react'

const initialState: SubmittingState = {
  loading: false,
  userInputError: null,
  serverError: null,
  success: null,
  recaptchaError: false
}

function reducer(
  state: SubmittingState,
  action: SubmittingAction
): SubmittingState {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        loading: true,
        userInputError: null,
        serverError: null,
        success: null,
        recaptchaError: false
      }
    }
    case 'SET_SUCCESS': {
      return {
        loading: false,
        userInputError: false,
        serverError: null,
        success: true,
        recaptchaError: false
      }
    }
    case 'SET_USER_INPUT_ERROR': {
      return {
        ...state,
        loading: false,
        userInputError: true,
        success: false,
      }
    }
    case 'SET_SERVER_INTERNAL_ERROR': {
      return {
        ...state,
        loading: false,
        serverError: true,
        success: false,
      }
    }

    case 'SET_RECAPTCHA_ERROR': {
      return {
        ...state,
        loading: false,
        recaptchaError: true,
        success: false,
      }
    }
    default:
      return state
  }
}

export type SubmittingState = {
  loading: boolean
  userInputError: boolean | null
  serverError: boolean | null
  success: boolean | null
  recaptchaError: boolean
}

export type SubmittingAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_SUCCESS' }
  | { type: 'SET_USER_INPUT_ERROR' }
  | { type: 'SET_SERVER_INTERNAL_ERROR' }
  | { type: 'SET_RECAPTCHA_ERROR' }

export const useSubmitReducer = () => {
  return useReducer(reducer, initialState)
}

export const SubmitContext = React.createContext<SubmittingState>(initialState)
