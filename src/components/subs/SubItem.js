//Agregar evento para descargar subtitulo
// ver video react todo list

import React, { Fragment } from "react";
import PropTypes from "prop-types";

const SubItem = ({
  title,
  subLink,
  uploadDate,
  subLang,
  subFile,
  movieKind,
  serieSeason,
  serieEpisode,
}) => {
  return (
    <Fragment>
      <tr>
        <td>
          <h4>{title}</h4>
          {movieKind === "episode" ? (
            <span>
              <p>{`Season: ${serieSeason}`}</p>
              <p>{`Episode: ${serieEpisode}`}</p>
            </span>
          ) : (
            <p></p>
          )}
          <a href={subLink}>{subFile}</a>
        </td>
        <td>{subLang}</td>
        <td>{uploadDate}</td>
        <td>
          <a href={subLink}>
            <i className='fas fa-file-download all-center'></i>
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

SubItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubItem;
