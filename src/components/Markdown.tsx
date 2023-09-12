import { Show, createSignal } from 'solid-js'
import { useClipboard, useEventListener } from 'solidjs-use'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import rehypePrism from '@mapbox/rehype-prism'
import 'katex/dist/katex.min.css'

interface Props {
  class?: string
  text: string
  showRawCode?: boolean
}

const parseMarkdown = (raw: string) => {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrism, {
      ignoreMissing: true,
    })
    .use(rehypeKatex)
    .use(rehypeStringify)
    .processSync(raw)
  return String(file)
}

export default (props: Props) => {
  const [source] = createSignal('')
  const { copy, copied } = useClipboard({ source, copiedDuring: 1000 })

  useEventListener('click', (e) => {
    const el = e.target as HTMLElement
    let code = null

    if (el.matches('div > div.copy-btn')) {
      code = decodeURIComponent(el.dataset.code!)
      copy(code)
    }
    if (el.matches('div > div.copy-btn > svg')) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      code = decodeURIComponent(el.parentElement?.dataset.code!)
      copy(code)
    }
  })

  const htmlString = () => {
    if (props.showRawCode) return props.text

    const raw = parseMarkdown(props.text)

    // Replace the code block with a custom HTML structure that includes a copy button
    const codeBlockRegex = /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g
    const newHtml = raw.replace(codeBlockRegex, (match) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(match, 'text/html')
      const codeElement = doc.querySelector('code')
      const code = codeElement ? codeElement.textContent : ''

      return `<div relative>
        <div data-code=${encodeURIComponent(code)} class="copy-btn code-copy-btn group">
          ${
            copied()
              ? '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z"/></svg>'
              : '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z"/><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z"/></svg>'
          }
          <div class="group-hover:op-90 code-copy-tips">
            ${copied() ? 'Copied' : 'Copy'}
          </div>
        </div>
        ${match}
      </div>`
    })

    return newHtml
  }

  return (
    <Show when={props.showRawCode} fallback={<div class={props.class ?? ''} innerHTML={htmlString()} />}>
      <div class={`${props.class ?? ''} whitespace-pre-wrap overflow-auto my-0`} innerText={htmlString()} />
    </Show>
  )
}
