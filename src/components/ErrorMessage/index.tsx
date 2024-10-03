import './index.css';

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='error'>
      <div className='error_card'>
        <p className='error_message'>{message}</p>
      </div>
    </div>
  );
};
