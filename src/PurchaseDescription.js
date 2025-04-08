import './App.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PurchaseFormField from './PurchaseFormField';

import "react-datepicker/dist/react-datepicker.css";

// Description component.
function PurchaseDescription({onStateChange}) {
  // Constants
  const LABEL = "Description";
  const PLACEHOLDER = "Description";
  const ROWS = 5;
  const MAX_LENGTH = 1024;

  // Initialize the internal state.
  const [description, setDescription] = useState("");

  // Constants, continued.
  const FOOTNOTES = `${MAX_LENGTH - description.length} characters remaining.`

  // State change logic.
  const onChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);

    // Deliver the new state to the parent component.
    onStateChange && onStateChange(newDescription);
  };
  
  return (
    <PurchaseFormField label={LABEL} footnotes={FOOTNOTES}>
      <Form.Control 
        required
        id="description"
        as="textarea" 
        placeholder={PLACEHOLDER}
        rows={ROWS} 
        maxLength={MAX_LENGTH} 
        onChange={onChange} />
    </PurchaseFormField>
  );
}

export default PurchaseDescription;
