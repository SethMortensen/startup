import React from 'react';

export function Leaderboards() {
    return (
        <main>
            High Scores
            <ol>
                <li>{JSON.parse(localStorage.getItem('scores'))[0]}</li>
                <li>{JSON.parse(localStorage.getItem('scores'))[1]}</li>
                <li>{JSON.parse(localStorage.getItem('scores'))[2]}</li>
                <li>{JSON.parse(localStorage.getItem('scores'))[3]}</li>
                <li>{JSON.parse(localStorage.getItem('scores'))[4]}</li>
            </ol>
        </main>
    )
}