import { confirmable, createConfirmation } from "react-confirm";
import { Exclamation } from "heroicons-react";

import { Button, Modal } from "../base/components";

function ConfirmModal(props) {
  return (
    <Modal isOpen={props.show} hideButtons>
      <div className="flex gap-3 justify-between items-start">
        <div className={`bg-${props.color}-100 rounded-full p-2 -ml-1`}>
          <Exclamation className={`text-${props.color}-600`} size={18} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-xl mb-3">{props.title}</p>
          <p className="text-sm">{props.message}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-5">
        <Button shade={100} color={props.color} onClick={() => props.proceed(false)}>
          Cancel
        </Button>
        <Button color={props.color} onClick={() => props.proceed(true)}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

// Create confirm function
const confirmUnwrapped = createConfirmation(confirmable(ConfirmModal));

export default function confirm(title, message, color = "red") {
  return confirmUnwrapped({ title, message, color });
}
