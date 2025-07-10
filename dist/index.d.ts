import type { Component } from 'vue'

export interface Select2Option {
  [key: string]: any
}

export interface Select2Vue3Props {
  id?: string
  name?: string
  placeholder?: string
  options: Select2Option[]
  modelValue?: string | number | (string | number)[]
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  valueKey?: string
  textKey?: string
  config?: Record<string, any>
  fetchOnSearch?: boolean
}

export declare const Select2Vue3: Component
