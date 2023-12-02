import React, { FC, useCallback, useEffect, useState } from 'react';
import { IAddQuote, IOptions, IQuote } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm/QuoteForm.tsx';
import { options } from '../../constants/constants.ts';

const AddQuote: FC<IAddQuote> = ({ loadToggle, editId }) => {
  const [inputData, setInputData] = useState<IQuote>({
    category: '',
    author: '',
    text: '',
  });
  const [isEdited, setIsEdited] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOptions | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (editId !== '') {
      const fetchSinglePost = async () => {
        await axiosApi.get(`/quotes/${editId}.json`).then((response) => {
          setInputData((prevState) => ({
            ...prevState,
            author: response.data.author,
            text: response.data.text,
            category: response.data.category,
          }));
          setIsEdited(true);
          const selected = options.find((option) => option.value === response.data.category);
          setSelectedOption(selected || null);
        });
      };
      void fetchSinglePost();
    }
  }, [editId]);

  const inputDataChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const selectHandler = (selected: IOptions | null) => {
    if (selected?.value) {
      setInputData((prevState) => ({ ...prevState, category: selected.value }));
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isEdited) {
        await axiosApi.post('/quotes.json', inputData);
      } else {
        await axiosApi.put(`/quotes/${editId}.json`, inputData);
      }
      loadToggle();
    } catch (error) {
      console.log('Caught while sending data to server: ' + error);
    }
    setInputData((prevState) => ({
      ...prevState,
      author: '',
      category: '',
      text: '',
    }));
    navigate('/');
  };

  return (
    <>
      <QuoteForm
        options={options}
        inputData={inputData}
        onChange={inputDataChanged}
        onSubmit={submitHandler}
        onSelect={selectHandler}
        selected={selectedOption}
      />
    </>
  );
};

export default AddQuote;
