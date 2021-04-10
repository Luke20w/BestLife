import { useState } from "react";

import { Modal, Button, HealthFactor} from "../components/base/components";
import { Slider } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

export default function HomePage(props) {
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setFormModalIsOpen(true)}>New Form</Button>
      <Modal
        isOpen={formModalIsOpen}
        title="Form"
        onSubmit={() => console.log("Submitted")}
        close={() => setFormModalIsOpen(false)}
      >
        <HealthFactor
          name="stress">
        </HealthFactor>
        <HealthFactor
          name="physical activity">
        </HealthFactor>
        <HealthFactor
          name="social activity">
        </HealthFactor>
        <HealthFactor
          name="nutrition">
        </HealthFactor>
        <HealthFactor
          name="sleep">
        </HealthFactor>
        <HealthFactor
          name="spirituality">
        </HealthFactor>
        <div className="flex-1 w-full"> 
        </div>  
      </Modal>
    </div>
  );
}
