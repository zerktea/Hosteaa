import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PiChart(props) {
  const { data } = props;


  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 32, additionalRadius: -30, color: "gray" },
          cx: 100,
          
        },
      ]}
      width={500}
      height={200}
    />
  );
}
