import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { INSERT_USER } from "../service/graphql";
import { Button, Input } from "../components/components";

export default function CreateAccountPage(props) {
  const history = useHistory();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mutations
  const [insertUserMutation] = useMutation(INSERT_USER, {
    variables: {
      data: {
        email: email,
        password: password,
      },
    },
  });

  function createAccount() {
    if (password === confirmPassword) {
      insertUserMutation();
      history.push("/sign-in");
    } else {
      props.alert("Sorry!", "It looks like your passwords didn't match. Please try again");
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-sm p-10">
        <p className="text-3xl font-bold mr-40">Create an Account</p>
        <div className="my-5" />
        <form className="flex flex-col gap-2" onSubmit={createAccount}>
          <Input title="Email" placeholder="george1@gatech.edu" value={email} setValue={setEmail} />
          <Input type="password" title="Password" placeholder="password" value={password} setValue={setPassword} />
          <Input
            type="password"
            title="Confirm Password"
            placeholder="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <Button type="submit" className="mt-10">
            <p>Create Account</p>
          </Button>
          <p className="font-bold mt-2 hover:text-indigo-600 cursor-pointer" onClick={() => history.push("/sign-in")}>
            Already have an account? Sign in
          </p>
        </form>
      </div>
    </div>
  );
}
