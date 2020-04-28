import React, { Fragment } from "react";

const Languages = ({ selectLang }) => {
  const onChange = (e) => {
    selectLang(e.target.value);
  };
  return (
    <Fragment>
      <select name='lang' id='lang' onChange={onChange}>
        {/* <option value='all'>ALL</option> */}
        <option value='eng'>English</option>
        <option value='spa'>Spanish</option>
      </select>
    </Fragment>
  );
};

export default Languages;
