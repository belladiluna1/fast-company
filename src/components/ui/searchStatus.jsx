import React from 'react';

const SearchStatus = ({ count }) => {
  const renderPhrase = (count) => {
    let classes = 'badge m-2 bg-';
    classes += count === 0 ? 'danger' : 'primary';
    let phrase = 'Никто с тобой не тусанет';
    if (
      (count % 100 < 10 || count % 100 > 20) &&
      count % 10 > 1 &&
      count % 10 < 5
    ) { phrase = `${count} человекa тусанет с тобой сегодня`; } else if (
      (count % 100 >= 10 && count % 100 <= 20) ||
      count % 10 === 0 ||
      count % 10 === 1 ||
      count % 10 > 4
    ) {
      phrase = `${count} человек тусанет с тобой сегодня`;
    }

    return (
      <span style={{ fontSize: 16 }} className={classes}>
        {phrase}
      </span>
    );
  };

  return renderPhrase(count);
};

export default SearchStatus;
