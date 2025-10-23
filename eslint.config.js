import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'warn', // 从 error 改为 warn
      'react/react-in-jsx-scope': 'off',

      // TypeScript 相关规则 - 调整为更宽松
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
      '@typescript-eslint/no-unused-vars': 'off', // 关闭未使用变量检查
      '@typescript-eslint/ban-ts-comment': 'off', // 允许 @ts-ignore 等注释
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许非空断言
      '@typescript-eslint/no-inferrable-types': 'off', // 允许显式类型注解
      '@typescript-eslint/prefer-as-const': 'off', // 不强制使用 as const

      // JavaScript 基础规则 - 调整为更宽松
      'no-unused-vars': 'off', // 关闭未使用变量检查
      'no-console': 'off', // 允许 console
      'no-debugger': 'warn', // debugger 改为警告
      'no-empty': 'off', // 允许空代码块
      'no-constant-condition': 'off', // 允许常量条件
      'no-undef': 'off', // 关闭未定义变量检查（TypeScript 会处理）

      // React 相关规则 - 调整为更宽松
      'react/prop-types': 'off', // 关闭 prop-types 检查（使用 TypeScript）
      'react/display-name': 'off', // 不强制组件显示名称
      'react/no-unescaped-entities': 'off', // 允许未转义的实体
      'react/jsx-key': 'warn', // key 属性改为警告
      'react/jsx-no-target-blank': 'off', // 允许 target="_blank"

      // React Hooks 规则保持推荐设置但调整严重程度
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierConfig
)
