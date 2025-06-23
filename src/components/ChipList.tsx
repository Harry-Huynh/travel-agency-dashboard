"use client";

import { getFirstWord } from "@/lib/utils";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";

const ChipList = ({ pillItems }: { pillItems: PillItem[] }) => {
  return (
    <ChipListComponent id="travel-chip">
      <ChipsDirective>
        {pillItems.map((pill, i) => (
          <ChipDirective
            key={i}
            text={getFirstWord(pill.text)}
            cssClass={`${pill.bg} !text-base !font-medium !px-4`}
          />
        ))}
      </ChipsDirective>
    </ChipListComponent>
  );
};

export default ChipList;
