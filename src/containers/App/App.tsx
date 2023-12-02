import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes, NavLink } from "react-router-dom";
import Quotes from "../Quotes/Quotes.tsx";
import AddQuote from "../AddQuote/AddQuote.tsx";
import { useEffect, useState } from "react";
import { IQuote } from "../../types";
import axiosApi from "../../axiosApi.ts";

function App() {

  const [quotes,setQuotes]=useState<IQuote[]>([])
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if(isLoaded){
      axiosApi.get('/quotes.json').then((response) => {
        if (response.data !== null) {
          const newQuotes = Object.keys(response.data).map((id) => ({ id, ...response.data[id] }));
          setQuotes(newQuotes);
        }
      });
    }
    setIsLoaded(true);
  }, [isLoaded]);


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
            <Route path="/" element={<Quotes quotes={quotes}/>}/>
            <Route path="/quotes" element={<Quotes quotes={quotes}/>}/>
            <Route path="/add-quote" element={<AddQuote/>}/>
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
