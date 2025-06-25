"use client";

import { tripXAxis, tripYAxis, userXAxis, userYAxis } from "@/constants";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

const Chart = ({
  userGrowth,
  tripByTravelStyle,
}: {
  userGrowth: object[];
  tripByTravelStyle: object[];
}) => {
  return (
    <>
      <ChartComponent
        id="chart-1"
        primaryXAxis={userXAxis}
        primaryYAxis={userYAxis}
        title="User Growth"
        tooltip={{ enable: true }}
      >
        <Inject
          services={[
            ColumnSeries,
            SplineAreaSeries,
            Category,
            DataLabel,
            Tooltip,
          ]}
        />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={userGrowth}
            xName="day"
            yName="count"
            type="Column"
            name="Column"
            columnWidth={0.3}
            cornerRadius={{ topLeft: 10, topRight: 10 }}
          />

          <SeriesDirective
            dataSource={userGrowth}
            xName="day"
            yName="count"
            type="SplineArea"
            name="Wave"
            fill="rgba(71, 132, 238, 0.3)"
            border={{ width: 2, color: "#4784EE" }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>

      <ChartComponent
        id="chart-2"
        primaryXAxis={tripXAxis}
        primaryYAxis={tripYAxis}
        title="Trip Trends"
        tooltip={{ enable: true }}
      >
        <Inject
          services={[
            ColumnSeries,
            SplineAreaSeries,
            Category,
            DataLabel,
            Tooltip,
          ]}
        />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={tripByTravelStyle}
            xName="travelStyle"
            yName="count"
            type="Column"
            name="day"
            columnWidth={0.3}
            cornerRadius={{ topLeft: 10, topRight: 10 }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </>
  );
};

export default Chart;
