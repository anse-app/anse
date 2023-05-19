![Banner](https://user-images.githubusercontent.com/1998168/235366625-e615e68d-592c-4f18-9c9f-1e5cd1778557.png)

# Anse

English | [简体中文](./README.zh-CN.md)

Anse is a fully optimized UI for AI Chats.

- 🍿 **Live preview**: https://anse.app
- 📖 **Documentation**: https://docs.anse.app
- ✨ **Release Notes**: https://github.com/anse-app/anse/releases

## Features

- **🚀 Powerful Plugin System** - Powered by `Provider plugin` , easy to extend AI platforms such as [OpenAI](https://openai.com/), [Replicate](https://replicate.com/), and also supports custom model parameters.
- **💬 Session Record Saving** - We use `IndexDB` to store local data, it will not be uploaded to the server, security issues are guaranteed.
- **🎉 Multiple Session Modes** - Provides different conversations modes，support `Single Conversation`, `Continuous Conversation`, `OpenAI Image Generation`、`Stable Diffusion` and more.
- **💎 Improved UI Experience** - We have refactored the website UI for the previous version, optimized a lot of details, and also adapted to `mobile end` and `dark mode`.
- **🌈 One-Click Deployment** - Support one-click deployment, abandoned use environment variables, you can refer to our documentation to deploy the website to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), `Docker`, `Node` and other platforms.

## Running Locally

### Pre environment
1. **Node**: Check that both your development environment and deployment environment are using `Node v18` or later. You can use [nvm](https://github.com/nvm-sh/nvm) to manage multiple `node` versions locally。
   ```bash
    node -v
   ```
2. **PNPM**: We recommend using [pnpm](https://pnpm.io/) to manage dependencies. If you have never installed pnpm, you can install it with the following command:
   ```bash
    npm i -g pnpm
   ```
3. **OPENAI_API_KEY**: Before running this application, you need to obtain the API key from OpenAI. You can register the API key at [https://beta.openai.com/signup](https://beta.openai.com/signup).

### Getting Started

1. Install dependencies
   ```bash
    pnpm install
   ```
2. Run the application, the local project runs on `http://localhost:3000/`
   ```bash
    pnpm run dev
   ```
3. Add your [OpenAI API key](https://platform.openai.com/account/api-keys) to the settings panel, then enjoy it!

## How to deploy
For more details, please refer to this document: https://docs.anse.app/self-deploy

## Enable Automatic Updates

After forking the project, you need to manually enable Workflows and Upstream Sync Action on the Actions page of the forked project. Once enabled, automatic updates will be scheduled every day:

![](https://cdn.staticaly.com/gh/yzh990918/static@master/20230518/image.2omctdf8bbk0.webp)
## Frequently Asked Questions

Q: TypeError: fetch failed (can't connect to OpenAI Api)

A: Reference: https://github.com/anse-app/chatgpt-demo/issues/34

Q: throw new TypeError(`${context}` is not a ReadableStream.)

A: The Node version needs to be `v18` or later，reference: https://github.com/anse-app/chatgpt-demo/issues/65

Q: Accelerate domestic access without the need for proxy deployment tutorial?

A: You can refer to this tutorial: https://github.com/anse-app/chatgpt-demo/discussions/270

Q: `PWA` is not working?

A: Current `PWA` does not support deployment on Netlify, you can choose vercel or node deployment.
## Contributing

This project exists thanks to all those who contributed.

Thank you to all our supporters!🙏

[![img](https://contrib.rocks/image?repo=anse-app/anse)](https://github.com/anse-app/anse/graphs/contributors)

## License

MIT © [ddiu8081](https://github.com/anse-app/anse/blob/main/LICENSE)
