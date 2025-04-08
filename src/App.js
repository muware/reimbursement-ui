import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

// Importing customized form elements.
import PurchaseDate from './PurchaseDate';
import PurchaseAmount from './PurchaseAmount';
import PurchaseDescription from './PurchaseDescription';
import PurchaseReceipt from './PurchaseReceipt';
import SubmitButton from './SubmitButton';

// Backend is expected to run at port 8080.
const BASE_URL = "http://localhost:8080";
const REIMBURSE_ENDPOINT = BASE_URL + "/reimburse";

// Constants.
const SUCCESS = "Your reimbursement request has been submitted successfully.";
const FAILURE = "There was an error submitting your reimbursement request.";

function App() {
  // Initialize state.
  const [amount, setAmount] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [receiptFile, setReceiptFile] = useState("");
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form validation logic.
  const validate = (event) => {
    event.preventDefault(); // Stop page reload.
    event.stopPropagation();  // Stop bubbling.

    // Check the validity of the form.
    const form = event.currentTarget;
    const validInput = form.checkValidity();

    // This allows React Bootstrap to highlight the fields 
    // based on validation results (basically, based on 
    // whether a field is required or not.)
    setValidated(true);

    return validInput;
  }

  // Sending reimbursement data to the backend.
  const submitReimbursementRequest = async () => {
    // Date.toISOString() returns the ISO string for a date, but 
    // it takes timezone offset into consideration. In the backend, 
    // I used LocalDateTime to store dates, so the frontend needs 
    // to send a local date to the backend, otherwise Spring 
    // Boot's @PastOrPresent validation will fail. This function
    // helps with that.
    const getLocalDateISOString = (date) => {
      const timezoneOffset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - timezoneOffset * 60 * 1000);
      const isoString = localDate.toISOString().slice(0, -5);
      return isoString;
    };

    // Generate form data.
    // All fields are required.
    const formdata = new FormData();
    formdata.append("date", getLocalDateISOString(purchaseDate));
    formdata.append("description", description);
    formdata.append("amount", amount);
    formdata.append("receipt", receiptFile);

    // Making a POST request.
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    // Go!
    // Because of time constraints, I'm showing alerts
    // to inform the user about fetch results instead of a 
    // nicer UI.
    fetch(REIMBURSE_ENDPOINT, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert(SUCCESS); 
        // Make sure the user sees the regular submit button again.
        setSubmitted(false);
      })
      .catch((error) => {
        alert(FAILURE); 
        // Make sure the user sees the regular submit button again.
        setSubmitted(false);
      });
  };

  // Form submission logic.
  const onSubmit = async (event) => {
    // Replace the submit button with a spinner, so that the user 
    // doesn't make multiple submissions before the current one is resolved.
    setSubmitted(true);

    // Form validation.
    const validInput = validate(event);

    // If the form is validated, go ahead with the endpoint call.
    if (validInput) {
      await submitReimbursementRequest();
      // setSubmitted will be called at the end of fetch().
    }
    // If form validation fails, there won't be an endpoint call.
    // Show the regular submit button again.
    else {
      setSubmitted(false);
    }
  }

  return (
    <Container>
      <h1>Reimbursement Form</h1>
      <Form 
        noValidate
        onSubmit={onSubmit}
        validated={validated}
      >
        {/* Each form element has its own component 
          * for structure and code organization. */}
        <PurchaseDate onStateChange={(date) => setPurchaseDate(date)}/>
        <PurchaseAmount onStateChange={(amount) => setAmount(amount)}/>
        <PurchaseDescription onStateChange={(desc) => setDescription(desc)}/>
        <PurchaseReceipt onStateChange={(receipt) => setReceiptFile(receipt)}/>
        <SubmitButton /*onSubmitButtonClick={onSubmit}*/ submitted={submitted}/>
      </Form>
    </Container>
  );
}

export default App;
