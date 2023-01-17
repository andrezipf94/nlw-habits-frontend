import './styles/global.css';

import Habit from "./components/Habit";

function App() {
  return (
    <div className="App">
      <Habit completed={13}/>
    </div>
  )
}

export default App
