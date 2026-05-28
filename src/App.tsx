import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GalleryLayout from './pages/gallery/GalleryLayout'
import Overview from './pages/gallery/tabs/Overview'
import Setup from './pages/gallery/tabs/Setup'
import YourFirstPR from './pages/gallery/tabs/YourFirstPR'
import WarmUpChallenge from './pages/gallery/tabs/WarmUpChallenge'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryLayout />}>
          <Route index element={<Overview />} />
          <Route path="setup" element={<Setup />} />
          <Route path="first-pr" element={<YourFirstPR />} />
          <Route path="warm-up" element={<WarmUpChallenge />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
