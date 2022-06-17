import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
class TableHeader extends Component {
  raiseSort = path => {
    const sortedColumn = { ...this.props.sortedColumn };
    if (sortedColumn.path === path) {
      sortedColumn.order = sortedColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortedColumn.path = path;
      sortedColumn.order = 'asc';
    }
    this.props.onSort(sortedColumn);
  };
  renderSortIcon = column => {
    const { sortedColumn } = this.props;
    if (column.path !== sortedColumn.path) return null;
    if (sortedColumn.order === 'asc')
      return (
        <FontAwesomeIcon
          icon={faSortUp}
          style={{
            cursor: 'pointer',
            marginLeft: '4px',
            color: '#495057',
            fontSize: '12px'
          }}
        />
      );
    return (
      <FontAwesomeIcon
        icon={faSortDown}
        style={{
          cursor: 'pointer',
          marginLeft: '4px',
          color: '#495057',
          fontSize: '12px'
        }}
      />
    );
  };
  render() {
    const { column } = this.props;
    return (
      <thead>
        <tr>
          {column.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
export default TableHeader;
