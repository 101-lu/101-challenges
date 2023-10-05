import { useDrag } from '@use-gesture/react'

export const Resizeable: React.FC<{
  initial: number
  min: number
  children: React.ReactNode
}> = props => {
  const [width, setWidth] = React.useState(props.initial)

  const setClampedWidth = (w: (width: number) => number) =>
    setWidth(width => Math.min(Math.max(w(width), props.min), window.innerWidth - 200))

  const bindDrag = useDrag(state => {
    setClampedWidth(w => w + state.delta[0] * 2)
  })

  useEventListener('resize', () => setClampedWidth(w => w))

  return (
    <div className='relative flex items-center gap-6'>
      <div style={{ width }}>{props.children}</div>

      <div
        className='w-1.5 h-20 bg-gray-200 rounded-full hover:bg-gray-400 cursor-ew-resize touch-none transition-all'
        {...bindDrag()}
      ></div>
    </div>
  )
}

// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: React.RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void

// Element Event based useEventListener interface
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: React.RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void
>(
  eventName: KW | KH | KM,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | MediaQueryListEventMap[KM] | Event
  ) => void,
  element?: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
) {
  // Create a ref that stores handler
  const savedHandler = React.useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  React.useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current ?? window

    if (!(targetElement && targetElement.addEventListener)) return

    // Create event listener that calls handler function stored in ref
    const listener: typeof handler = event => savedHandler.current(event)

    targetElement.addEventListener(eventName, listener, options)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, listener, options)
    }
  }, [eventName, element, options])
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect
