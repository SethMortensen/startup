import React from 'react';
import {useNavigate} from 'react-router-dom';

export function Login({setUser}) {
    const [text, setText] = React.useState('');
    const navigate = useNavigate();
    function loginUser() {
        localStorage.setItem('user', text);
        setUser(text);
        navigate('/menu');
    }

    function textChange(e) {
        setText(e.target.value);
    }

    return (
        <main>
            Username:
            <input type="text" onChange={textChange}/>
            <br/>
            <button onClick={loginUser}>Login</button>
        </main>
    )
}