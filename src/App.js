import React, { useState, useEffect } from "react";
import api from "./services/api";
import './App.css';

export default function App() {
  const [personagens, setPersonagens] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  
  useEffect(() => {
    api.get('/?page=19')
      .then(resp => setPersonagens(resp.data.results))
      .catch(err => console.log("erro na chamada", err));
  }, []);

  const filtrarPersonagem = (person) => {
    if (filtro === "Todos") return true;
    if (filtro === "Humanos") return person.species === "Human";
    if (filtro === "Alienígenas") return person.species === "Alien";
    return true;
  };

  const personagensFiltrados = personagens.filter(filtrarPersonagem);

  return (
    <>
      <header className="header">
        <h1 className="titulo-neon">Rick and Morty</h1>
      </header>

      <div className="filtros">
        <button onClick={() => setFiltro("Todos")}>🌌 Todos</button>
        <button onClick={() => setFiltro("Humanos")}>👨‍🚀 Humanos</button>
        <button onClick={() => setFiltro("Alienígenas")}>👾 Alienígenas</button>
      </div>

      <div className="container-filmes">
        {personagensFiltrados.map((person) => (
          <div key={person.id} className="card-glow">
            <img src={person.image} alt={person.name} />
            <div className="info">
              <h2>{person.name}</h2>
              <p><strong>Espécie:</strong> {person.species}</p>
              <p><strong>Tipo:</strong> {person.type || "Desconhecido"}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
