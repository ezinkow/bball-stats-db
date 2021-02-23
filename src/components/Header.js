import React from 'react';

export default function Header() {
    return (
        <>
            <div className="header">
                <div className="homeBtn">
                    <a href="/" syle={{color:"white", textDecoration: 'none'}}>HOME</a>
                </div>
                <div className="mainText">
                    <h1>WELCOME BASKETBALL FANS</h1>
                    <h3>Get stats for any player in our database</h3>
                </div>
            </div>
        </>
    );
}