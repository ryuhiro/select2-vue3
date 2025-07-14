import type { Component } from 'vue'

export interface ChoicesVueOption {
  [key: string]: any
}

export interface ChoicesVue3Props {
  id?: string
  name?: string
  placeholder?: string
  options: ChoicesVueOption[]
  modelValue?: string | number | (string | number | ChoicesVueOption)[]
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  valueKey?: string
  textKey?: string
  config?: Record<string, any>
  fetchOnSearch?: boolean
  loadingSelect?: boolean
}

export declare const ChoicesVue3: Component
