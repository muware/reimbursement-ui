import './App.css';
import { Stack } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import PurchaseFormField from './PurchaseFormField';

import "react-datepicker/dist/react-datepicker.css";

// Date picker component.
function PurchaseDate({onStateChange}) {
  // Constants
  const LABEL = "Purchase Date";
  const FOOTNOTES = "Select a date on or before today."
  const MAX_DATE = new Date();

  // Initialize the internal state.
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  // State change logic.
  const onChange = (date) => {
    setPurchaseDate(date);
    
    // Deliver the new state to the parent component.
    onStateChange(date);
  };

  const onSelect = (date) => {};
  
  return (
    <PurchaseFormField label={LABEL} footnotes={FOOTNOTES}>
      {/* I was able to align DatePicker properly using a Stack. */}
      <Stack> 
        <DatePicker 
          required
          id="date"
          selected={purchaseDate}
          onSelect={onSelect}
          onChange={onChange} 
          maxDate={MAX_DATE}
          // Makes the DatePicker look more like a Bootstrap component.
          className="form-control"
        />
      </Stack>
    </PurchaseFormField>
  );
}

export default PurchaseDate;
