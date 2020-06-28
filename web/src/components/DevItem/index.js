import React from "react";

import "./style.css";

const DevItem = ({ developer}) => {
    return <li className="dev-item">
        <header>
            <img src={developer.avatar_url} alt={developer.name} />
            <div className="user-info">
                <strong>{developer.name}</strong>
                <span>{developer.techs.join(", ")}</span>
            </div>
        </header>
        <p>{developer.bio}</p>
        <a href={`https://github.com/${developer.github_username}`}>Access github profile</a>
    </li>;
};

export default DevItem;