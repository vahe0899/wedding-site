import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ParentsPage from "./ParentsPage";
import FriendsPage from "./FriendsPage";
import NotFoundPage from "./NotFoundPage";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Роуты */}
        <Routes>
          <Route path="/roditeli" element={<ParentsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
