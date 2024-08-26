import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { notification, Button } from 'antd';

// Pages
import Homepage from './pages/homepage';
import PageNotFound from './pages/pageNotFound';
import SearchBySport from './pages/searchBySport';
import Privacy from './pages/privacy';
// import TOC from './pages/toc';
import Contact from './pages/contact';
import MLBGame from './pages/mlbgame';
import Results from './pages/results';
import NFLGame from './pages/nflgame';
import Account from './pages/account';
import Login from './pages/login';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    if (localStorage.getItem('cookies') !== 'true'){
      openNotification();
    }
  }, [])

  const [api, contextHolder] = notification.useNotification();
    const onClose = () => {
        localStorage.setItem('cookies', 'true')
    }
    const openNotification = () => {
        const key = `open${Date.now()}`
        const btn = (
            <Button type='primary' size='small' onClick={() => api.destroy(key)}>
                Accept
            </Button>
        )
        api.open({
            message: "Cookie Policy",
            description: "This website uses cookies. For more info, read our privacy policy at sportsaibet.com/privacy",
            btn,
            key,
            placement: 'bottom',
            onClose: onClose
        })
    }

  return (
    <BrowserRouter>
      {contextHolder}
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/getpicks' element={<SearchBySport/>}/>
        <Route path='/mlb/:id' element={<MLBGame/>}/>
        <Route path='/nfl/:id' element={<NFLGame/>}/>
        <Route path='/results' element={<Results/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        {/* <Route path='/toc' element={<TOC/>}/>*/}
        <Route path='/account' element={<Account/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
