import { Col, Container, Nav, Navbar, Row, Spinner } from 'react-bootstrap';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import Quotes from '../Quotes/Quotes.tsx';
import AddQuote from '../AddQuote/AddQuote.tsx';
import { useEffect, useState } from 'react';
import { IQuote } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Categories from '../../components/Categories/Categories.tsx';
import { options } from '../../constants/constants.ts';
import { Simulate } from 'react-dom/test-utils';

function App() {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editId, setEditId] = useState<string>('');
  const [toggleSpinner, setToggleSpinner]=useState(false)
  const [toggleCategories, setToggleCategories]=useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setToggleSpinner(true)
    if (!isLoaded) {
      axiosApi.get('/quotes.json')
        .then((response) => {
        if (response.data !== null) {
          const newQuotes = Object.keys(response.data).map((id) => ({
            id,
            ...response.data[id],
          }));
          setToggleCategories(prevState => !prevState)
          setToggleSpinner(false)
          setQuotes(newQuotes);
        }
      }).catch((error)=>{
        setToggleSpinner(false)
        console.log('Caught while fetching data: ' + error)
      });
    }
    setIsLoaded(true);
  }, [isLoaded]);
  const filterCategory = async (category?: string, isAll?: boolean) => {
    setToggleSpinner(true)
    if (!isAll) {
      setQuotes([]);
      const url = `/quotes.json?orderBy="category"&equalTo="${category}"`;
      await axiosApi.get(url).then((response) => {
        if (response.data !== null) {
          const newQuotes = Object.keys(response.data).map((id) => ({
            id,
            ...response.data[id],
          }));
          setQuotes(newQuotes);
          setToggleSpinner(false)
        }
      }).catch((error)=>{
        setToggleSpinner(false)
        console.log('Caught after quote delete: ' + error)
      });
    } else {
      if (isLoaded) {
        setIsLoaded((prevState) => !prevState);
      }
    }
  };

  const toggleIsLoaded = () => {
    if (isLoaded) {
      setIsLoaded((prevState) => !prevState);
    }
  };

  const deleteQuote = async (key: string) => {
    const id = `/quotes/${key}.json`;
    try {
      await axiosApi.delete(id);
      setQuotes((prevState) => {
        const newQuotes = [...prevState];
        return newQuotes.filter((post) => post.id !== key);
      });
      setToggleCategories(false)
      navigate('/');
    } catch (error) {
      console.log(`Deleting quote with id:${id} cause and error:${error}`);
    }
  };

  const editQuote = (key: string) => {
    setToggleCategories(prevState => !prevState)
    setEditId(key);
  };
  const toggleCategoriesHandler = ()=>{
    setToggleCategories(prevState => !prevState)
  }

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">QUOTES</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink onClick={toggleCategoriesHandler} className="nav-link" to="/quotes">
                  Quotes
                </NavLink>
                <NavLink onClick={toggleCategoriesHandler} className="nav-link" to="add-quote">
                  Submit new quote
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Row className="pt-3">
            {toggleCategories ? (<></>)
              :
              (
                <Col className="h-100">
                  <Categories onFilter={filterCategory} categories={options} />
                </Col>
              )}

            <Col>
              {toggleSpinner? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                )
                :
                (
                  <Routes>
                    <Route path="/" element={<Quotes quotes={quotes} onDelete={deleteQuote} onEdit={editQuote} />} />
                    <Route path="/quotes" element={<Quotes quotes={quotes} onDelete={deleteQuote} onEdit={editQuote} />} />
                    <Route
                      path="/quotes/:id"
                      element={<Quotes quotes={quotes} onDelete={deleteQuote} onEdit={editQuote} />}
                    />
                    <Route path="/add-quote" element={<AddQuote loadToggle={toggleIsLoaded} editId={editId} />} />
                    <Route path="/quotes/:id/edit" element={<AddQuote loadToggle={toggleIsLoaded} editId={editId} />} />
                  </Routes>
                )}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
