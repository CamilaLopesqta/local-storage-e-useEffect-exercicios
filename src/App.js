import { useEffect, useState } from "react";
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from "./style";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [valorDoInput, setValorDoInput] = useState("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const tarefasString = JSON.stringify(tarefas);
    if (tarefas.length > 0) {
      localStorage.setItem("tarefa", tarefasString);
    }
  }, [tarefas]);

  useEffect(() => {
    const pegarTarefas = JSON.parse(localStorage.getItem("tarefa"));
    if (pegarTarefas) {
      setTarefas(pegarTarefas);
    }
  }, []);

  const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value);
  };

  const criarTarefa = () => {
    const guardarValor = {
      id: Date.now(),
      texto: valorDoInput,
      completa: false,
    };
    const copiaEstado = [...tarefas, guardarValor];
    //para evitar adição tarefas em branco
    if (valorDoInput.trim() !== "") {
      //para mudar o estado tarefas
      setTarefas(copiaEstado);
      //para deixar o espaço que vou digitar em branco
      setValorDoInput("");
    }
  };

  const selecionarTarefa = (id) => {
    const tarefasAtualizadas = tarefas.map((item) => {
      if (item.id === id) {
        return { ...item, completa: !item.completa };
      } else {
        return item;
      }
    });
    setTarefas(tarefasAtualizadas);
  };

  const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value);
  };

  const listaFiltrada = tarefas.filter((tarefa) => {
    switch (filtro) {
      case "pendentes":
        return !tarefa.completa;
      case "completas":
        return tarefa.completa;
      default:
        return true;
    }
  });

  return (
    <DivContainer>
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={valorDoInput} onChange={pegarValorDoInput} />
        <button onClick={criarTarefa}> Adicionar </button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={pegarValorDoSelect}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <ListaDeTarefas>
        {listaFiltrada.map((tarefa) => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selecionarTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          );
        })}
      </ListaDeTarefas>
    </DivContainer>
  );
}

export default App;
