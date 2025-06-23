"use client";

import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";

const SingleChip = () => {
  return (
    <ChipListComponent>
      <ChipsDirective>
        <ChipDirective text="4.9/5" cssClass="!bg-yellow-50 !text-yellow-700" />
      </ChipsDirective>
    </ChipListComponent>
  );
};

export default SingleChip;
