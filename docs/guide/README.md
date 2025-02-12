---
toc
---
# 快速上手
## 介绍
> svgicon 是一个名称

svgicon 是 SVG 图标组件和工具集，将 SVG 文件变成图标数据(vue)或者图标组件(react)，让你可以愉快的在项目中使用 SVG 图标，无论你是使用 vue, react, vue3.x, taro 还是其他 js 框架。svgicon 包括了以下的 npm 包：

- @yzfe/svgicon `根据传入的参数(props)生成 SVG 图标组件需要的数据`
- @yzfe/vue-svgicon `适用于 vue2.x 的 SVG 图标组件`
- @yzfe/vue3-svgicon `适用于 vue3.x 的 SVG 图标组件`
- @yzfe/react-svgicon `适用于 react 的 SVG 图标组件`
- @yzfe/taro-svgicon `适用于 taro 的 SVG 图标组件`
- @yzfe/svgicon-gen `根据 SVG 文件内容，生成图标数据（图标名称和处理过的 SVG 内容）`
- @yzfe/svgicon-loader `将 SVG 文件加载成图标数据(vue)或者 SVG 图标组件(react), 可以自定义生成的代码`
- vite-plugin-svgicon `vite 插件，功能与 @yzfe/svgicon-loader 类似`
- @yzfe/svgicon-viewer `预览 SVG 图标`
- @yzfe/vue-cli-plugin-svgicon `vue-cli 插件，可以快速的配置 svgicon`
- @yzfe/svgicon-polyfill `SVG innerHTML 兼容（IE）`

## Vue （2.x & 3.x）
### 安装
#### 使用 vue-cli 插件 (推荐)
```bash
# 将会提示你填写 SVG 文件路径，全局注册的组件标签名称和 vue 的版本
vue add @yzfe/svgicon
```

如果已经安装了 `@yzfe/vue-cli-plugin-svgicon`, 但是没有调用到这个插件，你可以手动调用。
```bash
vue invoke @yzfe/svgicon
```

成功调用后，会自动添加必要的依赖和代码，另外还会生成 `.vue-svgicon.config.js` 文件，用来配置 `@yzfe/svgicon-loader` 和 webpack 别名，还有 transformAssetUrls 等。
::: details demo/vue-demo/.vue-svgicon.config.js
<<< @/demo/vue-demo/.vue-svgicon.config.js
:::

#### 不使用 vue-cli 插件
使用 vue-cli，但是没有使用 @yzfe/vue-cli-plugin-svgicon.

```bash
# loader
yarn add @yzfe/svgicon-loader --dev
# core
yarn add @yzfe/svgicon

# 添加图标组件
yarn add @yzfe/vue-svgicon # vue2.x
# or
yarn add @yzfe/vue3-svgicon # vue3.x
```
配置 vue.config.js

```js
const svgFilePath = 'svg file path （absolute path)'

{
    chainWebpack(config) {
        config.module
            .rule('vue-svgicon')
            .include.add(svgFilePath)
            .end()
            .test(/\.svg$/)
            .use('svgicon')
            .loader('@yzfe/svgicon-loader')
            .options({
                svgFilePath
            })

        config.module.rule('svg').exclude.add(svgFilePath).end()

        // 推荐配置 transformAssetUrls
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((opt) => {
                opt.transformAssetUrls = opt.transformAssetUrls || {}
                opt.transformAssetUrls['icon'] = ['data']
                return opt
            })

        // 推荐配置 alias
        config.resolve.alias.set('@icon', svgFilePath)
    }
}
```

配置好 vue.config.js 之后，还需要在入口文件加上以下代码

```ts
// vue2.x
import { VueSvgIcon } from '@yzfe/vue-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'

Vue.component('icon', VueSvgIcon)
```

```ts
// vue3.x
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'

app.use(VueSvgIconPlugin, {tagName: 'icon'})
```

#### 手动配置
Webpack 配置
```js
{
    module: {
        rules: [
            {
                test: /\.svg$/,
                include: ['SVG 文件路径'],
                use: [
                    {
                        loader: '@yzfe/svgicon-loader',
                        options: {
                            svgFilePath: ['SVG 文件路径'],
                            svgoConfig: null // 自定义 svgo 配置
                        }
                    }
                ]
            },
            // Recommend config, transformAssetUrls
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                ['标签名']: 'data' // 全局注册的标签名，默认是 icon
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

其他配置可以参考：[不使用-vue-cli-插件](./#不使用-vue-cli-插件)

### 使用
```vue
<template>
    <div>
        <icon :data="arrowData" />
    </div>
