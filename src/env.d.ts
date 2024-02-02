/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    auth: import('lucia').AuthRequest
  }
}

interface ImportMetaEnv {
  readonly OPENAI_API_KEY: string
  readonly HTTPS_PROXY: string
  readonly OPENAI_API_BASE_URL: string
  readonly HEAD_SCRIPTS: string
  readonly SECRET_KEY: string
  readonly SITE_PASSWORD: string
  readonly OPENAI_API_MODEL: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./logics/lucia').Auth
  interface DatabaseUserAttributes {
    username: string
  }
  interface DatabaseSessionAttributes {}
}
