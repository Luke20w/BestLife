import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import { Button } from "./components";

export default function Header(props) {
  // Cookies for user authentication
  const cookies = new Cookies();

  // Navigation
  const location = useLocation();
  const history = useHistory();

  // Redirect the user back to sign in if they are not signed in
  useEffect(() => {
    if (!cookies.get("user") && !props.blackList.includes(location.pathname)) {
      history.push("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function signOut() {
    history.push("/sign-in");
    cookies.remove("user");
  }

  if (!(props.blackList && props.blackList.includes(location.pathname))) {
    return (
      <div className="sticky top-0 w-screen px-5 py-3 bg-white shadow-sm z-10 justify-between flex items-center">
        <p className="text-xl font-bold">BestLife</p>
        <div className="flex gap-5">
          {props.pages
            ? Object.keys(props.pages).map((key) => (
                <Button
                  key={key}
                  type="text"
                  selected={location.pathname === props.pages[key]}
                  onClick={() => history.push(props.pages[key])}
                >
                  {key}
                </Button>
              ))
            : null}
        </div>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    );
  }
  return null;
}
