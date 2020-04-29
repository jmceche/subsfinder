import React from "react";
import SubItem from "./SubItem";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const SubList = ({ subs, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <table className='list text-center'>
        <thead>
          <tr>
            <th id='name'>Name</th>
            <th>Language</th>
            <th>Uploaded</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub) => (
            <SubItem
              key={sub.IDSubtitleFile}
              title={sub.MovieName}
              subFile={sub.SubFileName}
              subLink={sub.ZipDownloadLink}
              uploadDate={sub.SubAddDate}
              subLang={sub.LanguageName}
              movieKind={sub.MovieKind}
              serieSeason={sub.SeriesSeason}
              serieEpisode={sub.SeriesEpisode}
            />
          ))}
        </tbody>
      </table>
    );
  }
};

//PropTypes
SubList.propTypes = {
  subs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SubList;
