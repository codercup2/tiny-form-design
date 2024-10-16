import { defineConfig } from 'unocss'
export default defineConfig({
  shortcuts: [
    {
      'border-base': 'border-1px border-solid border-gray-300',
      'border-left': 'border-1px border-l-solid border-gray-300',
      'border-right': 'border-1px border-r-solid border-gray-300',
      'border-left-highlight':
        'border-l-4px !border-l-solid border-l-green-300',
    },
  ],
})
