/**
 * EmojiPicker
 */

export const EmojiPicker: React.FC<
  React.ComponentProps<'div'> & { onPick?: (value: string) => void }
> = props => {
  return (
    <div className='h-32 rounded-lg w-full bg-gray-200 flex justify-center items-center'>
      EmojiPicker
    </div>
  )
}
