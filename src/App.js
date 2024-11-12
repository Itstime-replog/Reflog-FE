import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Studyplan from './pages/Studyplan';
import Retrospect from './pages/Retrospect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/studyplan" element={<Studyplan />} />
          <Route path="/retrospect" element={<Retrospect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;