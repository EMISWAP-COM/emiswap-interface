import React, { ReactElement, ReactNode } from 'react';
import Header from './header';

interface TableInterface {
  children?: ReactNode;
  ariaLabel?: string;
  columns?: Array<string>;
}

const Table = ({ children, ariaLabel, columns }: TableInterface): ReactElement => {
  return (
    <table aria-label={ariaLabel}>
      <Header columns={columns} />
      {children}
    </table>
  );
};

export default Table;
