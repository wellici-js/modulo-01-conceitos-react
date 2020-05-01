import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await api.get("/repositories");
      const { data, status } = response;

      if (status === 200) {
        setRepositories([...repositories, ...data]);
      }
    })();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",
      techs: [""],
    });

    const { data, status } = response;

    if (status === 200) {
      setRepositories([...repositories, data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    const { status } = response;

    if (status === 204) {
      const residueRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories([...residueRepositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
