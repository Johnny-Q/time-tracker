
type WindowEventBlockProps = {
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
}

const WindowEventBlock = ({ name, startTime, endTime, duration }: WindowEventBlockProps) => {
  const SECOND = 1;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;

  const hours = Math.floor(duration/HOUR);
  duration = duration % HOUR;
  const minutes = Math.floor(duration/MINUTE);
  duration = duration % MINUTE;
  const seconds = Math.floor(duration/SECOND);

  const duration_str_builder = [
    hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '',
    minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '',
    `${seconds} second${seconds != 1 ? 's' : ''}`,
  ].filter(part => part !== '');

  const duration_str = duration_str_builder.join(' ');

  return (
    <div className="p-4 w-full flex flex-row gap-4">
      <h1 className="">{startTime}</h1>
      <div className="flex grow flex-row justify-between">
        <h1>{name}</h1>
        <h2>{duration_str}</h2>
      </div>
    </div>
  )
}

export default WindowEventBlock