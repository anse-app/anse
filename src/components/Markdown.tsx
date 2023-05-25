import { Show } from 'solid-js'
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
  const htmlString = () => props.showRawCode ? props.text : parseMarkdown(props.text)

  return (
    <Show when={props.showRawCode} fallback={<div class={props.class ?? ''} innerHTML={htmlString()} />}>
      <div class={`${props.class ?? ''} whitespace-pre-wrap overflow-auto my-0`} innerText={htmlString()} />
    </Show>
  )
}
