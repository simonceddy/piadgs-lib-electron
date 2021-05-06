import { Link } from 'react-router-dom';

function ListLink({ children, to }) {
  return (
    <Link to={to} className="p-0.5 hover:underline">
      {children}
    </Link>
  );
}

export default ListLink;
