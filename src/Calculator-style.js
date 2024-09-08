import styled from "styled-components";

// Styled components
export const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 520px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;

export const Dropdown = styled.select`
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;

export const CalculateButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
  }
`;

export const ResultContainer = styled.div`
  margin-top: 20px;
`;

export const ResultDisplay = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;