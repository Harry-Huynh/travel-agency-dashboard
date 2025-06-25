"use client";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import Image from "next/image";

const DashboardTable = ({
  dataSource,
  field,
  headerText,
}: {
  dataSource: object[];
  field: string;
  headerText: string;
}) => {
  return (
    <GridComponent dataSource={dataSource} gridLines="None">
      <ColumnsDirective>
        <ColumnDirective
          field="name"
          headerText="Name"
          width="225"
          textAlign="Left"
          template={(props: UserData) => (
            <div className="flex items-center gap-1.5 px-4">
              <Image
                src={props.imageUrl}
                alt="user"
                width="32"
                height="32"
                className="rounded-full aspect-square"
              />
              <span>{props.name}</span>
            </div>
          )}
        />

        <ColumnDirective
          field={field}
          headerText={headerText}
          width="150"
          textAlign="Left"
        />
      </ColumnsDirective>
    </GridComponent>
  );
};

export default DashboardTable;
