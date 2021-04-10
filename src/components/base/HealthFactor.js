import { Card } from "./components";
import { Slider, Tooltip } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

export default function HealthFactor(props) {
    return (
      <div className={props.className + " flex flex-col gap-2 text-xs"}>
        <Card
          fullWidth={true}
        >Please rate your {props.name} (from low to high) over the past week.
            <Slider
              defaultValue={0}
              min={0}
              step={1}
              max={10}
              graduated
              progress
              renderMark={mark => {
                return mark;
              }}
          />
        </Card>
      </div>
    );
  }
  