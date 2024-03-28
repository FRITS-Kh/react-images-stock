import { useMemo } from 'react';
import { Link } from 'react-router-dom';

function Card({ path, title, createdAt, user, id, isSingle = false }) {
  const imageHeight = isSingle ? 'auto' : '280';
  const timestamp = useMemo(() => {
    if (!createdAt) {
      return '';
    }

    const date = `${new Date(createdAt.seconds * 1000)}`.split(' ');

    return `${date[1]} ${date[2]} ${date[3]}`;
  }, [createdAt]);

  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={path}
          className="card-img-top object-fit-cover"
          alt={title}
          height={imageHeight}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <div className="d-flex justify-content-between">
            <small className="text-body-secondary">{timestamp}</small>
            <i>{`@${user}`}</i>
          </div>
          {!isSingle && (
            <Link
              className="stretched-link"
              to={`/images/${id}`}
              state={{ id }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
