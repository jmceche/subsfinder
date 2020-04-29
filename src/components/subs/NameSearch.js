// You can search by name using either a movie name or
// a serie name adding the season and episode number

import React, { useReducer, useState } from "react";
import PropTypes from "prop-types";
import Languages from "./Languages";

const NameSearch = ({ searchSubs, nameUrlConstructor, showAlert }) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      season: "",
      episode: "",
    }
  );
  const [lang, setLang] = useState("eng");

  const onSubmit = (e) => {
    e.preventDefault();
    if (userInput.title === "") {
      showAlert("Please, enter a title", "light");
    } else {
      const url = nameUrlConstructor(
        userInput.title,
        userInput.season,
        userInput.episode,
        lang
      );
      searchSubs(url);
    }
    // Select Language
  };
  const selectLang = (lang) => {
    setLang(lang);
    //console.log(lang);
  };

  const onChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  return (
    <div className='text-center'>
      <div>
        <h1>Search Subtitles by Name</h1>
        <h4>If you want to search for movies, ignore season and episode</h4>
      </div>
      <form onSubmit={onSubmit} className='form-text'>
        <input
          type='text'
          name='title'
          placeholder='Serie or Movie title'
          value={userInput.title}
          onChange={onChange}
        />
        <input
          type='number'
          name='season'
          placeholder='Season (for series only)'
          value={userInput.season}
          onChange={onChange}
        />
        <input
          type='number'
          name='episode'
          placeholder='Episode (for series only)'
          value={userInput.episode}
          onChange={onChange}
        />
        <Languages selectLang={selectLang} />
        <input
          type='submit'
          value='Search'
          className='btn btn-block btn-dark'
          //disabled={userInput.title === ""}
        />
      </form>
    </div>
  );
};

NameSearch.propTypes = {
  searchSubs: PropTypes.func.isRequired,
  nameUrlConstructor: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default NameSearch;
