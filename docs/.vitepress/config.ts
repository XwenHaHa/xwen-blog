import { defineConfig } from "vitepress";

// 导航栏
const guideSidebar = [
  {
    text: "博客",
    items: [
      {
        text: "组件库系列",
        link: "/sparke-ui/Vitest问题.md",
      },
      {
        text: "日常随手记",
        link: "/normal/index.md",
      },
    ],
  },
];

// 侧边栏
const sidebar = [
  {
    text: "Xwen-Blog是什么?",
    items: [{ text: "写作初衷", link: "/guide/" }],
  },
  {
    text: "组件库系列",
    items: [{ text: "使用Vitest进行组件单元测试遇到的问题", link: "/articles/sparke-ui/Vitest问题.md" }],
  },
  {
    text: "日常博客",
    items: [{ text: "日常系列", link: "/articles/normal/index.md" }],
  },
];

export default defineConfig({
  title: "Xwen-Blog", //标题
  description: "一个记录自己成长的博客",
  themeConfig: {
    siteTitle: "Xwen-Blog",
    logo: "/logo.png",

    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/XwenHaHa" }],

    // 导航栏
    nav: [
      { text: "博客", items: guideSidebar },
    ],

    // 侧边栏
    sidebar,
  },
});
