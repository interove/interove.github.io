---
title: 用 Vite + React 搭建博客并部署到 GitHub Pages
date: 2025-02-03
tags: [技术, React, GitHub]
summary: 手把手教你用 Vite 和 React 搭建个人博客，并通过 GitHub Actions 自动部署到 GitHub Pages。
---

# 用 Vite + React 搭建博客并部署到 GitHub Pages

## 为什么选择这个方案？

- **Vite** 构建速度极快，开发体验一流
- **React** 生态丰富，组件化开发清晰
- **GitHub Pages** 免费静态托管，自动 HTTPS
- **Markdown** 写作门槛低，专注内容本身

## 项目初始化

```bash
npm create vite@latest my-blog -- --template react-ts
cd my-blog
npm install
npm install react-router-dom react-markdown remark-gfm
```

## 目录结构

```
my-blog/
├── public/
│   └── posts/
│       ├── index.json        # 文章列表索引
│       ├── hello-world.md
│       └── my-post.md
├── src/
│   ├── App.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Post.tsx
│   └── components/
└── vite.config.ts
```

## 添加 GitHub Actions 自动部署

在 `.github/workflows/deploy.yml` 中添加：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 配置 vite.config.ts

如果你的 GitHub Pages 路径不是根路径，需要配置 `base`：

```typescript
export default defineConfig({
  base: '/my-blog/',  // 替换为你的仓库名
  plugins: [react()],
})
```

## Markdown 文章格式

每篇文章使用 Front Matter 定义元数据：

```markdown
---
title: 文章标题
date: 2025-01-01
tags: [标签1, 标签2]
summary: 文章摘要
---

# 正文内容...
```

## 总结

整个方案零成本、全自动，每次 `git push` 后博客会自动更新部署。非常适合个人博客、技术文档等场景。

> 💡 **小提示**：在仓库 Settings → Pages 中选择 `gh-pages` 分支作为发布源。
