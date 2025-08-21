// generate-api.ts
/**
 * @name 接口数据结构生成器
 * @desc 自动生成后端接口返的数据类型结构、支持json、yaml
 * @github https://github.com/acacode/swagger-typescript-api
 * @docs https://acacode.github.io/swagger-typescript-api/functions/generateApi.html
 **/

import fs from 'node:fs'
import path from 'node:path'
import { generateApi, generateTemplates } from 'swagger-typescript-api'

const API_URL = 'http://localhost:9000/swagger/doc.json'

generateApi({
  /* 基础配置 */
  fileName: 'api.ts', // 生成的主文件名
  output: path.resolve(process.cwd(), 'src/api'), // 输出目录（设为 false 禁用写入磁盘）
  // input: path.resolve(process.cwd(), './swagger.json'), // 本地 Swagger 文件路径（与 url/spec 三选一）
  url: API_URL, // 远程 Swagger 文档 URL
  // spec: { /* 直接传入 Swagger 对象 */ },      // 动态 Swagger 对象

  /* 模板配置 */
  // templates: path.resolve(process.cwd(), './custom-templates'), // 自定义模板目录

  /* HTTP 客户端配置 */
  httpClientType: 'axios', // 可选 "axios" 或 "fetch"
  singleHttpClient: true, // 是否使用单一 HttpClient 实例

  /* 生成控制 */
  generateClient: true, // 是否生成客户端类
  generateResponses: true, // 是否生成完整响应类型
  // generateRouteTypes: true, // 是否生成路由类型
  // defaultResponseAsSuccess: false, // 是否自动标记 2xx 为成功响应
  // modular: false, // 是否按 tag 生成模块化 API
  cleanOutput: false, // 生成前清空输出目录（危险！）

  /* 类型处理 */
  extractRequestParams: true, // 提取请求参数为独立类型
  extractRequestBody: true, // 提取请求体为独立类型
  extractEnums: true, // 提取枚举类型
  unwrapResponseData: false, // 解包响应中的 data 字段
  generateUnionEnums: false, // 生成联合类型枚举
  enumNamesAsValues: false, // 使用枚举名作为值
  addReadonly: false, // 为类型添加 readonly 修饰符

  /* 类型命名规则 */
  typePrefix: '', // 类型名前缀
  typeSuffix: '', // 类型名后缀
  enumKeyPrefix: '', // 枚举键前缀
  enumKeySuffix: '', // 枚举键后缀
  fixInvalidTypeNamePrefix: 'Type', // 修复无效类型名前缀
  fixInvalidEnumKeyPrefix: 'Value', // 修复无效枚举键前缀

  /* 响应处理 */
  defaultResponseType: 'void', // 默认响应类型
  extractingOptions: {
    // 类型提取后缀规则
    requestBodySuffix: ['Payload'], // 请求体类型后缀（如 UserPayload）
    requestParamsSuffix: ['Params'], // 请求参数后缀
    responseBodySuffix: ['Data'], // 响应体后缀（如 UserData）
    responseErrorSuffix: ['Error'], // 错误类型后缀
  },

  /* 代码风格 */
  prettier: {
    // Prettier 配置（覆盖项目默认）
    printWidth: 100,
    tabWidth: 2,
    trailingComma: 'all',
    semi: true,
  },
  // toJS: false, // 生成 JavaScript 代码
  // anotherArrayType: false, // 使用 Array<T> 代替 T[]

  /* 高级自定义 */
  codeGenConstructs: constructs => ({
    // 自定义类型构造
    ...constructs,
    RecordType: (key, value) => `MyRecord<${key}, ${value}>`, // 替换 Record 类型
  }),
  primitiveTypeConstructs: constructs => ({
    // 基础类型映射
    ...constructs,
    string: {
      'date-time': 'Date', // 将 format: date-time 映射为 Date
      email: 'EmailString', // 自定义邮箱类型
    },
  }),

  /* 钩子函数 */
  hooks: {
    // onCreateRoute: (routeData) => {
    //   // 路由创建时触发
    //   console.log(`生成路由: ${routeData.method} ${routeData.path}`);
    // },
    // onFormatTypeName: (typeName) => {
    //   // 格式化类型名称
    //   return `${typeName}_Type`; // 为所有类型添加 _Type 后缀
    // },
  },
})
  .then(({ files }) => {
    // // 手动写入文件（当 output 设为 false 时使用）
    // files.forEach(({ content, name }) => {
    //   fs.writeFileSync(path.join(process.cwd(), name), content);
    // });
    console.log('✅ API 生成成功')
  })
  .catch(err => console.error('❌ 生成失败:', err))

/**
 * 生成自定义模板（可选）
 * 使用场景: 基于默认模板创建自定义模板
 */
// generateTemplates({
//   output: path.resolve(process.cwd(), './custom-templates'), // 模板输出目录
//   httpClientType: 'axios', // 适配的 HTTP 客户端类型
//   modular: true, // 生成模块化模板
//   rewrite: true, // 覆盖已存在的模板文件
// });
