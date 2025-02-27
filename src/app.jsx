import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login'
import { Menu } from './menu/menu'
import { Play } from './play/play'
import { Leaderboards } from './leaderboards/leaderboards'

export default function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <header>
                    <h1>GigaSnake</h1>
                    <h2>By Seth Mortensen</h2>
                    <ul>
                        <li>
                            <NavLink to='/'>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='leaderboards'>
                                Leaderboards
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='menu'>
                                Games
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='play'>
                                Play
                            </NavLink>
                        </li>
                    </ul>
                </header>

                <Routes>
                    <Route path='/' element={<Login/>} exact />
                    <Route path='menu' element={<Menu/>} />
                    <Route path='play' element={<Play/>} />
                    <Route path='Leaderboards' element={<Leaderboards/>} />
                    <Route path='*' element={<Notfound />} />
                </Routes>
                <footer>
                    <a href="https://github.com/SethMortensen/startup">Repository</a>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function Notfound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>
}