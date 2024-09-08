import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';
import { useFetch } from './Util';

// Mocking the useFetch hook
jest.mock('./Util');

describe('Calculator', () => {

  beforeEach(() => {
    // Reset the mock implementation before each test
    useFetch.mockImplementation(() => ({
      result: null,
      loading: false,
      error: null,
    }));
  });

  test('renders the component correctly', () => {
    render(<Calculator />);
    expect(screen.getByText(/Calculator/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Second number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  test('accepts valid number inputs', () => {
    render(<Calculator />);
    
    const firstNumber = screen.getByPlaceholderText(/First number/i);
    const secondNumber = screen.getByPlaceholderText(/Second number/i);

    fireEvent.change(firstNumber, { target: { value: '123.45' } });
    fireEvent.change(secondNumber, { target: { value: '67.89' } });

    expect(firstNumber.value).toBe('123.45');
    expect(secondNumber.value).toBe('67.89');
  });

  test('corrects invalid inputs', () => {
    render(<Calculator />);

    const firstNumber = screen.getByPlaceholderText(/First number/i);
    const secondNumber = screen.getByPlaceholderText(/Second number/i);

    fireEvent.change(firstNumber, { target: { value: 'abc' } });
    fireEvent.change(secondNumber, { target: { value: '67.89word words' } });

    expect(firstNumber.value).toBe('');
    expect(secondNumber.value).toBe('67.89');
  });

  test('calls useFetch with correct parameters when calculating', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ result: 200 });
    useFetch.mockImplementation(mockFetch);

    render(<Calculator />);

    const firstNumber = screen.getByPlaceholderText(/First number/i);
    const secondNumber = screen.getByPlaceholderText(/Second number/i);
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });

    fireEvent.change(firstNumber, { target: { value: '10' } });
    fireEvent.change(secondNumber, { target: { value: '5' } });
    fireEvent.click(calculateButton);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8080/add", 
      JSON.stringify({ firstValue: 10, secondValue: 5 }),
    );
  });

});