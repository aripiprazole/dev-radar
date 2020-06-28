import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import api from "./services/api";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

const App = () => {
  const [developers = [], setDevelopers] = useState([]);
  useEffect(() => {
    const loadDevs = async () => {
      const data = await api.get("/developers");
      setDevelopers(data.data.devs);
    }
    loadDevs();
  }, []);
  async function handleSubmit(data) {
    const res = await api.post("/developers", data);
    setDevelopers([...developers, res.data.developer]);
  }
  return (
    <>
      <div id="app">
        <aside>
          <strong>Register</strong>
          <DevForm onSubmit={handleSubmit} />
        </aside>
        <main>
          <ul>
            {developers.map(developer => (
              <DevItem key={developer._id} developer={developer} />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
