import React from 'react';
import { DataTable as RDataTable } from 'primereact/datatable';

export const DataTable = props => {
  return (
    <RDataTable
      emptyMessage="Không có dữ liệu"
      size="small"
      responsiveLayout="stack"
      breakpoint="960px"
      columnResizeMode="fit"
      {...props}
    >
      {props.children}
    </RDataTable>
  );
};