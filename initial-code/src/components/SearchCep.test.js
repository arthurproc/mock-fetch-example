import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Test SearchCep tab', () => {
  it('renders CEP search results after form fill and submit', async () => {
    render(<App />);

    const cepSearchTabButton = screen.getByRole('button', {
      name: /cep search/i
    });

    userEvent.click(cepSearchTabButton);

    const searchInput = screen.getByRole('textbox', {
      name: /pesquisar/i
    });

    const searchButton = screen.getByRole('button', {
      name: /pesquisar/i
    });

    userEvent.type(searchInput, '35900025');

    userEvent.click(searchButton);

    const street = await screen.findByRole('heading', {
      name: /avenida carlos drumond de andrade/i,
      level: 5
    });

    const cityAndNeighborhood = await screen.findByRole('heading', {
      name: /itabira, bairro: centro/i,
      level: 5
    });

    const state = await screen.findByText(/estado: mg/i);

    const coordinates = await screen.findByText(/coordenadas: -19\.619913\/-43\.2244008/i);

    [street, cityAndNeighborhood, state, coordinates].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('calls CEP endpoint after form fill and submit', () => {
    const mockedFetch = jest.spyOn(global, 'fetch');
    render(<App />);

    const cepSearchTabButton = screen.getByRole('button', {
      name: /cep search/i
    });

    userEvent.click(cepSearchTabButton);

    const searchInput = screen.getByRole('textbox', {
      name: /pesquisar/i
    });

    const searchButton = screen.getByRole('button', {
      name: /pesquisar/i
    });

    userEvent.type(searchInput, '35900025');

    userEvent.click(searchButton);

    expect(mockedFetch).toHaveBeenCalledWith('https://brasilapi.com.br/api/cep/v2/35900025');
  });
});
