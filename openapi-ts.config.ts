import { loadEnv } from 'vite'

import { defineConfig } from '@hey-api/openapi-ts'

const env = loadEnv('development', process.cwd(), '')
export default defineConfig({
  input: `${env.VITE_API_DEV_BASE_URL}/swagger/doc.json`, // 输入文件路径
  output: {
    path: './src/service',
    clean: true,
  },
  plugins: [
    {
      baseURL: '',
      name: '@hey-api/client-axios',
      runtimeConfigPath: '@/utils/hey-api.ts', // 使用自定义的runtime配置
    },
    '@hey-api/sdk',
    {
      name: '@hey-api/typescript',
      enums: 'typescript',
    },
  ],
})
