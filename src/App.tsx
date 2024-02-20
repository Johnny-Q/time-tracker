import TimeBlock from './components/TimeBlock'
// import './index.css'

/*
  min-width: 320px;
  min-height: 100vh;*/
function App() {

  return (
    <div className='min-w-[320px] min-h-screen w-full flex flex-col p-4'>
      <TimeBlock name="Thing 1" startTime="12:30" endTime="1:30" />
    </div>
  )
}

export default App
