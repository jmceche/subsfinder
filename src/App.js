import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import NameSearch from "./components/subs/NameSearch";
import HashSearch from "./components/subs/HashSearch";
import SubList from "./components/subs/SubList";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Spinner from "./components/layout/Spinner";
import NotFound from "./components/subs/NotFound";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

const App = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [noRes, setNoRes] = useState(false);

  // Search subtitles
  const searchSubs = async (url) => {
    setLoading(true);
    setNoRes(false);
    const headers = {
      "Content-Type": "application/json",
      "X-User-Agent": "jm_osdownloader",
    };
    try {
      const uri = `https://rest.opensubtitles.org/search${url}`;
      const resp = await axios.get(uri, { headers: headers });
      resp.data.length > 0 ? setSubs(resp.data) : setNoRes(true);
    } catch (err) {
      showAlert(err.message, "danger");
    }
    setLoading(false);
  };

  // Clear subs from state
  const clearSubs = () => setSubs([]);

  // Show Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <NameSearch
                  {...props}
                  searchSubs={searchSubs}
                  showAlert={showAlert}
                />
              )}
            />
            <Route
              exact
              path='/hash'
              render={(props) => (
                <HashSearch
                  {...props}
                  searchSubs={searchSubs}
                  showAlert={showAlert}
                />
              )}
            />
          </Switch>
          <Route exact path='/about' component={About} />
          {subs.length > 0 && (
            <button className='btn btn-light btn-block' onClick={clearSubs}>
              Clear
            </button>
          )}
          {noRes && <NotFound />}
          {subs.length > 0 ? (
            <SubList subs={subs} />
          ) : loading ? (
            <Spinner />
          ) : null}
        </div>
      </div>
    </Router>
  );
};

export default App;
