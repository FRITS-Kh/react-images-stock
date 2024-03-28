import Card from './Card';

function List({ items }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {items.map((item) => (
        <Card key={item.createdAt} {...item} />
      ))}
    </div>
  );
}

export default List;
