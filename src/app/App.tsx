import { Route, Routes } from 'react-router-dom'
import './styles/index.scss';
import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { classNames } from '../shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Link to='/about'>
        О сайте
      </Link>
      <Link to='/'>
        Главная
      </Link>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App