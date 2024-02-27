import AppEventBlock from './components/AppEventBlock';
import WindowEventBlock from './components/WindowEventBlock';
import { AppEventGroup, WindowEvent, mergeSameAppEvents, useWindowEvents } from './utils';

function App() {
  const windowEvents = useWindowEvents();
  const appEvents = mergeSameAppEvents(windowEvents);

  return (
    <div className='flex flex-row'>
      <div className='min-w-[320px] min-h-screen basis-[320px] grow flex flex-col p-4'>
        {
          windowEvents.map((event: WindowEvent, i) => {
            return (
              <WindowEventBlock key={i} name={event.data.title} startTime={event.start_time.format("h:mm A")} duration={event.duration} />
            )
          })
        }
      </div>

      <div className='min-w-[320px] min-h-screen basis-[320px] grow flex flex-col p-4'>
        {
          appEvents.map((event: AppEventGroup, i) => {
            return (
              <AppEventBlock key={i} app={event.app} startTime={event.start_time.format("h:mm A")} duration={event.duration} />
            )
          })
        }
      </div>
    </div>
  )
}

export default App
