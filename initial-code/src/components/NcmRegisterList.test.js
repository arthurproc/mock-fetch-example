import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Test NcmRegisterList component', () => {
  it('renders the ncm register list on page load', async () => {
    render(<App />);


    const cardTitle = (await screen.findAllByRole('heading', {
      level: 5,
      name: /Código: 0207.24.00/i
    }))[0];

    const cardDescription = (await screen.findAllByRole('heading', {
      level: 5,
      name: /Número do ato: 000272/i
    }))[0];

    const cardText = (await screen.findAllByText(/-- Não cortadas em pedaços, frescas ou refrigeradas/i))[0];

    const cardFooter = (await screen.findAllByText(/Data de registro 2022-04-01/i))[0];

    expect(cardTitle).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(cardText).toBeInTheDocument();
    expect(cardFooter).toBeInTheDocument();
  });
})