import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Testing App.js', () => {
  it('renders the navigation bar with ncmRegisterList selected', () => {
    render(<App />);

    const ncmRegistersTabButton = screen.getByRole('button', {
      name: /ncm registers/i
    })
  
    const ISBNSearchTabButton = screen.getByRole('button', {
      name: /isbn search/i
    });

    expect(ncmRegistersTabButton).toBeInTheDocument();
    expect(ncmRegistersTabButton).toHaveClass('active');

    expect(ISBNSearchTabButton).toBeInTheDocument();
  });

  it('renders the right tab after clicking on tab link', () => {
    render(<App />);

    const ncmRegistersButton = screen.getByRole('button', {
      name: /ncm registers/i
    })
  
    const ISBNSearchTabButton = screen.getByRole('button', {
      name: /isbn search/i
    });

    userEvent.click(ISBNSearchTabButton);

    expect(
      screen.getByRole('heading', {
        name: /buscar isbn/i
      })
    ).toBeInTheDocument();

    userEvent.click(ncmRegistersButton);

    expect(
      screen.getByRole('heading', {
        name: /lista de registros ncm/i
      })
    ).toBeInTheDocument();

  });
});