</template>
<script>
import arrowData from 'svgfilepath/arrow.svg'
export default {
    data() {
        return: {
            arrowData
        }
    }
}
</script>
```
如果配置了 `transformAssetUrls`, 可以直接使用 svg 文件路径. 建议也配置 svg 文件路径的别名。

```vue
<template>
    <div>
        <!-- 这里假设配置了svg 文件路径的别名 @icon  -->
        <icon data="@icon/arrow.svg" />
    </div>
</template>
```


## React
### 安装
```bash
yarn add @yzfe/svgicon-loader  --dev
yarn add @yzfe/svgicon @yzfe/react-svgicon
```

Webpack 配置
```js{13}
{
    module: {
        rules: [
            {
                test: /\.svg$/,
                include: ['SVG 文件路径'],
                use: [
                    {
                        loader: '@yzfe/svgicon-loader',
                        options: {
                            svgFilePath: ['SVG 文件路径'],
                            svgoConfig: null, // 自定义 svgo 配置
                            component: 'react', // 生成 React 组件
                        }
                    }
                ]
            }
        ]
    }
}
```
::: details umijs 配置 demo
<<< @/demo/react-demo/.umirc.ts
:::

引入 css
```ts
import '@yzfe/svgicon/lib/svgicon.css'
```
### 使用
```tsx
import MySvgIcon from 'svg-path/mysvg.svg'

export default function FC() {
    return (
        <div>
            <MySvgIcon color="red" />
        </div>
    )
}
```

如果你是 typescript 用户，请配置 tsconfig(使用了别名) 和 typings 
```json
{
     "compilerOptions": {
        "paths": {
            "@icon": ["svg 图标路径"]
        },
    },
}
```

```ts
declare module '@icon/*' {
    import { ReactSvgIconFC } from '@yzfe/react-svgicon'
    const value: ReactSvgIconFC
    export = value
}
```

## Vite
doc: [https://github.com/MMF-FE/svgicon/tree/master/packages/vite-plugin-svgicon](https://github.com/MMF-FE/svgicon/tree/master/packages/vite-plugin-svgicon)

demo: [https://github.com/Allenice/svgicon-vite-demo](https://github.com/Allenice/svgicon-vite-demo)

## Taro
### 安装
```bash
yarn add @yzfe/svgicon-loader  --dev
yarn add @yzfe/svgicon @yzfe/taro-svgicon
```

conifg 配置
```js{13}
// 小程序配置；mini
{
   ...mini, // ...h5
   webpackChain (chain, webpack) {
      chain.merge({
        module: {
          rule: {
            svgIcon: {
              test: /\.svg$/,
              include: svgFilePath,
              use: [{
                loader: "@yzfe/svgicon-loader",
                options: {
                  svgFilePath,
                  component: 'taro',
                }
              }]
            }
          }
        }
      })

      chain.module
      .rule('image')
      .exclude.add(svgFilePath)
      .end()
    }
}
```
::: details taro 配置 demo
<<< @/demo/taro-demo/config/index.js
:::

引入 css
```ts
import '@yzfe/svgicon/lib/svgicon.css'
```
### 使用
```tsx
import MySvgIcon from 'svg-path/mysvg.svg'

export default function FC() {
    return (
        <div>
            <MySvgIcon color="red" />
        </div>
    )
}
```

如果你是 typescript 用户，请配置 tsconfig(使用了别名) 和 typings 
```json
{
     "compilerOptions": {
        "paths": {
            "@icon": ["svg 图标路径"]
        },
    },
}
```

```ts
declare module '@icon/*' {
    import { TaroSvgIconFC } from '@yzfe/taro-svgicon'
    const value: TaroSvgIconFC
    export = value
}
```

## 其他框架
其他 js 框架可以通过 `@yzfe/svgicon ` 编写适用于其框架的图标组件，可以参考 `@yzfe/react-svgicon`.

::: details @yzfe/react-svgicon
<<<@/packages/react-svgicon/src/index.tsx
:::