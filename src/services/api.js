// Importa a biblioteca axios, que é usada para fazer requisições HTTP
import axios from "axios";

// Cria uma instância do axios com uma URL base pré-definida.
// Essa URL será usada como base para todas as requisições feitas com essa instância.
// Ou seja, você só precisa informar o endpoint complementar ao fazer a requisição.
const api = axios.create({
    baseURL : 'https://rickandmortyapi.com/api/character'
})

// Exporta a instância do axios criada para que ela possa ser utilizada em outros arquivos do projeto
export default api;
