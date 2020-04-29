import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import NameSearch from "./components/subs/NameSearch";
import HashSearch from "./components/subs/HashSearch";
import SubList from "./components/subs/SubList";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [noRes, setNoRes] = useState(false);

  // Search subtitles
  const searchSubs = async (url) => {
    setNoRes(false);
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "X-User-Agent": "jm_osdownloader",
    };
    try {
      const uri = `https://rest.opensubtitles.org/search${url}`;
      const resp = await Axios.get(uri, { headers: headers });
      //const data = resp.data;
      setLoading(false);
      resp.data.length === 0 ? setNoRes(true) : setSubs(resp.data);
    } catch (err) {
      showAlert(err.message, "danger");
    }
  };

  //Construct URL for name search
  const nameUrlConstructor = (title, season, episode, lang) => {
    // URL variables
    //const baseUrl = `/search`;
    const query = `/query-${title}`;
    const epis =
      episode.length > 0 ? `/episode-${episode.replace(/^0+/, "")}` : "";
    const sea = season.length > 0 ? `/season-${season.replace(/^0+/, "")}` : "";
    const language = `/sublanguageid-${lang}`;
    //console.log(baseUrl + epis + query + sea + lang);
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
          {subs.length > 0 && <SubList subs={subs} loading={loading} />}
        </div>
      </div>
    </Router>
  );
};

export default App;
