import React from "react";
import SubItem from "./SubItem";
import PropTypes from "prop-types";

const SubList = ({ subs, loading }) => {
  return subs.map((sub) => (
    <div className='card'>
      <SubItem
        key={sub.IDSubtitleFile}
        title={sub.MovieName}
        subFile={sub.SubFileName}
        subLink={sub.SubDownloadLink}
        uploadDate={sub.SubAddDate}
        subLang={sub.LanguageName}
        movieKind={sub.MovieKind}
        serieSeason={sub.SeriesSeason}
        serieEpisode={sub.SeriesEpisode}
        subFormat={sub.SubFormat}
      />
    </div>
  ));
};

//PropTypes
SubList.propTypes = {
  subs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SubList;
