import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "rsuite/dist/styles/rsuite-default.css";

import { ENTRIES, INSERT_ENTRY } from "../service/graphql";
import { Modal, Button, HealthFactor, HeatMap } from "../components/components";

export default function HomePage(props) {
  // Cookies for user authentication
  const cookies = new Cookies();

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
    if (cookies.get("user")) getEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  async function getEntries() {
    const entriesData = (
      await props.client.query({
        query: ENTRIES,
        variables: {
          userId: cookies.get("user")._id,
        },
      })
    ).data.entries;
    setEntries(entriesData);
  }

  async function insertEntry() {
    await props.client.mutate({
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
    setEntries(getEntries());
    props.alert("Your entry is in!", "Your health data should be updated and ready to go", "green");
  }

  const values = [
    [0, 3, 5, 7, 2],
    [6, 7, 3, 7, 9],
    [1, 5, 9, 4, 8],
  ];

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-start">
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
