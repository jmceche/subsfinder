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
  subFormat,
}) => {
  return (
    <Fragment>
      {/*  <tr>
        <td label='Title'>
          <h4>{title}</h4>
          {movieKind === "episode" ? (
            <p>{`Season: ${serieSeason} - Episode: ${serieEpisode}`}</p>
          ) : null}
          <p>{subFile}</p>
        </td>
        <td label='Language'>{subLang}</td>
        <td id='date-b' label='Uploaded'>
          {uploadDate}
        </td>
        <td label='Download'>
          <a href={subLink.slice(0, -2) + subFormat}>
            <i className='fas fa-file-download all-center'></i>
          </a>
        </td>
      </tr> */}
      <h4 className='text-center'>{title}</h4>
      {movieKind === "episode" && (
        <p>{`Season: ${serieSeason} - Episode: ${serieEpisode}`}</p>
      )}
      <p>
        <strong>File Name:</strong> {subFile}
      </p>
      <p>
        <strong>Language:</strong> {subLang}
      </p>
      <p>
        <strong>Uploaded:</strong> {uploadDate}
      </p>
      <a
        className='btn btn-block btn-primary text-center'
        href={subLink.slice(0, -2) + subFormat}
      >
        Download Subtitle <i className='fas fa-file-download'></i>
      </a>
    </Fragment>
  );
};

SubItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubItem;
