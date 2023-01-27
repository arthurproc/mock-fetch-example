import React, { useState } from 'react';
import Card from './Card';

const SearchCep = () => {
  const [searchCep, setSearchCep] = useState('');
  const [cepResult, setCepResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${searchCep}`);
    const cepData = await response.json();
    setCepResult(cepData);
  };

  return (
    <div className='m-3'>
      <h1>Buscar CEP</h1>
      <div className='row'>
        <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
          <div className="input-group m-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              value={searchCep}
              onChange={(e) => setSearchCep(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="submit">
              Pesquisar
            </button>
          </div>
        </form>
      </div>
      {
        cepResult &&
        <Card
          title={ `${cepResult.street}` }
          description={ `${cepResult.city}, Bairro: ${cepResult.neighborhood}` }
          text={ `Estado: ${cepResult.state}` }
          footer={`Coordenadas: ${cepResult.location.coordinates.latitude}/${cepResult.location.coordinates.longitude}`} 
        />
      }
    </div>
  );
};

export default SearchCep;
