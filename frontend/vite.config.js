import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// you if want to run this on anyother site
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//   },
// });

