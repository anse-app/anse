# ChatGPT-API Demo v2

[![](https://cloud-upyun.ddiu.site/picture/2023/04/15/xAe0dY.png)](https://anse.app)

**🍿 Live preview**: https://anse.app

> Get more info on https://github.com/anse-app/chatgpt-demo/discussions/247.

## Features

- **🚀 Powerful Plugin System** - Powered by `Provider plugin` , easy to extend AI platforms such as [OpenAI](https://ai.com/), [Bing ChatGPT](https://dub.sh/NUB7OHp), and also supports custom model parameters.
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

## Deploy

### Deploy With Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anse-app/anse)


![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230428/image.26ujbsqdg8g0.png)

### Deploy With Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/anse-app/anse)

**Step-by-step deployment tutorial:**

1. [Fork](https://github.com/anse-app/anse/fork) this project，Go to [https://app.netlify.com/start](https://app.netlify.com/start) new Site, select the project you `forked` done, and connect it with your `GitHub` account.

![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230428/image.4f39uw469xxc.png)

![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230428/image.25j9vb69r534.png)


2. Select the `main` branch, select the default build command and output directory, Click the `Deploy Site` button to start deploying the site。

![image](https://cdn.staticaly.com/gh/yzh990918/static@master/20230428/image.qibvac65l1c.png)


### Deploy with Docker

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Vghs2p?referralCode=qLUU2s)

[Docker Hub address](https://hub.docker.com/r/ddiu8081/anse).

**Direct run**
```bash
docker run -p 3000:3000 -d ddiu8081/anse:latest
```

**Docker compose**
```yml
version: '3'
services:
  anse-demo:
    image: ddiu8081/anse:latest
    container_name: anse
    restart: always
    ports:
      - '3000:3000'
```

```bash
# start
docker compose up -d
# down
docker-compose down
```

### Deploy on more servers

Please refer to the official deployment documentation：https://docs.astro.build/en/guides/deploy

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

[![img](https://contributors.nn.ci/api?repo=anse-app/anse)](https://github.com/anse-app/anse/graphs/contributors)

## License

MIT © [ddiu8081](https://github.com/anse-app/anse/blob/main/LICENSE)
