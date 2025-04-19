import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Full_DashBoard.jsx";
import Insights from "./pages/Insights";
import MapPage from "./pages/MapPage.jsx";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route element={<MainPage />}>
            <Route path="/" element={<Home />} />
             <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
           <Route path="/map" element={<MapPage />} />
          </Route>


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
