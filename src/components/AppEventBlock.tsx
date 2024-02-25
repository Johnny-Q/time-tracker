import { formatDuration } from "../utils";

type AppEventBlockProps = {
    app: string;
    startTime: string;
    duration: number;
  }
const AppEventBlock = ({app, startTime, duration}: AppEventBlockProps) => {
  return (
    <div className="p-4 w-full flex flex-row gap-4">
      <h1 className="">{startTime}</h1>
      <div className="flex grow flex-row justify-between">
        <h1>{app}</h1>
        <h2>{formatDuration(duration)}</h2>
      </div>
    </div>
  )
}

export default AppEventBlock;