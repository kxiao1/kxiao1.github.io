import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { store } from './appContext';
import './style.css';

function Auth() {
  const history = useHistory();
  const [failed, setFailed] = useState(false);
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { isSignedIn, clientId } = state;
  const getContent = () => {
    let f;
    console.log('hi');
    if (failed) {
      f = 'Try again.';
    } else {
      f = '';
    }
    return (
      <div>
        <p>{f}</p>
      </div>
    );
  };
  const loading = (
    <div className="center">
      <header>
        <h1>Loading...</h1>
      </header>
    </div>
  );
  const body = (
    <div className="center">
      <header>
        <h1 id="title">Giphy Search</h1>
        <GoogleLogin
          clientId={clientId}
          render={renderProps => (
            <button
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="login"
            >
              {/* Login with Google */}
            </button>
          )}
          onSuccess={res => {
            // setFailed(false);
            dispatch({ type: 'signIn', user: res });
            history.push('/search');
          }}
          onFailure={err => {
            setFailed(true);
            console.log(err);
          }}
          cookiePolicy="single_host_origin"
        />
      </header>
      {getContent()}{' '}
    </div>
  );
  return isSignedIn ? loading : body;
}
export default Auth;

/* old code for reference only */
// class Auth extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { isSignedIn: false, failed: false };
//   }

//   componentDidMount() {
//     const successCallback = this.onSignIn.bind(this);
//     const failureCallback = this.onFailure.bind(this);
//     const script = document.createElement('script');
//     script.src = 'https://apis.google.com/js/platform.js';
//     script.crossOrigin = 'anonymous';
//     document.body.appendChild(script);

//     script.onload = () => {
//       window.gapi.load('auth2', () => {
//         this.auth2 = gapi.auth2.init({
//           client_id: '615286336479-bfng52a7akti075n3s59phgmuk3me6qh.apps.googleusercontent.com',
//           cookiePolicy: 'single_host_origin',
//         });
//         this.auth2
//           .then(result => {
//             console.log(result);
//             if (this.auth2.isSignedIn.get()) {
//               this.setState({
//                 user: this.auth2.currentUser.get(),
//                 isSignedIn: true,
//               });
//             }
//           })
//           .catch(error => console.log(error));
//       });
//       window.gapi.signin2.render('loginButton', {
//         scope: 'profile',
//         width: 400,
//         height: 100,
//         longtitle: true,
//         onsuccess: successCallback,
//         onfailure: failureCallback,
//       });
//     };
//   }

//   componentWillUnmount() {
//     this.auth2.disconnect();
//   }

//   onSignIn(googleUser) {
//     this.setState({ user: googleUser, isSignedIn: true });
//   }

//   onFailure() {
//     this.setState({ failed: true });
//   }

//   getContent() {
//     let f;
//     const { failed } = this.state;
//     if (failed) {
//       f = 'Try again.';
//     } else {
//       f = '';
//     }
//     return (
//       <div>
//         <button type="button" id="loginButton">
//           Login with Google
//         </button>
//         <p>{f}</p>
//       </div>
//     );
//   }

//   renderRedirect() {
//     const { isSignedIn, user } = this.state;
//     if (isSignedIn) {
//       console.log(user);
//       return <Redirect to={{ pathname: '/search' }} />;
//     }
//     return null;
//   }

//   render() {
//     return (
//       <div className="signIn">
//         {this.renderRedirect()}
//         <header className="header">a simple gifsearch webapp.</header>
//         {this.getContent()}
//       </div>
//     );
//   }
// }
