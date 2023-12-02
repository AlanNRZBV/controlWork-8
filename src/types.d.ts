import React from "react";

export interface IQuote {
  id?:string
  category?: string,
  author: string,
  text: string
}

export interface IQuotes {
  quotes: IQuote[]
}

export interface IOptions {
  value: string,
  label: string
}


export interface IQuoteForm {
  options: IOptions[]
  inputData: IQuote
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  onSelect: (selected: IOptions | null) => void
}