import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn btn-secondary mb-5"
        type="button"
        onClick={() => navigate('/')}
      >
        Back to Home page
      </button>

      <div className="d-flex justify-content-center align-items-center">
        <h1>Ooops! The page does not exist</h1>
      </div>
    </>
  );
}

export default NotFound;
