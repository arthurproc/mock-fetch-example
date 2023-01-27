import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Testing App.js', () => {
  it('renders the navigation bar with productList selected', () => {
    render(<App />);

    const productsTabButton = screen.getByRole('button', {
      name: /products/i
    });
  
    const ISBNSearchTabButton = screen.getByRole('button', {
      name: /isbn search/i
    });

    expect(productsTabButton).toBeInTheDocument();
    expect(productsTabButton).toHaveClass('active');

    expect(ISBNSearchTabButton).toBeInTheDocument();
  });

  it('renders the right tab after clicking on tab link', () => {
    render(<App />);

    const productsTabButton = screen.getByRole('button', {
      name: /products/i
    });
  
    const ISBNSearchTabButton = screen.getByRole('button', {
      name: /isbn search/i
    });

    userEvent.click(ISBNSearchTabButton);

    expect(
      screen.getByRole('heading', {
        name: /buscar isbn/i
      })
    ).toBeInTheDocument();

    userEvent.click(productsTabButton);

    expect(
      screen.getByRole('heading', {
        name: /lista de registros ncm/i
      })
    ).toBeInTheDocument();

  });
});
