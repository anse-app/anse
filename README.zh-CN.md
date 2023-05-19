![Banner](https://user-images.githubusercontent.com/1998168/235366625-e615e68d-592c-4f18-9c9f-1e5cd1778557.png)

# Anse

[English](./README.md) | 简体中文

Anse 是一个极致优化的 AI 聊天 UI.

- 🍿 **在线预览**: https://anse.app
- 📖 **文档地址**: https://docs.anse.app
- ✨ **版本日志**: https://github.com/anse-app/anse/releases

## 功能

- **🚀 强大的插件系统** - 归功于 `Provider plugin` ，轻松扩展类似于 [OpenAI](https://openai.com/), [Replicate](https://replicate.com/) 等 AI 平台, 并且支持自定义模型参数.
- **💬 会话记录保存** - 使用 `IndexDB` 保存本地数据，不会上传到服务器，保证安全问题。.
- **🎉 多种对话模式** - 提供不同的对话模式：`单词对话`, `连续对话`, `OpenAI 图像生成`、`Stable Diffusion` 和更多.
- **💎 优化用户界面体验** - 我们对上一个版本重构了网站用户界面，优化了很多细节，还适应了移动端和黑暗模式.
- **🌈 一键部署** -支持一键部署，不再需要环境变量，可以参考我们的留档将网站部署到 [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), `Docker`, `Node` 和更多平台.

## 本地运行

### 前置环境
1. **Node**: 检查您的开发环境和部署环境是否都使用 `Node v18` 或更高版本。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 管理本地多个 `node` 版本
   ```bash
    node -v
   ```
2.  **PNPM**: 我们推荐使用 [pnpm](https://pnpm.io/) 来管理依赖，如果你从来没有安装过 pnpm，可以使用下面的命令安装：
   ```bash
    npm i -g pnpm
   ```
3.  **OPENAI_API_KEY**: 在运行此应用程序之前，您需要从 OpenAI 获取 API 密钥。您可以在 [https://beta.openai.com/signup](https://beta.openai.com/signup) 注册 API 密钥

### 起步运行

1. 安装依赖
   ```bash
    pnpm install
   ```
2. 运行应用，本地项目运行在 `http://localhost:3000/`
   ```bash
    pnpm run dev
   ```
3. 在设置面板添加你的 [OpenAI API key](https://platform.openai.com/account/api-keys), 然后尽情享受吧!

## 部署

获取更多信息，请参考部署文档: https://docs.anse.app/self-deploy

## 开启同步更新

Fork 项目后，您需要在 Fork 项目的操作页面上手动启用工作流和上游同步操作。启用后，每天都会执行自动更新:

![](https://cdn.staticaly.com/gh/yzh990918/static@master/20230518/image.2omctdf8bbk0.webp)

## 常见问题

Q: TypeError: fetch failed (can't connect to OpenAI Api)

A: 参考: https://github.com/anse-app/chatgpt-demo/issues/34

Q: throw new TypeError(`${context}` is not a ReadableStream.)

A: Node 版本需要在 `v18` 或者更高，参考: https://github.com/anse-app/chatgpt-demo/issues/65

Q: 无需代理部署教程即可加速国内访问？?

A: 你可以参考此教程: https://github.com/anse-app/chatgpt-demo/discussions/270

Q: `PWA` 不工作？

A: 当前的 PWA 不支持 Netlify 部署，您可以选择 vercel 或 node 部署。

## 参与贡献

这个项目的存在要感谢所有做出贡献的人。

感谢我们所有的支持者！🙏

[![img](https://contributors.nn.ci/api?repo=anse-app/anse)](https://github.com/anse-app/anse/graphs/contributors)

## License

MIT © [ddiu8081](https://github.com/anse-app/anse/blob/main/LICENSE)
