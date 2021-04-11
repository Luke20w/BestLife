import { useState } from "react";
import * as Realm from "realm-web";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Alert, Header } from "./components/components";

import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";

// Connect to Apollo GraphQL
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${process.env.REACT_APP_REALM_APP_ID}/graphql`;
const client = new ApolloClient({
  link: new HttpLink({
    uri: graphql_url,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

// Connect to Realm App
const app = new Realm.App(process.env.REACT_APP_REALM_APP_ID);
async function getValidAccessToken() {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.apiKey(process.env.REACT_APP_REALM_API_KEY));
  } else {
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}

export default function App() {
  // Alert state variables
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("red");

  function alert(title, message, color) {
    setAlertIsOpen(true);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertColor(color);
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <ApolloProvider client={client}>
          <Router>
            <div className="flex-1 flex flex-col">
              <Header
                pages={{
                  Home: "/home",
                }}
                blackList={["/sign-in", "/create-account"]}
              />
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/sign-in" />} />
                <Route path="/sign-in">
                  <SignInPage client={client} alert={alert} />
                </Route>
                <Route path="/create-account">
                  <CreateAccountPage alert={alert} />
                </Route>
                <Route path="/home">
                  <HomePage alert={alert} />
                </Route>
              </Switch>
            </div>
          </Router>
        </ApolloProvider>
      </div>
      <Alert
        isOpen={alertIsOpen}
        color={alertColor}
        title={alertTitle}
        message={alertMessage}
        close={() => setAlertIsOpen(false)}
      />
    </div>
  );
}
