import { useFirestoreContext } from '../../context/FirestoreContext';

function Preview() {
  const { state } = useFirestoreContext();
  const path = state.inputs.path;
  const title = state.inputs.title;

  return (
    path && (
      <img
        src={path}
        className="rounded object-fit-cover d-block mx-auto ms-lg-0 me-lg-4 mb-4 mb-lg-0"
        alt={title}
        style={{
          maxHeight: '300px',
        }}
      />
    )
  );
}

export default Preview;
