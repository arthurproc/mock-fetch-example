import React from 'react';
import { render, screen } from '@testing-library/react';
import { isbnData } from '../mock/isbnData';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { mockFetch } from '../utils/test-util';

let mockedFetch;

beforeEach(() => {
  mockedFetch = jest.spyOn(global, 'fetch')
    .mockImplementation(mockFetch)
});

afterAll(() => {
  mockedFetch.mockRestore()
});

describe('Test SearchBook tab', () => {
  it('renders ISBN search results after form fill and submit', async () => {
    render(<App />);

    const ISBNSearchTabButton = screen.getByRole('button', {
      name: /isbn search/i
    });

    userEvent.click(ISBNSearchTabButton);

    const searchInput = screen.getByRole('textbox', {
      name: /pesquisar/i
    });

    const searchButton = screen.getByRole('button', {
      name: /pesquisar/i
    });

    userEvent.type(searchInput, '9788576082675');

    userEvent.click(searchButton);

    const title = await screen.findByRole('heading', {
      name: new RegExp(isbnData.title, 'i'),
      level: 5,
    });

    const subTitle = await screen.findByRole('heading', {
      name: new RegExp(`Assuntos: ${isbnData.subjects.join(', ')}`),
      level: 5,
    });

    const synopsis = await screen.findByText(isbnData.synopsis);

    const author = await screen.findByText(`De ${isbnData.authors.join(', ')}`);

    [title, subTitle, synopsis, author].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('calls ISBN endpoint after form fill and submit', async () => {
    render(<App />);

    const ISBNSearchTabButton = screen.getByRole('button', {
      name: /isbn search/i
    });

    userEvent.click(ISBNSearchTabButton);

    const searchInput = screen.getByRole('textbox', {
      name: /pesquisar/i
    });

    const searchButton = screen.getByRole('button', {
      name: /pesquisar/i
    });

    userEvent.type(searchInput, '9788545702870');

    userEvent.click(searchButton);

    await screen.findByRole('heading', {
      name: new RegExp(isbnData.title, 'i'),
      level: 5,
    });

    expect(mockedFetch).toHaveBeenCalledWith('https://brasilapi.com.br/api/isbn/v1/9788545702870');
  });
});
