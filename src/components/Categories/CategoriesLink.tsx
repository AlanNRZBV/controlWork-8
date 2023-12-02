import { FC } from 'react';
import { ICategoriesLink } from '../../types';
import { Link } from 'react-router-dom';

const CategoriesLink: FC<ICategoriesLink> = ({ onFilter, urlId, label, isAll }) => {
  const clickHandler = () => {
    if (urlId && onFilter) {
      onFilter(urlId);
    }
  };

  const isAllClickHandler = () => {
    if (onFilter) {
      onFilter(urlId, isAll);
    }
  };

  return (
    <>
      {isAll ? (
        <Link onClick={isAllClickHandler} to={'/quotes'} className="btn btn-outline-warning mb-3 btn-lg">
          All
        </Link>
      ) : (
        <Link onClick={clickHandler} to={`/quotes/${urlId}`} className="btn btn-outline-secondary mb-3 btn-lg">
          {label}
        </Link>
      )}
    </>
  );
};

export default CategoriesLink;
