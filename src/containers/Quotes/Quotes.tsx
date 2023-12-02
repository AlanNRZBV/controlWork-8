import { FC } from "react";
import { IQuotes } from "../../types";
import Quote from "../../components/Quote/Quote.tsx";

const Quotes: FC<IQuotes> = ({quotes}) => {
  return (
    <div className="">
      {quotes.map((item)=>(
        <Quote author={item.author} text={item.text} key={item.id}/>
      ))}
    </div>
  );
};

export default Quotes;