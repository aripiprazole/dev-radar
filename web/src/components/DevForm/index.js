import React, { useEffect, useState } from "react";

import "./style.css";

const DevForm = ({ onSubmit }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setLatitude(latitude); setLongitude(longitude);
        }, err => console.error(err),
            {
                timeout: 30000
            })
    }, []);
    function handleSubmit(ev) {
        ev.preventDefault();
        onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        setGithubUsername(""); setTechs("");
    }
    return <form onSubmit={handleSubmit}>
        <div className="input-block">
            <label htmlFor="github_username">Github Username</label>
            <input type="username" name="github_username" id="github_username" required onChange={e => setGithubUsername(e.target.value)} />
        </div>
        <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input type="text" name="techs" id="techs" onChange={e => setTechs(e.target.value)} />
        </div>
        <div className="input-group">
            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input type="number" name="longitude" id="longitude" step="0.1" required onChange={e => setLongitude(e.target.value)} value={longitude} />
            </div>
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" name="latitude" id="latitude" step="0.1" required onChange={e => setLatitude(e.target.value)} value={latitude} />
            </div>
        </div>
        <button type="submit">Submit</button>
    </form>;
};

export default DevForm;