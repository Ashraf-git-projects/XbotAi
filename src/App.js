import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Pages/Chat';
import History from './Pages/History';
import New from './Pages/New';
import ConversationDetail from './Pages/ConversationDetail';
import { useState } from "react";

function App() {
  // 👇 define messages state here
  const [messages, setMessages] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<New />} />
            
            {/* Pass state into Chat */}
            <Route
              path="/chat"
              element={<Chat messages={messages} setMessages={setMessages} />}
            />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<ConversationDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
