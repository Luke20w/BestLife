import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import { ENTRIES, INSERT_ENTRY } from "../service/graphql";
import { Modal, Button } from "../components/base/components";

export default function HomePage(props) {
  // Cookies for user authentication
  const cookies = new Cookies();

  // Navigation
  const location = useLocation();
  const history = useHistory();

  // State variables
  const [entries, setEntries] = useState([]);
  const [stress, setStress] = useState(0);
  const [activity, setActivity] = useState(0);
  const [social, setSocial] = useState(0);
  const [nutrition, setNutrition] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [spirituality, setSpirituality] = useState(0);

  // UI State variables
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  // Redirect the user back to sign in if they are not signed in
  useEffect(() => {
    if (!cookies.get("user") && location.pathname !== "/sign-in") {
      history.push("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  async function getEntries() {
    return (
      await props.client.query({
        query: ENTRIES,
        variables: {
          userId: cookies.get("user")._id,
        },
      })
    ).data.entries;
  }

  function signOut() {
    history.push("/sign-in");
    cookies.remove("user");
  }

  function insertEntry() {
    props.client.mutate({
      mutation: INSERT_ENTRY,
      variables: {
        data: {
          userId: cookies.get("user")._id,
          date: new Date(),
          stress: stress,
          activity: activity,
          social: social,
          nutrition: nutrition,
          sleep: sleep,
          spirituality: spirituality,
        },
      },
    });
  }

  return (
    <div>
      <Button onClick={() => setFormModalIsOpen(true)}>New Form</Button>
      <Modal
        isOpen={formModalIsOpen}
        title="Form"
        onSubmit={() => console.log("Submitted")}
        close={() => setFormModalIsOpen(false)}
      />
    </div>
  );
}
