import { useState } from 'react';

import { useFirestoreContext } from '../../context/FirestoreContext';

function SearchForm() {
  const { filterItems: filter, state } = useFirestoreContext();
  const [search, setSearch] = useState(state?.search ?? '');

  const onChange = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    filter(search);
  };

  return (
    <form className="d-flex mb-2 mb-lg-0" role="search" onSubmit={onSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={onChange}
        value={search}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
