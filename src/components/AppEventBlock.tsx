import { formatDuration } from "../utils";

type AppEventBlockProps = {
    app: string;
    startTime: string;
    duration: number;
  }
const AppEventBlock = ({app, startTime, duration}: AppEventBlockProps) => {
  return (

    <div className="p-4 w-full flex flex-row gap-4 overflow-hidden">
      <h1 className="whitespace-nowrap">{startTime}</h1>
      <div className="grow flex flex-row justify-between overflow-hidden gap-2">
        <div className="grow min-w-0 overflow-hidden whitespace-nowrap">
          <h1>{app}</h1>
        </div>
        <h2 className="whitespace-nowrap">{formatDuration(duration)}</h2>
      </div>
      {/* render child events */}
    </div>
  )
}

export default AppEventBlock;