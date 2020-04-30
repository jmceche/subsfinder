import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import NameSearch from "./components/subs/NameSearch";
import HashSearch from "./components/subs/HashSearch";
import SubList from "./components/subs/SubList";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Spinner from "./components/layout/Spinner";

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

  //Construct URL for name search
  const nameUrlConstructor = (title, season, episode, lang) => {
    // URL variables
    const query = `/query-${title}`;
    const epis =
      episode.length > 0 ? `/episode-${episode.replace(/^0+/, "")}` : "";
    const sea = season.length > 0 ? `/season-${season.replace(/^0+/, "")}` : "";
    const language = `/sublanguageid-${lang}`;
    return encodeURI(epis + query + sea + language).toLowerCase();
  };

  //Construct URL for hash search
  const hashUrlConstructor = (fileSize, hash, lang) => {
    const url = encodeURI(
      `/moviebytesize-${fileSize}/moviehash-${hash}/sublanguageid-${lang}`
    );
    return url;
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
                  nameUrlConstructor={nameUrlConstructor}
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
                  hashUrlConstructor={hashUrlConstructor}
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
          {noRes && <h1>No Results Found :(</h1>}
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
