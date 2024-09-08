import React, { useState } from "react";
import { CalculatorContainer, Title, InputsContainer, InputField, Dropdown, CalculateButton, ResultContainer, ResultDisplay, ErrorMessage} from './Calculator-style';
import { useFetch } from "./Util";

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [requestUrl, setRequestUrl] = useState(null);
  const [body, setBody] = useState(null);

  const { result, loading, error } = useFetch(requestUrl, body);

  const calculate = () => {
    setRequestUrl("http://localhost:8080/" + operation);
    setBody(JSON.stringify({
        firstValue: parseFloat(firstNumber),
        secondValue: parseFloat(secondNumber),
      }));
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  }

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value.replace(/[^\d.-]/g, ''));
  };
  
  return (
    <CalculatorContainer>
      <Title>Calculator</Title>

      <InputsContainer>
        <InputField value={firstNumber} onChange={handleInputChange(setFirstNumber)} placeholder="Enter first number" />

        <Dropdown value={operation} onChange={handleOperationChange}>
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">*</option>
          <option value="divide">/</option>
        </Dropdown>

        <InputField value={secondNumber} onChange={handleInputChange(setSecondNumber)} placeholder="Enter second number" />
      </InputsContainer>

      <CalculateButton onClick={calculate} disabled={loading || !firstNumber || !secondNumber}>
        {loading ? "Calculating..." : "Calculate"}
      </CalculateButton>

      <ResultContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {result !== null && <ResultDisplay>Result: {result}</ResultDisplay>}
      </ResultContainer>
    </CalculatorContainer>
  );
}

export default Calculator;
