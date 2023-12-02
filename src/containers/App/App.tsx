import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes, NavLink } from "react-router-dom";
import Quotes from "../Quotes/Quotes.tsx";
import AddQuote from "../AddQuote/AddQuote.tsx";

function App() {

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
            <Route path="/" element={<Quotes/>}/>
            <Route path="/quotes" element={<Quotes/>}/>
            <Route path="/add-quote" element={<AddQuote/>}/>
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
