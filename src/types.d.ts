import React from 'react';

export interface IQuote {
  id?: string;
  category?: string;
  author: string;
  text: string;
  onDelete?: (key: string) => void;
  onEdit?: (key: string) => void;
}

export interface IQuotes {
  quotes: IQuote[];
  onDelete: (key: string) => void;
  onEdit?: (key: string) => void;
  isEmpty: boolean
}

export interface IAddQuote {
  loadToggle: () => void;
  editId?: string;
}

export interface IOptions {
  value: string;
  label: string;
}

export interface ICategories {
  onFilter: (categories: string | undefined, isAll?: boolean) => void;
  categories: IOptions[];
}

export interface ICategoriesLink {
  onFilter?: (categories: string | undefined, isAll?: boolean | undefined) => void;
  label?: string;
  urlId?: string;
  isAll?: boolean;
}

export interface IQuoteForm {
  options: IOptions[];
  inputData: IQuote;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onSelect: (selected: IOptions | null) => void;
  selected: IOptions | null;
}
