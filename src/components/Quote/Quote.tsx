import { FC } from "react";
import { IQuote } from "../../types";
import { Link } from "react-router-dom";

const Quote: FC<IQuote> = ({author,text}) => {
  return (
    <div className="mb-3 border border-1 rounded-3 py-3 px-3 d-flex">
      <div className="d-flex flex-column me-auto">
      <p className="border-bottom border-1 pb-3">{text}</p>
      <span className="text-secondary fst-italic">{author}</span>
      </div>
      <div className="d-flex align-items-start">
        <Link to={'/'} className="btn btn-outline-warning me-3">Edit</Link>
        <button className="btn btn-outline-danger" type="button">Delete</button>
      </div>
    </div>
  );
};

export default Quote;