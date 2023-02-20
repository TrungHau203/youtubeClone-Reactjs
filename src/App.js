import './App.css';
import {Navbar, Feed, VideoDetail, ChannelFeed,SearchFeed} from './components';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className='bg-white'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed/>} />
          <Route path="/search/:searchTerm" element={<SearchFeed/>} />
          <Route path="/videodetail/:id" element={<VideoDetail/>} />
          <Route path="/channeldetail/:id" element={<ChannelFeed/>} />
          <Route path="/channeldetail/:id/searchChannel/:searchContent" element={<ChannelFeed search/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
