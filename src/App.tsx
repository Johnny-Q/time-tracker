import WindowEventBlock from './components/WindowEventBlock';
import { AppEventGroup, WindowEvent, useEvents } from './utils';

function App() {
  const events = useEvents();
  return (
    <div className='min-w-[320px] min-h-screen w-full flex flex-col p-4'>
      {
        events.map((event: WindowEvent, i) => {
          console.log(event.data.title, event.data.app);
          return (
            <WindowEventBlock key={i} name={event.data.title} startTime={event.start_time.format("h:mm A")} endTime={event.end_time.format("hh:mm:ss")} duration={event.duration} />
          )
        })
      }
    </div>
  )
}

export default App
