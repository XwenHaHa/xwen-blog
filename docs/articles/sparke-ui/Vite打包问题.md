# 02 - 使用 Vite 对组件打包时遇到的问题

## 前言：
><font>最近在做一个基于Vite搭建前端组件库的项目，在发布兼容多种JS模块标准的软件包的环节时，使用测试页测试iife模块的模块输出效果，打包的模块显示报错信息如下：</font>
![00.png](../../public/sparke-ui/02/Vite_00.PNG "Magic Gardens")

## 第一步:
> <font>在对于打包的entry.ts入口文件，还有vite.config.ts的配置文件进行检查后都发现没问题，所以将问题指向插件版本冲突上。</font>。

```js
/// <reference types="vitest" />
import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "./config/unocss";
const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    assetFileNames: "[name].[ext]",
    exports: "named",
    globals: {
      vue: "Vue",
    },
  },
};
export const config = {
  plugins: [vue(), vueJsx({}), Unocss()],
  build: {
    rollupOptions,
    minify: "terser", // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    reportCompressedSize: true, // 生成压缩大小报告
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "SparkeUI",
      fileName: "sparke-ui",
      // 导出模块格式
      formats: ["esm", "umd", "iife"],
    },
    outDir: "./dist",
  },
  test: {
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: "happy-dom",
    // 支持tsx组件
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
} as UserConfig;

export default defineConfig(config as UserConfig);
```

## 第二步:
> <font>首先对这个报错信息进行解读，意思是这个js文件里包含无效的JS语法，请检查一下如果使用JSX，确保是用.jsx或者.tsx扩展名结尾。好家伙这赶紧去看自己用于解析jsx的插件版本有没问题。然后就对这个版本的插件进行版本升级结果还是没解决问题。</font>。
![01.png](../../public/sparke-ui/02/Vite_02.PNG "Magic Gardens")

## 第三步:
> <font>pnpm build 执行vite build命令确实是没问题的说明打包的过程中是没问题的，那么问题就出在打包后的文件上了</font>。
![01.png](../../public/sparke-ui/02/Vite_03.PNG "Magic Gardens")

## 第四步:
> <font>再来看spark-ui.iife.js文件,果然打开一片通红，这里显示应为表达式，此时想innerHTML后面不是要跟引号吗给他整上</font>。
![01.png](../../public/sparke-ui/02/Vite_04.PNG "Magic Gardens")

## 第五步:
> <font>好家伙这一加马上就不红了</font>。
![01.png](../../public/sparke-ui/02/Vite_05.PNG "Magic Gardens")

## 第六步:
> <font>但是这样也不是问题啊，难道每次打包手动加上吗，肯定是不可能的，然后一看innerHTML后面的文件，这不妥妥的Unocss的样式吗，于是目标放到这个插件上，查阅相关资料将插件版本降级之后</font>。
![01.png](../../public/sparke-ui/02/Vite_06.PNG "Magic Gardens")

## 第七步:
> <font>再执行pnpm build打包，pnpm dev启动服务，然后访问文件夹下的测试页，发现成功</font>。
![01.png](../../public/sparke-ui/02/Vite_07.PNG "Magic Gardens")
