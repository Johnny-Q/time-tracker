
type TimeBlockProps = {
  name: string,
  startTime: string,
  endTime: string
}

const TimeBlock = ({ name, startTime, endTime }: TimeBlockProps) => {
  return (
    <div className="p-4 border">
      <h1>{name}</h1>
      <h2>{`${startTime} - ${endTime}`}</h2>
    </div>
  )
}

export default TimeBlock