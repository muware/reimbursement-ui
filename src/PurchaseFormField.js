import './App.css';
import { Button, CardHeader, Container, Form, FormControl, Stack } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";

// This is my base component for form elements.
// I wanted each element to have a title/label above it,
// and some notes below it.
function PurchaseFormField({label, children, footnotes}) {  
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {children}
      <Form.Text>{footnotes}</Form.Text>
    </Form.Group>
  );
}

export default PurchaseFormField;
