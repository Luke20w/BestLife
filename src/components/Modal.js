import { Button } from "./components";

export default function Modal(props) {
  if (props.isOpen) {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex flex-col gap-3 text-gray-700">
              {props.titleComponent ? (
                props.titleComponent()
              ) : (
                <div className="flex justify-between items-top">
                  <p className="font-bold text-2xl">{props.title}</p>
                  {props.sideComponent ? props.sideComponent() : null}
                </div>
              )}
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  props.onSubmit();
                  props.close();
                }}
              >
                <div className={props.className + " flex flex-col gap-2"}>{props.children}</div>
                {!props.hideButtons ? (
                  <div className="flex flex-col gap-2 mt-5">
                    {props.onSubmit ? <Button type="submit">Done</Button> : null}
                    <Button shade={100} onClick={props.close}>
                      Cancel
                    </Button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
