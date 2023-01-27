import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { mockFetch } from '../utils/test-util';
import { cepData } from '../mock/cepData';

let mockedFetch;

beforeEach(() => {
  mockedFetch = jest.spyOn(global, 'fetch')
    .mockImplementation(mockFetch)
});

afterAll(() => {
  mockedFetch.mockRestore()
});

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
      name: new RegExp(cepData.street, 'i'),
      level: 5
    });

    const cityAndNeighborhood = await screen.findByRole('heading', {
      name: new RegExp(`${cepData.city}, Bairro: ${cepData.neighborhood}`, 'i'),
      level: 5
    });

    const state = await screen.findByText(`Estado: ${cepData.state}`);

    const coordinates = await screen.findByText(`Coordenadas: ${cepData.location.coordinates.latitude}/${cepData.location.coordinates.longitude}`);

    [street, cityAndNeighborhood, state, coordinates].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('calls CEP endpoint after form fill and submit', async () => {
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

    await screen.findByRole('heading', {
      name: new RegExp(cepData.street, 'i'),
      level: 5
    });

    expect(global.fetch).toHaveBeenCalledWith('https://brasilapi.com.br/api/cep/v2/35900025');
  });
});
