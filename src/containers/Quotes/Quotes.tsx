import { FC } from "react";
import { IQuotes } from "../../types";
import Quote from "../../components/Quote/Quote.tsx";

const Quotes: FC<IQuotes> = ({quotes, onDelete}) => {
  return (
    <div className="">
      {quotes.map((item)=>(
        <Quote author={item.author} text={item.text} key={item.id} onDelete={onDelete} id={item.id}/>
      ))}
    </div>
  );
};

export default Quotes;