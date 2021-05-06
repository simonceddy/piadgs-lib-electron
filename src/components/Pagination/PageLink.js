import { Link } from 'react-router-dom';

function PageLink({ url = '/', children, disabled = false }) {
  if (disabled) {
    return (
      <span className="block border border-gray-500 text-gray-500 p-1 m-1">
        {children}
      </span>
    );
  }

  return (
    <Link to={url} className="block border border-black p-1 m-1">
      {children}
    </Link>
  );
}

export default PageLink;
