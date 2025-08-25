import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Chat from './Pages/Chat';
import History from './Pages/History';
import New from './Pages/New';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />}>
      <Route index element={<New />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/history" element={<History />} />
      </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
