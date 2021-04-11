import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "rsuite/dist/styles/rsuite-default.css";
import { useQuery, useMutation } from "@apollo/client";

import { ENTRIES, INSERT_ENTRY } from "../service/graphql";
import { Modal, Button, HealthFactor, HeatMap } from "../components/components";

export default function HomePage(props) {
  // Cookies for user authentication
  const cookies = new Cookies();

  // just regular ole constants
  const threshold = 0.5;

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

  const conclusion_text = {
    activity:
      "It looks like your physical activity is less than expected. Try setting a time in your calendar once a day to go outside and be active!",
    nutrition:
      "It looks like your nutrition score is less than expected. Try meal prepping on the weekend to avoid eating processed food on-demand during the week.",
    sleep:
      "It looks like your sleep score is less than expected. Try setting an alarm to put electronics away each night to try and get on a more consistent sleep schedule!",
    social:
      "It looks like your social score is less than expected. Try messaging a friend or two this week and asking if they want to spend time with you (safely) this upcoming week!",
    spirituality:
      "It looks like your spirituality score is less than expected. Try reserving time in the morning and at night solely for time dedicated for spirituality.",
    stress:
      "It looks like your stress score is higher than expected. Try putting time on your calendar to unplug from all devices and let your mind relax! Also, try and make a conscious effort to be positive throughout the day.",
  };

  function conclusions(field) {
    let sum = 0;
    for (let i = 0; i < entries.length; i++) {
      sum += entries[i][field];
    }

    if (field !== "stress") {
      if (sum / (entries.length * 10) < threshold) {
        return (
          <li className="p-1" id={field}>
            {conclusion_text[field]}
          </li>
        );
      } else {
        return <li id={field}> </li>;
      }
    } else {
      // account for the fact that stress score is reversed
      if ((entries.length * 10 - sum) / (entries.length * 10) < threshold) {
        return (
          <li className="p-1" id={field}>
            {conclusion_text[field]}
          </li>
        );
      } else {
        return <li id={field}> </li>;
      }
    }
  }

  let boilerplate_1 =
    "Welcome! In the top right you can create a new Health Update (intended to be done on a weekly basis) " +
    "by filling out the associated form with the values for how you feel your week went in a variety of categories!";

  let boilerplate_2 =
    "Below you can see a HeatMap with all of your Health Updates over time! From there you can see when " +
    "and how your health is changing over the course of a semester. This can give you great insights as to what habits you are doing well and maybe not so well :)";

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-start mb-10">
        <p className="text-5xl font-black">Welcome to BestLife!</p>
        <Button onClick={() => setFormModalIsOpen(true)} shade={100}>
          New Week Entry
        </Button>
      </div>
      <div className="text-5 bg-white shadow-nd rounded-xl p-5 mb-5">
        <p>{boilerplate_1}</p>
      </div>
      <div className="text-5 bg-white shadow-nd rounded-xl p-5 mb-5">
        <p>{boilerplate_2}</p>
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
      <ul className="text-5 bg-white shadow-nd rounded-xl p-5 mb-5 mt-10">
        {conclusions("activity")}
        {conclusions("nutrition")}
        {conclusions("sleep")}
        {conclusions("social")}
        {conclusions("spirituality")}
        {conclusions("stress")}
      </ul>
    </div>
  );
}
