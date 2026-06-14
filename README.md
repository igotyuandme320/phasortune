# PhasorTune

PhasorTune 是一个面向大学电路分析课堂展示的 Vite + React + TypeScript 静态 Web 应用，用动态相量、波形图、阻抗三角形和 RLC 串联谐振挑战帮助学生理解正弦稳态分析。

## 知识点

- 正弦稳态电路相量分析
- 阻抗、感抗、容抗与相位角
- RLC 串联谐振
- 幅频响应与相频响应

本项目不包含暂态响应、二阶暂态分析或 Chapter 7 内容。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址由 Vite 输出，通常是 `http://localhost:5173`。

## 构建

```bash
npm run build
```

构建产物位于 `dist`。

## GitHub Pages 部署

```bash
npm run build:github
```

GitHub Actions 工作流位于 `.github/workflows/pages.yml`，会在推送到 `main` 分支时自动构建并部署。项目页路径使用 `/phasortune/`。

## Cloudflare Pages 部署

推荐设置：

- Build command: `npm run build`
- Output directory: `dist`

项目已包含 `public/_redirects`：

```txt
/* /index.html 200
```

这会为 React Router 单页应用提供刷新和深链 fallback 支持。
