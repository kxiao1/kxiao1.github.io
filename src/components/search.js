import React, { useState, useRef, useContext } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { Nav, Container, Jumbotron, Form } from 'react-bootstrap';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import logo from './giphy.gif';
import icon from './icon_light_normal_ios.png';

import { store, useWidth } from './appContext';
import './style.css';

function TopBar(props) {
  const globalState = useContext(store);
  const history = useHistory();
  const { state, dispatch } = globalState;
  const { currUser, isSignedIn, clientId } = state;
  const { searchRes, setSearch } = props;
  const profile = currUser ? currUser.profileObj : null;
  const [timer, setTimer] = useState(0);
  const updateInputValue = newVal => {
    if (timer) {
      clearTimeout(timer);
    }
    const id = setTimeout(() => setSearch(newVal), 600);
    setTimer(id);
  };
  const renderer = renderProps => (
    <button
      type="button"
      style={{ backgroundColor: 'white', border: '1px solid #ced4da' }}
      onClick={() => {
        dispatch({ type: 'signOut' });
        renderProps.onClick();
      }}
    >
      <img className="g-icon" src={icon} alt="g-icon" />
      Logout
    </button>
  );

  // written as redirect to make return logic clearer
  if (!isSignedIn || !profile) {
    return <Redirect to="/" />;
  }
  const { givenName } = profile;
  const firstidx = givenName.indexOf(',');
  let firstName;
  if (firstidx === -1) {
    firstName = givenName;
  } else {
    firstName = givenName.slice(0, firstidx);
  }
  const headText = searchRes.length === 0 ? <h1>Trending</h1> : <h1>Search</h1>;
  return (
    <Jumbotron>
      <div className="container">
        <div className="row">
          <div className="col">{headText}</div>
          <div className="col text-right">
            <p>
              Welcome,
              <span className="bold">{` ${firstName} ${profile.familyName}`}</span>
            </p>
            <GoogleLogout
              clientId={clientId}
              render={renderer}
              onLogoutSuccess={() => {
                history.push('/');
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Group className="w-50">
              <Form.Control
                type="text"
                onChange={e => updateInputValue(e.target.value)}
                defaultValue={searchRes}
                placeholder="Search for gifs here"
                className="ml-xl-0"
              />
            </Form.Group>
          </div>
        </div>
      </div>
    </Jumbotron>
  );
}

function Gifs(props) {
  const width = useWidth();

  const history = useHistory();
  const getGif = (gif, e) => {
    e.stopPropagation();
    e.preventDefault();
    const { url } = gif;
    let urlNew;
    const last = url.lastIndexOf('-');
    const lastSlash = url.lastIndexOf('/');
    if (last > -1) {
      urlNew = url.slice(last + 1);
    } else if (lastSlash > -1) {
      urlNew = url.slice(lastSlash + 1);
    } else {
      urlNew = url;
    }
    history.push('/details', { url: urlNew, res: searchRes });
  };

  const { searchRes } = props;
  const gfRef = useRef(new GiphyFetch('xnRLsVCSkmNxrfX34lVxjbuN4faLWKbq'));
  const gf = gfRef.current;
  const fetchGifs =
    searchRes.length === 0
      ? offset => gf.trending({ offset, limit: 10 })
      : offset => gf.search(searchRes, { offset, limit: 10 });

  return (
    <Grid
      key={searchRes}
      width={width}
      columns={3}
      fetchGifs={fetchGifs}
      onGifClick={getGif}
    />
  );
}

function NavBar() {
  return (
    <div className="fixed-bottom">
      {/* <Navbar bg="light" variant="light" className="justify-content-center"> */}
      <Container>
        <Nav justify variant="tabs" className="custom">
          <Nav.Item href="/search">
            <Nav.Link disabled="true">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item href="/favorites">
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* <Routes /> */}
      </Container>
      {/* </Navbar> */}
    </div>
  );
}
function Search() {
  const { state } = useLocation();
  const init = state ? state.res : '';
  const [searchRes, setSearch] = useState(init);
  return (
    <Container>
      <TopBar searchRes={searchRes} setSearch={setSearch} />
      <header>
        <img src={logo} width="400" alt="Powered by GIPHY" />
      </header>
      <Gifs searchRes={searchRes} />
      <NavBar />
    </Container>
  );
}
export default Search;
