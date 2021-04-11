import { Card } from "./components";
import { Slider } from "rsuite";

import "rsuite/dist/styles/rsuite-default.css";

export default function HealthFactor(props) {
  return (
    <Card className={props.className + " flex flex-col gap-3 px-5"} fullWidth={true}>
      Please rate your {props.name} (from low to high) over the past week.
      <div>
        <Slider
          defaultValue={0}
          min={0}
          step={1}
          max={10}
          graduated
          progress
          renderMark={(mark) => {
            return mark;
          }}
          value={props.value}
          onChange={(value) => props.setValue(value)}
        />
      </div>
    </Card>
  );
}
