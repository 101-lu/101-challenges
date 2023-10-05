import { Resizeable } from 'src/components/Resizeable'
import { EmojiPicker } from './components/EmojiPicker'

/**
 * Create a responsive <EmojiPicker/> in react
 *
 * |> DEMO: https://challenges.101.lu/ <|
 * Your component does not need to look or match the demo 100%. You very likley won't finish in less than 1h and try and get as far
 * as you can, and maybe explain your thought process. Adapt the App component how you see fit.
 *
 * - src/static/emojis.json contains categorized emojis including keywords for each one
 * - The emoji data or your component should be lazy loaded when the component mounts. Show an appropriate loading state
 * - Render the emojis by category like in the demo, with categories at the top that should scroll you to the right category on click
 * - Aria label the emojis correctly
 * - Add a search to filter emojis by the keywords and name
 * - Try to keeping the search fast by reducing the amount of emojis rendered during typing
 *
 *
 * If you have time:
 * - Keep track of most used emojis using any Storage interface (https://developer.mozilla.org/en-US/docs/Web/API/Storage) provided to
 *   the component. Do not update the rendered list while the component is mounted to prevent shifts while using the component, only
 *   after it was reopened or in the case of localStorage the site was refreshed.
 *
 * If you have more time (kinda more difficult):
 * - Add keyboard accessibility/navigation insdie the emoji grid like in the demo: https://challenges.101.lu/demo.mp4
 *
 * gl 🙂
 */

/**
 * App
 */

export const App = () => {
  const [value, setValue] = React.useState('')

  return (
    <div className='fixed inset-0 flex overflow-y-auto overflow-x-hidden'>
      <div className='w-min my-auto mx-auto'>
        <Resizeable initial={395} min={350}>
          <input
            className='w-full mb-7 text-xl py-2.5 px-4 border-[1px] border-gray-200 rounded-lg'
            onChange={e => setValue(e.target.value)}
            placeholder='...'
            value={value}
          />

          <EmojiPicker onPick={() => {}} />
        </Resizeable>
      </div>
    </div>
  )
}
