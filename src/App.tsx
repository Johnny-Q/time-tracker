import AppEventBlock from './components/AppEventBlock';
import WindowEventBlock from './components/WindowEventBlock';
import { AppEventGroup, WindowEvent, useEvents } from './utils';

function App() {
  const events = useEvents();
  return (
    <div className='min-w-[320px] min-h-screen w-full flex flex-col p-4'>
      {
        events.map((event: AppEventGroup, i) => {
          return (
            <AppEventBlock key={i} app={event.app} startTime={event.start_time.format("h:mm A")} duration={event.duration} />
          )
        })
      }
    </div>
  )
}

export default App
