import React from 'react';
import {useNavigate} from 'react-router-dom';

export function Menu() {
    const [id, setId] = React.useState('');
    const navigate = useNavigate();
    function createGame() {
        localStorage.setItem('gameId', id);
        navigate('/play');
    }

    function joinGame() {
        navigate('/play');
    }

    function Logout() {
        if (localStorage.getItem('user') != null) {
            localStorage.removeItem('user');
            navigate('/');
        }
    }
    return (
        <main>
            Game Id:
            <input type="text"></input>
            <br></br>
            <button onClick={createGame}>Create Game</button>
            <button onClick={joinGame}>Join Game</button>
            <button onClick={Logout}>Logout</button>
        </main>
    )
}