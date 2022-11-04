import { rmSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import react from '@vitejs/plugin-react'

rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true })

const externals = ['electron', 'fs', 'path']

export default defineConfig({
   appType: 'spa',
   plugins: [
      react(),
      electron({
         renderer: {
            resolve: () => [...externals],
            sourcemap: true
         },
         main: {
            entry: 'packages/main/index.js',
            vite: {
               build: {
                  sourcemap: true,
                  outDir: 'dist/main'
               }
            }
         },
         preload: {
            input: 'packages/preload/index.js',
            vite: {
               build: {
                  sourcemap: true,
                  outDir: 'dist/preload'
               }
            }
         }
      })
   ],
   build: {
      outDir: 'dist/renderer'
   }
})
