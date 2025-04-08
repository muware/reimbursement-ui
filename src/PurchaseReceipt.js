import './App.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PurchaseFormField from './PurchaseFormField';

import "react-datepicker/dist/react-datepicker.css";

// File picker component.
function PurchaseReceipt({onStateChange}) {
  // Constants
  const LABEL = "Receipt";
  const ACCEPTED_FILE_TYPES = "application/pdf";  // Only PDF files for this exercise.
  const FOOTNOTES = "Select a PDF file."

  // Initialize the internal state.
  const [receiptFile, setReceiptFile] = useState("");

  // State change logic.
  const onChange = (event) => {
    const newReceiptFile = event.target.files[0];
    setReceiptFile(newReceiptFile);

    // Deliver the new state to the parent component.
    onStateChange && onStateChange(newReceiptFile);
  };
  
  return (
    <PurchaseFormField label={LABEL} footnotes={FOOTNOTES}>
      <Form.Control 
        required
        id="file"
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        onChange={onChange}
      />
    </PurchaseFormField>
  );
}

export default PurchaseReceipt;
