import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Quotes from "../Quotes/Quotes.tsx";
import AddQuote from "../AddQuote/AddQuote.tsx";
import { useEffect, useState } from "react";
import { IQuote } from "../../types";
import axiosApi from "../../axiosApi.ts";

function App() {

  const [quotes,setQuotes]=useState<IQuote[]>([])
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    if(!isLoaded){
      axiosApi.get('/quotes.json').then((response) => {
        if (response.data !== null) {
          const newQuotes = Object.keys(response.data).map((id) => ({ id, ...response.data[id] }));
          setQuotes(newQuotes);
        }
      });
    }
    setIsLoaded(true);
  }, [isLoaded]);

  const toggleIsLoaded = () => {
    if (isLoaded) {
      setIsLoaded((prevState) => !prevState);
    }
  };

  const deleteQuote = async (key: string)=>{
    const id = `/quotes/${key}.json`;
    try {
      await axiosApi.delete(id);
      setQuotes((prevState) => {
        const newQuotes = [...prevState];
        return newQuotes.filter((post) => post.id !== key);
      });
      navigate('/');
    } catch (error) {
      console.log(`Deleting quote with id:${id} cause and error:${error}`);
    }
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
                <NavLink className="nav-link" to="/quotes">
                  Quotes
                </NavLink>
                <NavLink className="nav-link" to="add-quote">
                  Submit new quote
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Quotes quotes={quotes} onDelete={deleteQuote}/>}/>
            <Route path="/quotes" element={<Quotes quotes={quotes} onDelete={deleteQuote}/>}/>
            <Route path="/add-quote" element={<AddQuote loadToggle={toggleIsLoaded}/>}/>
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
