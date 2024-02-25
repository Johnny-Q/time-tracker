import { formatDuration } from "../utils";

type WindowEventBlockProps = {
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
}

const WindowEventBlock = ({ name, startTime, endTime, duration }: WindowEventBlockProps) => {
  return (
    <div className="p-4 w-full flex flex-row gap-4">
      <h1 className="">{startTime}</h1>
      <div className="flex grow flex-row justify-between">
        <h1>{name}</h1>
        <h2>{formatDuration(duration)}</h2>
      </div>
    </div>
  )
}

export default WindowEventBlock