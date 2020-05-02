import React, { useState } from "react";
import PropTypes from "prop-types";
import hashFile from "./hashFile";
import Languages from "./Languages";

const HashSearch = ({ searchSubs, showAlert }) => {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState("eng");

  //Construct URL for hash search
  const hashUrlConstructor = (fileSize, hash, lang) => {
    const url = encodeURI(
      `/moviebytesize-${fileSize}/moviehash-${hash}/sublanguageid-${lang}`
    );
    return url;
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (file === null) {
      showAlert("You need to select a file first", "light");
    } else {
      hashFile(file, (file, hash) => {
        console.log(file.size, hash);
        const url = hashUrlConstructor(file.size, hash, lang);
        searchSubs(url);
      });
    }
  };
  // Select Language
  const selectLang = (lang) => {
    setLang(lang);
    //console.log(lang);
  };

  return (
    <div className='all-center'>
      <h1>Search Subtitles by File</h1>
      <h4>Upload your file and click search</h4>
      <form onSubmit={onSubmit} className='form-text'>
        <label htmlFor='filesearch' className='custom-file-upload'>
          Select a video File
          <input type='file' id='filesearch' onChange={onChange} />
        </label>
        <p className='lead card'>
          {file ? file.name : "Your File Will Appear Here"}
        </p>
        <Languages selectLang={selectLang} />
        <input
          type='submit'
          value='Search'
          className='btn btn-block btn-dark'
          //disabled={file === null}
        />
      </form>
    </div>
  );
};

HashSearch.propTypes = {
  searchSubs: PropTypes.func.isRequired,
  hashUrlConstructor: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default HashSearch;
