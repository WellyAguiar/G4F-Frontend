import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CepSearch from './CepSearch';
import axios from 'axios';

// Mock da chamada HTTP
jest.mock('axios');

describe('CepSearch Component', () => {
  test('renders the component and allows input', () => {
    render(<CepSearch />);

    // Verificando se o título aparece corretamente
    expect(screen.getByText(/Buscar Endereço por CEP/i)).toBeInTheDocument();

    // Verificando o campo de input
    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('performs a successful search and displays the address', async () => {
    render(<CepSearch />);

    // Mock da resposta da API
    axios.get.mockResolvedValue({
      data: {
        logradouro: 'Rua Exemplo',
        bairro: 'Bairro Exemplo',
        localidade: 'Cidade Exemplo',
        uf: 'EX',
      },
    });

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    fireEvent.change(inputElement, { target: { value: '01001000' } });

    const buttonElement = screen.getByRole('button', { name: /Buscar/i });
    fireEvent.click(buttonElement);

    // Esperando a API responder e os dados aparecerem
    await waitFor(() => {
      expect(screen.getByText(/Endereço Encontrado:/i)).toBeInTheDocument();
    });

    // Validando os dados exibidos
    expect(screen.getByText(/Rua Exemplo/i)).toBeInTheDocument();
    expect(screen.getByText(/Bairro Exemplo/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade Exemplo/i)).toBeInTheDocument();

    // Acessando o estado de forma mais segura após a renderização dos dados
    const estadoElement = screen.getByText(/Estado:/i).parentElement;
    console.log('Valor real de estadoElement:', estadoElement.textContent);

    // Verificando o conteúdo do estado diretamente no texto do elemento
    expect(estadoElement).toHaveTextContent('EX');
  });

  test('displays an error message on failure', async () => {
    render(<CepSearch />);

    // Mock de erro da API
    axios.get.mockRejectedValue(new Error('Erro ao buscar endereço'));

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    fireEvent.change(inputElement, { target: { value: '00000000' } });

    const buttonElement = screen.getByRole('button', { name: /Buscar/i });
    fireEvent.click(buttonElement);

    // Esperando o erro ser exibido
    await waitFor(() => {
      expect(screen.getByText(/Erro ao buscar endereço/i)).toBeInTheDocument();
    });
  });

  test('shows loading state while fetching data', async () => {
    render(<CepSearch />);

    // Mock da resposta da API com atraso
    axios.get.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 2000))
    );

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    fireEvent.change(inputElement, { target: { value: '01001000' } });

    const buttonElement = screen.getByRole('button', { name: /Buscar/i });
    fireEvent.click(buttonElement);

    // Verificando se o "Carregando..." está sendo exibido
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
});
