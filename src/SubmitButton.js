import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import { Button, Spinner } from 'react-bootstrap';

// 2-state component that either shows a normal submit button or a spinner.
function SubmitButton({submitted}) {
  // Submit button.
  const submissionButton = (
    <Button type="submit" >
      Submit
    </Button>
  );

  // Spinner button that replaces the submit button while 
  // an endpoint call is made to the backend.
  const spinnerButton = (
    <Button disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
      />
      <span> Submitting...</span>
    </Button>
  );

  const submitButton = submitted ? spinnerButton : submissionButton;
  return submitButton;
}

export default SubmitButton;
