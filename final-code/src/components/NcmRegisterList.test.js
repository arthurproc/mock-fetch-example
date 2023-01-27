import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ncmData } from '../mock/ncmData';
import { mockFetch } from '../utils/test-utils';

let mockedFetch;

beforeEach(() => {
  mockedFetch = mockFetch();
});

afterEach(() => {
  mockedFetch.mockRestore();
});

describe('Test NcmRegisterList component', () => {
  it('calls the api with the right endpoint on page load', async () => {
    render(<App />);

    await screen.findAllByRole('heading', {
      level: 5,
      name: `Código: ${ncmData[0].codigo}`
    });
    expect(global.fetch).toHaveBeenCalledWith('https://brasilapi.com.br/api/ncm/v1');
  });

  it('renders the ncm register list on page load', async () => {
    render(<App />);

    for (let i=0; i < ncmData.length; i += 1) {
      const mockedRegister = ncmData[i];
      const cardTitle = (await screen.findAllByRole('heading', {
        level: 5,
        name: `Código: ${mockedRegister.codigo}`
      }))[0];

      const cardDescription = (await screen.findAllByRole('heading', {
        level: 5,
        name: `Número do ato: ${mockedRegister.numero_ato}`
      }))[0];

      const cardText = (await screen.findAllByText(mockedRegister.descricao))[0];

      const cardFooter = (await screen.findAllByText(`Data de registro ${mockedRegister.data_inicio}`))[0];

      expect(cardTitle).toBeInTheDocument();
      expect(cardDescription).toBeInTheDocument();
      expect(cardText).toBeInTheDocument();
      expect(cardFooter).toBeInTheDocument();
    }
  });
})