import MessageItemBase from './MessageItemBase'
import type { FunctionCallMessage } from '@/types/message'

interface Props {
  functionInput: FunctionCallMessage
}

export default (props: Props) => {
  return (
    <MessageItemBase
      avatarIcon="i-carbon:function-math"
      avatarClass="bg-gradient-to-b from-[#a3a3c9] to-[#8989ba] text-white text-xl"
    >
      <div class="flex flex-col gap-2 items-start">
        <div class="fi px-2 py-0.5 gap-1 bg-base-200 text-sm border border-base rounded">
          <div class="i-carbon:condition-point" />
          <h3>{props.functionInput.name}</h3>
        </div>
        <div class="fi px-2 py-0.5 gap-1 bg-base-200 text-sm border border-base rounded">
          <div class="i-carbon:condition-point" />
          <h3>input</h3>
          <div>{JSON.stringify(props.functionInput.arguments)}</div>
        </div>
        {/* <div class="fi px-2 py-0.5 gap-1 bg-base-200 text-sm border border-base rounded">
          <div class="i-carbon:condition-point" />
          <h3>result</h3>
          <div class="line-clamp-3">{props.result}</div>
        </div> */}
        {/* <div class="fi px-2 py-0.5 gap-1 bg-base-200 text-sm border border-base rounded">
          <div class="i-carbon:condition-point" />
          <h3>output</h3>
        </div> */}
      </div>
    </MessageItemBase>
  )
}
