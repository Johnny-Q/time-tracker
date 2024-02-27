import AppEventBlock from './components/AppEventBlock';
import WindowEventBlock from './components/WindowEventBlock';
import { AppEventGroup, WindowEvent, useAppEvents, useWindowEvents } from './utils';

function App() {
  const appEvents = useAppEvents();
  const windowEvents = useWindowEvents();
  return (
    <div className='flex flex-ro'>
      <div className='min-w-[320px] min-h-screen w-full flex flex-col p-4'>
        {
          appEvents.map((event: AppEventGroup, i) => {
            return (
              <AppEventBlock key={i} app={event.app} startTime={event.start_time.format("h:mm A")} duration={event.duration} />
            )
          })
        }
      </div>
      <div className='min-w-[320px] min-h-screen w-full flex flex-col p-4'>
        {
          windowEvents.map((event: WindowEvent, i) => {
            return (
              <WindowEventBlock key={i} name={event.data.title} startTime={event.start_time.format("h:mm A")} endTime={event.end_time.format("h:mm A")} duration={event.duration}/>
            )
          })
        }
      </div>

    </div>
  )
}

export default App
