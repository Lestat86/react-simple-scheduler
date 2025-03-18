type Props = {
  placeHolderDays: number
}

const PlaceHolderDayComponent = ({ placeHolderDays }: Props) => {
  const placeHolders = [...Array(placeHolderDays).keys()]

  return placeHolders.map((_current, idx) => (
    <div key={`placeholder_${idx}`} className='p-4 w-20 h-20 border border-gray-200' />
  ))

}

export default PlaceHolderDayComponent
