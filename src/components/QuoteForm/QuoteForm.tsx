import { FC } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import { IQuoteForm } from '../../types';

const QuoteForm: FC<IQuoteForm> = ({ options, inputData, onSubmit, onChange, onSelect, selected }) => {
  return (
    <section className="border border-1 rounded rounded-3 shadow-sm py-3 px-3">
      <h2 className="mb-3">Add post</h2>
      <Form onSubmit={onSubmit}>
        <Select onChange={onSelect} className="w-25" options={options} autoFocus={true} value={selected} />
        <FormGroup className="mb-3 d-flex flex-wrap">
          <Form.Label className="w-100" htmlFor="title">
            Author
          </Form.Label>
          <Form.Control
            onChange={onChange}
            className="w-50 me-auto"
            type="text"
            name="author"
            id="author"
            value={inputData.author}
            required
          />
          <Button className="me-auto" type="submit" variant="primary">
            Submit
          </Button>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="text">Text</Form.Label>
          <Form.Control
            onChange={onChange}
            as="textarea"
            name="text"
            id="text"
            rows={8}
            value={inputData.text}
            required
          />
        </FormGroup>
      </Form>
    </section>
  );
};

export default QuoteForm;
