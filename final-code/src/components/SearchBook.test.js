import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { mockFetch } from '../utils/test-utils';

let mockedFetch;

beforeEach(() => {
  mockedFetch = mockFetch();
});

afterEach(() => {
  mockedFetch.mockRestore();
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

    userEvent.type(searchInput, '9788545702870');

    userEvent.click(searchButton);

    const title = await screen.findByRole('heading', {
      name: /akira vol\. 1/i,
      level: 5,
    });

    const subTitle = await screen.findByRole('heading', {
      name: /assuntos: teenagers, comic books, strips, science fiction, graphic novels, comics & graphic novels, manga, science fiction/i,
      level: 5,
    });

    const synopsis = await screen.findByText(
      /um dos marcos da ficção científica oriental que revolucionou a chegada dos mangás e da cultura pop japonesa no ocidente retorna em uma nova edição especial\. após atropelar uma criança de aparência estranha, tetsuo shima \(o melhor amigo de kaneda\), começa a sentir algumas reações anormais\. isso acaba chamando a atenção do governo que está projetando diversas experiências secretas e acabam sequestrando tetsuo\. nesta aventura cheia de ficção, kaneda entra em cena para salvar o amigo, enquanto uma terrível e monstruosa entidade ameaça despertar\./i
    );

    const author = await screen.findByText(/de katsuhiro ōtomo/i);

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
      name: /akira vol\. 1/i,
      level: 5,
    });

    expect(global.fetch).toHaveBeenCalledWith('https://brasilapi.com.br/api/isbn/v1/9788545702870');
  });
});
