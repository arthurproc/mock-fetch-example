import React, { useState } from 'react';
import Card from './Card';

const SearchBook = () => {
  const [searchISBN, setSearchISBN] = useState('');
  const [book, setBook] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://brasilapi.com.br/api/isbn/v1/${searchISBN}`);
    const bookData = await response.json();
    setBook(bookData);
  };

  return (
    <div className='container'>
      <h1>Buscar ISBN</h1>
      <div className='row'>
        <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
          <div className="input-group m-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              value={searchISBN}
              onChange={(e) => setSearchISBN(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="submit">
              Pesquisar
            </button>
          </div>
        </form>
      </div>
      {
        book &&
        <div className='row'>
          <Card
            title={ book.title }
            description={ `Assuntos: ${book.subjects.join(', ')}`  }
            text={ book.synopsis }
            footer={`De ${book.authors.join(', ')}`} 
          />
        </div>
      }
    </div>
  );
};

export default SearchBook;
