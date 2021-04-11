import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "rsuite/dist/styles/rsuite-default.css";
import { useQuery, useMutation } from "@apollo/client";

import { ENTRIES, INSERT_ENTRY } from "../service/graphql";
import { Modal, Button, HealthFactor, HeatMap } from "../components/components";

export default function HomePage(props) {
  // Cookies for user authentication
  const cookies = new Cookies();

  // State variables
  const [entries, setEntries] = useState([]);
  const [values, setValues] = useState([]);
  const [stress, setStress] = useState(0);
  const [activity, setActivity] = useState(0);
  const [social, setSocial] = useState(0);
  const [nutrition, setNutrition] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [spirituality, setSpirituality] = useState(0);

  // UI State variables
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);

  // Queries
  const { data: entriesData, refetch: refetchEntries } = useQuery(ENTRIES, {
    variables: {
      userId: cookies.get("user")._id,
    },
  });

  // Mutations
  const [insertEntry] = useMutation(INSERT_ENTRY, {
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
    onCompleted: () => {
      refetchEntries();
      props.alert("Your entry is in!", "Your health data should be updated and ready to go", "green");
    },
  });

  useEffect(() => {
    if (cookies.get("user") && entriesData) setEntries(entriesData.entries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entriesData]);

  useEffect(() => {
    console.log(entries);
    let values = [];
    for (const entry of entries) {
      let row = [];
      row.push(entry.stress);
      row.push(entry.activity);
      row.push(entry.social);
      row.push(entry.nutrition);
      row.push(entry.sleep);
      row.push(entry.spirituality);
      values.push(row);
    }
    setValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-start mb-10">
        <p className="text-5xl font-black">Welcome to BestLife!</p>
        <Button onClick={() => setFormModalIsOpen(true)} shade={100}>
          New Week Entry
        </Button>
      </div>
      <HeatMap values={values} />
      <Modal
        isOpen={formModalIsOpen}
        title="New Week Entry"
        onSubmit={insertEntry}
        close={() => setFormModalIsOpen(false)}
      >
        <HealthFactor name="stress" value={stress} setValue={setStress} />
        <HealthFactor name="physical activity" value={activity} setValue={setActivity} />
        <HealthFactor name="social activity" value={social} setValue={setSocial} />
        <HealthFactor name="nutrition" value={nutrition} setValue={setNutrition} />
        <HealthFactor name="sleep" value={sleep} setValue={setSleep} />
        <HealthFactor name="spirituality" value={spirituality} setValue={setSpirituality} />
      </Modal>
    </div>
  );
}
