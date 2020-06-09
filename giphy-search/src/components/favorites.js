import React, { useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { Nav, Container, Jumbotron } from 'react-bootstrap';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

import logo from './giphy.gif';
import { store, useWidth } from './appContext';
import './style.css';
import icon from './icon_light_normal_ios.png';

function TopBar() {
  const globalState = useContext(store);
  const history = useHistory();
  const { state, dispatch } = globalState;
  const { currUser, isSignedIn, clientId } = state;
  const profile = currUser ? currUser.profileObj : null;
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
  if (!isSignedIn) {
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
  return (
    <Jumbotron>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Favorites</h1>
          </div>
          <div className="col text-right">
            <p>
              Welcome,
              <span className="bold">{` ${firstName} ${profile.familyName}`}</span>
            </p>
            <GoogleLogout
              clientId={clientId}
              render={renderer}
              onLogoutSuccess={() => {
                console.log('logged out');
                history.push('/');
              }}
            />
          </div>
        </div>
      </div>
    </Jumbotron>
  );
}
function FavList() {
  const { state } = useContext(store);
  const { favorites: favTemp } = state;
  const favorites = favTemp.slice(0).reverse();
  // list favorites in reverse chronological order
  const gf = new GiphyFetch('xnRLsVCSkmNxrfX34lVxjbuN4faLWKbq');
  const fetchGifs = offset => gf.gifs(favorites);
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
    console.log(urlNew);
    history.push('/details', { url: urlNew, res: '' });
  };
  // useEffect(() => {
  //   const callApi = () => {
  //     const arr = favorites.map(async url => {
  //       console.log(url);
  //       // return `testing{$url}`;
  //       return fetch(url);
  //     });
  //     Promise.all(arr).then(values => console.log(values));
  //   };
  //   callApi();
  // }, [favorites, gf]);
  // console.log(data);
  if (favorites.length === 0) {
    return (
      <div className="header">
        <header>
          <p>Oops, you don&apos;t have any favorites yet!</p>
          <button type="button" onClick={() => history.push('/search')}>
            Back to Search
          </button>
        </header>
      </div>
    );
  }
  const key = favorites.join();
  return (
    <div>
      <header>
        <img src={logo} width="400" alt="Powered by GIPHY" />
      </header>
      <Grid
        key={key}
        width={width}
        columns={3}
        fetchGifs={fetchGifs}
        onGifClick={getGif}
      />
    </div>
  );
}
function NavBar() {
  return (
    <div className="fixed-bottom">
      <Container>
        <Nav justify variant="tabs">
          <Nav.Item href="/search">
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
          </Nav.Item>
          <Nav.Item href="/favorites">
            <Nav.Link disabled="true">Favorites</Nav.Link>
          </Nav.Item>
        </Nav>
        {/* <Routes /> */}
      </Container>
    </div>
  );
}
function Favorites() {
  return (
    <Container>
      <TopBar />
      <FavList />
      <NavBar />
    </Container>
  );
}

export default Favorites;
