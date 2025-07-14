# Select2-Vue3

[![npm version](https://img.shields.io/npm/v/select2-vue3.svg)](https://www.npmjs.com/package/select2-vue3) [![npm downloads](https://img.shields.io/npm/dm/select2-vue3.svg)](https://www.npmjs.com/package/select2-vue3) [![Vue 3 Compatible](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/) [![Types Included](https://img.shields.io/npm/types/select2-vue3.svg)](https://www.npmjs.com/package/select2-vue3) [![](https://data.jsdelivr.com/v1/package/npm/select2-vue3/badge?style=rounded)](https://www.jsdelivr.com/package/npm/select2-vue3)

💡 A lightweight Vue 3 wrapper for jQuery Select2 with Bootstrap 5.
Support for CDN or bundled usage, v-model binding, custom events, async search, Vuex, and full TypeScript support. And more!

### Changes
- **v1.0.0**: Initial release with TypeScript support and CDN usage.
- **v1.0.1**: Added Vuex support and improved documentation.
- **v1.0.2**: Fixed async search issue and improved performance.
- **v1.0.3**: Added custom events and improved TypeScript type definitions.
- **v1.0.4**: Fixed CDN usage issue and improved documentation.
- **v1.0.5**: improved performance.
- **v1.0.6**: Fixed async search issue by Vuex and improved TypeScript type definitions.
- **v1.0.7**: Improved documentation.
- **v1.0.8**: Fix options by default, and the options can be customized. It can also be used with Vuex. Use options by array of objects or array of strings.

---


## 🖼️ Preview

![Select2-Vue3 Preview](https://res.cloudinary.com/doftx5wrm/image/upload/v1751969403/demo_hwe3hg.jpg)

---



## 🧪 Demo & Playground
🔗 [Try at JSFiddle](https://jsfiddle.net/ryuhiro/0o9Leza6/1/)


## 🚀 Install

### With npm (recommended)

```bash
npm install select2-vue3
```

### With CDN

```bash
<link href="https://cdn.jsdelivr.net/npm/select2-vue3@1.0.8-rc0/dist/select2-vue3.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2-vue3@1.0.8-rc0/dist/select2-vue3.min.js"></script>
```

## 🧩 Usage

### Basic usage (npm / bundler)
```bash
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Select2Vue3 from 'select2-vue3'
import 'select2-vue3/dist/select2-vue3.css'

const app = createApp(App)

app.use(Select2Vue3)
app.mount('#app')
```

Or for TypeScript when build (Tested in Vite when using `npm run build`):

```bash
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Select2Vue3} from 'select2-vue3'
import 'select2-vue3/dist/select2-vue3.css'

const app = createApp(App)

// app.use(Select2Vue3)
app.component('Select2Vue3', Select2Vue3)
app.mount('#app')
```


Now use in your any components:

```bash
<template>
  <Select2Vue3
    id="select2"
    name="select2"
    v-model="selectedValue"
    :options="selectOptions"
    :multiple="false"
    placeholder="Pilih Satu Data..."
/>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref(null)
const selectOptions = ref([
  { id: 1, text: 'Option 1' },
  { id: 2, text: 'Option 2' },
  { id: 3, text: 'Option 3' }
])
</script>
```

Or you can use TypeScript:

```bash
<template>
  <Select2Vue3
    id="select2"
    name="select2"
    v-model="selectedValue"
    :options="selectOptions"
    :multiple="false"
    placeholder="Pilih Satu Data..."
    :config="{ theme: 'bootstrap-5' }"
  />
/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const selectedValue = ref('')
    const selectOptions = ref([
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: 'Option 3' }
    ])

    return {
      selectedValue,
      selectOptions,
    }
  }
})
</script>
```

### Example using API (Vuex)
```bash
<Select2Vue3
  :options="selectOptionCate"
  v-model="selectedCategory"
  :loadingSelect="loadingSelect"
  :fetch-on-search="true"
  :config="{ hasMore: paginationCate.current < paginationCate.totalPages }"
  @search="searchCategories"
  @loadMore="loadMoreCategories"
  @change="handleChange"
/>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const loadingSelect = ref(false)

    const searchCate = ref('')
    const selectedCategory = ref([])
    const selectOptionCate = ref([])
    const paginationCate = ref({
      current: 1, // Halaman pertama
      pageSize: 10, // Jumlah item per halaman
      total: 0, // Total item
      showTotal: (total) => `Total ${total} items`, // Menampilkan total item
      onChange: (page) => {
        // Set halaman saat ini dan ambil data untuk halaman tersebut
        paginationCate.value.current = page
        getCategories(page)
      },
      totalPages: 0,
    })

    const searchCategories = (query, page = 1) => {
      console.log("Manggil searchCategories()")
      selectOptionCate.value = []
      searchCate.value = query
      paginationCate.value.current = page
      if (page === 1) {
        selectOptionCate.value = []
      }
      getCategories(page)
    }


    // Panggil dari Select2Vue3 via @loadMore
    const loadMoreCategories = async () => {
      console.log("Manggil loadMoreCategories()")
      if (paginationCate.value.current < paginationCate.value.totalPages) {
        await getCategories(paginationCate.value.current)
        paginationCate.value.current++
      }
      console.log('current page:', paginationCate.value.current)
      console.log('total page:', paginationCate.value.totalPages)
    }

    // Ini logic fetch GET Categories, tidak boleh diubah
    const getCategories = async (page = 1) => {
      if (loadingSelect.value) return
      loadingSelect.value = true

      try {
        const params = {
          search: searchCate.value,
          page: page,
          per_page: paginationCate.value.pageSize,
          is_active: true,
        }

        await store.dispatch('listCate', {
          params,
          success: (res) => {
            selectOptionCate.value = res.data.data.map(item => ({
              id: item.id,
              text: item.category_name,
            }))
            paginationCate.value.total = res.data.meta.pagination.total
            paginationCate.value.totalPages = res.data.meta.pagination.last_page
            loadingSelect.value = false
          },
          error: (res) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.data.message,
            })
          },
        })
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        loadingSelect.value = false
      }
    }

    const handleChange = (val) => {
      console.log('Selected value:', val)
    }

    // Lifecycle hook: Mounted
    onMounted(() => {
      getCategories()
    })

    return {
      selectedCategory,
      selectOptionCate,
      loadingSelect,
      getCategories,
      searchCategories,
      loadMoreCategories,
      handleChange,
      paginationCate,
    }
  }
})
</script>
```


# How to use the props?

| Name          | Type                 | Default          | Required | Description                                                  |
|---------------|----------------------|------------------|----------|--------------------------------------------------------------|
| `id`          | `String`             | `'select2'`      | No       | ID attribute for the `<select>` element                      |
| `name`        | `String`             | `'select2'`      | No       | Name attribute for the `<select>` element                    |
| `options`     | `Array`              | —                | Yes      | Array of options to display. Can be array of strings, numbers, or objects |
| `modelValue`  | `String`, `Number`, `Array` | `null`       | No       | Selected value(s) of the select                               |
| `placeholder` | `String`             | `'Select an option'` | No    | Placeholder text when no option is selected                   |
| `multiple`    | `Boolean`            | `false`          | No       | Enable multiple selections                                    |
| `disabled`    | `Boolean`            | `false`          | No       | Disable the select input                                      |
| `required`    | `Boolean`            | `false`          | No       | Mark the select as required                                   |
| `valueKey`    | `String`             | `'id'`           | No       | Key name to use for option values when options are objects   |
| `textKey`     | `String`             | `'text'`         | No       | Key name to use for option display text when options are objects |
| `config`      | `Object`             | `{}`             | No       | Additional Select2 configuration options                      |
| `fetchOnSearch` | `Boolean`           | `false`          | No       | Enable AJAX fetching when searching                           |
| `loadingSelect` | `Boolean`           | `undefined`      | No       | Indicates loading state for fetchOnSearch                     |

# Emits

| Event             | Payload                   | Description                                         |
|-------------------|---------------------------|-----------------------------------------------------|
| `update:modelValue` | Selected value(s)         | Emits when the selected value(s) change             |
| `change`          | Selected value(s)          | Emits on select value change                          |
| `select`          | Selected option data       | Triggered on Select2's select event                  |
| `closing`         | Event data                 | Triggered when the dropdown is closing               |
| `close`           | Event data                 | Triggered after the dropdown closes                  |
| `opening`         | Event data                 | Triggered when the dropdown is opening               |
| `open`            | Event data                 | Triggered after the dropdown opens                   |
| `clearing`        | Event data                 | Triggered when selection is about to be cleared      |
| `clear`           | Event data                 | Triggered after selection is cleared                  |
| `search`          | `(term: String, page: Number)` | Triggered when user searches (for fetchOnSearch)    |
| `loadMore`        | —                         | Triggered on infinite scroll load more event         |



## 🚀 About Me
I'm a full stack developer...


## Authors

- [@ryuhiro](https://www.github.com/ryuhiro)

