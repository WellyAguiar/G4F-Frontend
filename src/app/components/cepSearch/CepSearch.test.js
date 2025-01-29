import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CepSearch from "./CepSearch";
import axios from "axios";

// Mock da biblioteca axios para simular as requisições HTTP
jest.mock("axios");

describe("CepSearch Component", () => {
  // Testa a renderização inicial do componente e interação com o campo de input
  test("renders the component and allows input", () => {
    render(<CepSearch />);

    expect(screen.getByText(/Buscar Endereço por CEP/i)).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    expect(inputElement).toBeInTheDocument();
  });

  // Testa a busca bem-sucedida de um endereço
  test("performs a successful search and displays the address", async () => {
    render(<CepSearch />);

    axios.get.mockResolvedValue({
      data: {
        logradouro: "Rua Exemplo",
        bairro: "Bairro Exemplo",
        localidade: "Cidade Exemplo",
        uf: "EX",
      },
    });

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    fireEvent.change(inputElement, { target: { value: "01001000" } });

    const buttonElement = screen.getByRole("button", { name: /Buscar/i });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText(/Endereço Encontrado:/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Rua Exemplo/i)).toBeInTheDocument();
    expect(screen.getByText(/Bairro Exemplo/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade Exemplo/i)).toBeInTheDocument();

    const estadoElement = screen.getByText(/Estado:/i).parentElement;
    console.log("Valor real de estadoElement:", estadoElement.textContent);

    expect(estadoElement).toHaveTextContent("EX");
  });

  // Testa a exibição de mensagem de erro caso a requisição falhe
  test("displays an error message on failure", async () => {
    render(<CepSearch />);

    axios.get.mockRejectedValue(new Error("Erro ao buscar endereço"));

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    fireEvent.change(inputElement, { target: { value: "00000000" } });

    const buttonElement = screen.getByRole("button", { name: /Buscar/i });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText(/Erro ao buscar endereço/i)).toBeInTheDocument();
    });
  });

  // Testa o estado de carregamento enquanto a busca está em andamento
  test("shows loading state while fetching data", async () => {
    render(<CepSearch />);

    axios.get.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 2000))
    );

    const inputElement = screen.getByPlaceholderText(/Digite o CEP/i);
    fireEvent.change(inputElement, { target: { value: "01001000" } });

    const buttonElement = screen.getByRole("button", { name: /Buscar/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
});
