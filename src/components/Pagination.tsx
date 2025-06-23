"use client";

import { PagerComponent } from "@syncfusion/ej2-react-grids";

const Pagination = ({ total, page }: { total: number; page: number }) => {
  const handlePageChange = (page: number) => {
    window.location.search = `?page=${page}`;
  };

  return (
    <PagerComponent
      totalRecordsCount={total}
      pageSize={8}
      currentPage={page}
      click={(args) => handlePageChange(args.currentPage)}
      cssClass="!mb-4"
    />
  );
};

export default Pagination;
