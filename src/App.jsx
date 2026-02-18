import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Career from './pages/Career';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ClientSuccess from './pages/ClientSuccess';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cyan-400">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client-success" element={<ClientSuccess />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback for undefined routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
