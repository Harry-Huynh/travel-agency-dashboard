"use client";

import { cn, formatDate } from "@/lib/utils";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import Image from "next/image";

const UserTable = ({ users }: { users: UserData[] }) => {
  return (
    <GridComponent dataSource={users} gridLines="None">
      <ColumnsDirective>
        <ColumnDirective
          field="name"
          headerText="Name"
          width="200"
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
          field="email"
          headerText="Email Address"
          width="200"
          textAlign="Left"
        />

        <ColumnDirective
          field="joinedAt"
          headerText="Date Joined"
          width="140"
          textAlign="Left"
          template={({ joinedAt }: { joinedAt: string }) =>
            formatDate(joinedAt)
          }
        />

        <ColumnDirective
          field="status"
          headerText="Type"
          width="100"
          textAlign="Left"
          template={({ status }: UserData) => (
            <article
              className={cn(
                "status-column",
                status === "user" ? "bg-success-50" : "bg-light-300"
              )}
            >
              <div
                className={cn(
                  "size-1.5 rounded-full",
                  status === "user" ? "bg-success-500" : "bg-gray-500"
                )}
              />
              <h3
                className={cn(
                  "text-xs font-medium",
                  status === "user" ? "text-success-700" : "text-gray-500"
                )}
              >
                {status}
              </h3>
            </article>
          )}
        />
      </ColumnsDirective>
    </GridComponent>
  );
};

export default UserTable;
