import { useState } from "react";

import { Modal, Button } from "./components/base/components";

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
      ></Modal>
    </div>
  );
}
