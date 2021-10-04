import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

const QualitiesList = ({ qualities }) => {
  return <>
    {qualities.map((quality) => {
      return <Quality {...quality} key={quality._id} />;
    })}
  </>;
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
