import './App.css';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PurchaseFormField from './PurchaseFormField';

import "react-datepicker/dist/react-datepicker.css";

// Amount component.
function PurchaseAmount({onStateChange}) {
  // Constants
  const LABEL = "Amount";
  const FOOTNOTES = "Maximum purchase amount is $1000."

  // Ideally, these constraints could be fetched from the backend.
  const AMOUNT_MIN = 0;
  const AMOUNT_MAX = 1000;

  // Initialize the internal state.
  const [amount, setAmount] = useState(0);

  // State change logic.
  const onChange = (event) => {
    console.log(event.target.value);
    
    // Make sure the user cannot select more than 
    // the max amount even if they type it.
    const newAmount = Math.min(parseInt(event.target.value), AMOUNT_MAX);
    setAmount(newAmount);
    
    // Deliver the new state to the parent component.
    onStateChange && onStateChange(newAmount);
  };
  
  return (
    <PurchaseFormField label={LABEL} footnotes={FOOTNOTES}>
      <InputGroup hasValidation>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          required
          id="amount"
          type="number" 
          min={AMOUNT_MIN}
          max={AMOUNT_MAX}
          onChange={onChange}
          value={amount || ""} />
      </InputGroup>
    </PurchaseFormField>
  );
}

export default PurchaseAmount;
