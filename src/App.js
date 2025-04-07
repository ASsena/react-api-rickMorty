// Importa o React e os hooks useState e useEffect
import React, { useState, useEffect } from "react";
// Importa uma instância do axios configurada (deve estar em './services/api')
import api from "./services/api";
// Importa o CSS do componente
import './App.css';

export default function App() {
  // Cria um estado para armazenar a lista de personagens da API
  const [personagens, setPersonagens] = useState([]);
  // Cria um estado para armazenar o filtro atual selecionado (Todos, Humanos ou Alienígenas)
  const [filtro, setFiltro] = useState("Todos");
  
  // useEffect é executado uma vez ao montar o componente
  useEffect(() => {
    // Faz uma requisição GET para a API (página 19 dos personagens)
    api.get('/?page=19')
      .then(resp => setPersonagens(resp.data.results)) // Armazena os personagens no estado
      .catch(err => console.log("erro na chamada", err)); // Em caso de erro, mostra no console
  }, []);

  // Função que aplica o filtro escolhido nos personagens
  const filtrarPersonagem = (person) => {
    if (filtro === "Todos") return true; // Mostra todos os personagens
    if (filtro === "Humanos") return person.species === "Human"; // Filtra só humanos
    if (filtro === "Alienígenas") return person.species === "Alien"; // Filtra só alienígenas
    return true; // Fallback (caso o filtro seja diferente dos esperados)
  };

  // Aplica o filtro à lista de personagens
  const personagensFiltrados = personagens.filter(filtrarPersonagem);

  return (
    <>
      {/* Cabeçalho com título */}
      <header className="header">
        <h1 className="titulo-neon">Rick and Morty</h1>
      </header>

      {/* Botões para aplicar os filtros */}
      <div className="filtros">
        <button onClick={() => setFiltro("Todos")}>🌌 Todos</button>
        <button onClick={() => setFiltro("Humanos")}>👨‍🚀 Humanos</button>
        <button onClick={() => setFiltro("Alienígenas")}>👾 Alienígenas</button>
      </div>

      {/* Lista de cards dos personagens filtrados */}
      <div className="container-filmes">
        {personagensFiltrados.map((person) => (
          <div key={person.id} className="card-glow">
            <img src={person.image} alt={person.name} />
            <div className="info">
              <h2>{person.name}</h2>
              <p><strong>Espécie:</strong> {person.species}</p>
              <p><strong>Tipo:</strong> {person.type || "Desconhecido"}</p>
              {/* Se o tipo estiver vazio, mostra "Desconhecido" */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
