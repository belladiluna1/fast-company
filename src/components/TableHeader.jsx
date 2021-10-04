import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const [caret, setCaret] = useState('up');

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort((prevState) => ({
        ...prevState,
        order: prevState.order === 'asc' ? 'desc' : 'asc'
      }));
      selectedSort.order === 'desc' ? setCaret('up') : setCaret('down');
    } else {
      onSort({ path: item, order: 'asc' });
      setCaret('up');
    }
  };

  return <thead>
  <tr>
    {Object.keys(columns).map((column) => (
      <th
      key={column}
      onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
      {...{ role: columns[column].path && 'button' }}
      scope='col'>
        {columns[column].name}
        {selectedSort.path === columns[column].path && caret && <i className={`bi bi-caret-${caret}-fill`}></i>}
      </th>
    ))}
  </tr>
</thead>;
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
