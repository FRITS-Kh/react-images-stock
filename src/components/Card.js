import { useMemo } from 'react';

function Card({ path, title, createdAt, user }) {
  const timestamp = useMemo(() => {
    const date = `${new Date(createdAt.seconds * 1000)}`.split(' ');

    return `${date[1]} ${date[2]} ${date[3]}`;
  }, [createdAt]);

  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={path}
          className="card-img-top"
          alt={title}
          style={{
            height: '200px',
            objectFit: 'cover',
          }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <div className="d-flex justify-content-between">
            <small className="text-body-secondary">{timestamp}</small>
            <i>{`@${user}`}</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
