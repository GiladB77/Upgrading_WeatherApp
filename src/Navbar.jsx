import React from 'react';
import './App.css';


function Navbar(props) {
    return (
        <div className="row">
            <div className="container">
                <form className="region" onSubmit={(e) => props.changeWeather(e)}>
                    <input className="regioninput" placeholder="Enter Location"
                        onChange={(e) => props.changeRegion(e.target.value)} />
                </form>
            </div>
        </div>
    )
}
export default Navbar;