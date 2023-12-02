import { FC } from 'react';
import { ICategories } from '../../types';
import CategoriesLink from './CategoriesLink.tsx';

const Categories: FC<ICategories> = ({ onFilter, categories }) => {
  return (
    <div className="d-flex flex-column border border-1 rounded-3 shadow px-3 pt-3">
      <CategoriesLink onFilter={onFilter} isAll={true} />
      {categories.map((item, index) => (
        <CategoriesLink onFilter={onFilter} label={item.label} urlId={item.value} key={index} />
      ))}
    </div>
  );
};

export default Categories;
