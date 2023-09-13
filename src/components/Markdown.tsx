import { Show, createSignal, createEffect, on } from 'solid-js'
import { makeEventListener } from '@solid-primitives/event-listener'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import rehypePrism from '@mapbox/rehype-prism'
import { useClipboardCopy } from '@/hooks'
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
  const [copied, copy] = useClipboardCopy(source())
  const [copiedIndex, setCopiedIndex] = createSignal(-1)

  makeEventListener(document, 'click', (e) => {
    const el = e.target as HTMLElement
    if (el.matches('div > div.code-copy-btn')) {
      setCopiedIndex(parseInt(el.dataset.index!))
      copy(decodeURIComponent(el.dataset.code!))
    }
    if (el.matches('div > div.code-copy-btn > i')) {
      setCopiedIndex(parseInt(el.parentElement?.dataset.index!))
      copy(decodeURIComponent(el.parentElement?.dataset.code!))
    }
  })

  const htmlString = () => {
    if (props.showRawCode) return props.text

    const raw = parseMarkdown(props.text)

    // Replace the code block with a custom HTML structure that includes a copy button
    const codeBlockRegex = /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g
    let index = 0
    const newHtml = raw.replace(codeBlockRegex, (match) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(match, 'text/html')
      const codeElement = doc.querySelector('code')
      const code = codeElement?.textContent || ''

      const result = `<div class="relative">
        <div data-code=${encodeURIComponent(code)} data-index=${index} class="code-copy-btn group">
          ${copied() && copiedIndex() === index ? '<i class="i-carbon-checkmark"></i>' : '<i class="i-carbon-copy"></i>'}
        </div>
        ${match}
      </div>`
      index++
      return result
    })

    return newHtml
  }

  createEffect(on(() => props.text, () => {
    setCopiedIndex(-1)
  }))

  return (
    <Show when={props.showRawCode} fallback={<div class={props.class ?? ''} innerHTML={htmlString()} />}>
      <div class={`${props.class ?? ''} whitespace-pre-wrap overflow-auto my-0`} innerText={htmlString()} />
    </Show>
  )
}
