import React, { FC, useCallback, useState } from "react";
import { IAddQuote, IOptions, IQuote } from "../../types";
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import QuoteForm from "../../components/QuoteForm/QuoteForm.tsx";
const AddQuote: FC<IAddQuote> = ({loadToggle}) => {
  const [inputData, setInputData] = useState<IQuote>({
    category: '',
    author: '',
    text: '',
  });
  const navigate = useNavigate();

  const options: IOptions[] = [
    { value: 'famous', label: 'Famous people' },
    { value: 'motivational', label: 'Motivational' },
    { value: 'humour', label: 'Humour' },
    { value: 'saying', label: 'Saying' },
    { value: 'star-wars', label: 'Star Wars' },
  ];

  const inputDataChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }, []);

  const selectHandler = (selected: IOptions | null) => {
    if (selected?.value) {
      setInputData((prevState) => ({ ...prevState, category: selected.value }));
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosApi.post('/quotes.json', inputData);
      loadToggle()
    } catch (error) {
      console.log('Caught while sending data to server: ' + error);
    }
    setInputData((prevState) => ({ ...prevState, author: '', category: '', text: '' }));
    navigate('/');
  };

  return (
    <>
      <QuoteForm options={options} inputData={inputData} onChange={inputDataChanged} onSubmit={submitHandler} onSelect={selectHandler}/>
    </>
  );
};

export default AddQuote;
