type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = (props: ErrorMessageProps) => (
  <p data-testid="error-message">{props.message}</p>
);

export default ErrorMessage;
