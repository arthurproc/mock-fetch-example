import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ncmMockList } from '../tests/ncmData';


describe('Test ProductList tab', () => {
  it('calls the api with the right endpoint on page load', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(ncmMockList),
    }));
    render(<App />);

    expect(global.fetch).toHaveBeenCalledWith('https://brasilapi.com.br/api/ncm/v1');
  });

  it('renders the products list from ncm on page load', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(ncmMockList),
    }));
    render(<App />);

    for (let i=0; i < ncmMockList.length; i += 1) {
      const mockedProduct = ncmMockList[i];
      const cardTitle = (await screen.findAllByRole('heading', {
        level: 5,
        name: `Código: ${mockedProduct.codigo}`
      }))[0];

      const cardDescription = (await screen.findAllByRole('heading', {
        level: 5,
        name: `Número do ato: ${mockedProduct.numero_ato}`
      }))[0];

      const cardText = (await screen.findAllByText(mockedProduct.descricao))[0];

      const cardFooter = (await screen.findAllByText(`Data de registro ${mockedProduct.data_inicio}`))[0];

      expect(cardTitle).toBeInTheDocument();
      expect(cardDescription).toBeInTheDocument();
      expect(cardText).toBeInTheDocument();
      expect(cardFooter).toBeInTheDocument();
    }
  });
})