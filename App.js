import './App.css';
import React, { Component } from 'react';

function App() {

  class ListaDeItens extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pokemons: [],
        novoPokemon: { id: 1, nome: '', tipo: '' },
        editandoPokemon: null,
      };
    }
  
    adicionarPokemon = () => {
      let { novoPokemon, pokemons } = this.state;
      if (novoPokemon.nome && novoPokemon.tipo) {
        this.setState((prevState) => ({
          pokemons: [...prevState.pokemons, { ...novoPokemon }],
          novoPokemon: { id: novoPokemon.id + 1, nome: '', tipo: '' },
          editandoPokemon: null,
        }));
      }
    };
  
    editarPokemon = (pokemon) => {
      this.setState({
        editandoPokemon: { ...pokemon },
      });
    };
  
    salvarEdicao = () => {
      let { editandoPokemon, pokemons } = this.state;
      let index = pokemons.findIndex((p) => p.id === editandoPokemon.id);
  
      if (index !== -1) {
        let novosPokemons = [...pokemons];
        novosPokemons[index] = { ...editandoPokemon };
  
        this.setState({
          pokemons: novosPokemons,
          editandoPokemon: null,
        });
      }
    };
  
    excluirPokemon = (pokemon) => {
      let { pokemons } = this.state;
      let index = pokemons.findIndex((p) => p.id === pokemon.id);
      if (index !== -1) {
        pokemons.splice(index, 1);
        this.setState({
          pokemons: [...pokemons],
        });
      }
    };
  
    cancelarEdicao = () => {
      this.setState({
        editandoPokemon: null,
      });
    };
  
    render() {
      let { pokemons, novoPokemon, editandoPokemon } = this.state;
  
      return (
        <div>
          <div className="sticky-header">
            <h3>Adicionar Pokemon</h3>
            <div>
              <input
                type="text"
                value={novoPokemon.nome}
                placeholder="Nome"
                onChange={(e) => this.setState({ novoPokemon: { ...novoPokemon, nome: e.target.value } })}
              />
              <input
                type="text"
                value={novoPokemon.tipo}
                placeholder="Tipo"
                onChange={(e) => this.setState({ novoPokemon: { ...novoPokemon, tipo: e.target.value } })}
              />
              <button className="add-button" onClick={this.adicionarPokemon}>
                Adicionar
              </button>
            </div>
          </div>
  
          {editandoPokemon && (
            <div className="edit-section">
              <h3>Editar Pokemon</h3>
              <div>
                <input
                  type="text"
                  value={editandoPokemon.nome}
                  onChange={(e) => this.setState({ editandoPokemon: { ...editandoPokemon, nome: e.target.value } })}
                />
                <input
                  type="text"
                  value={editandoPokemon.tipo}
                  onChange={(e) => this.setState({ editandoPokemon: { ...editandoPokemon, tipo: e.target.value } })}
                />
                <button className="save-button" onClick={this.salvarEdicao}>
                  Salvar
                </button>
                <button className="cancel-button" onClick={this.cancelarEdicao}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
  
          <div>
            <ul>
              {pokemons.map((pokemon) => (
                <li key={pokemon.id}>
                  <p>
                    {pokemon.nome} - {pokemon.tipo}
                  </p>
                  <button className="edit-button" onClick={() => this.editarPokemon(pokemon)}>
                    Editar
                  </button>
                  <button className="delete-button" onClick={() => this.excluirPokemon(pokemon)}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }


  return (
    <div className="App">
      <h1>Lista de Pokémons</h1>
      <ListaDeItens />
    </div>
  );

}

export default App;
