import { useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { USER } from "../service/graphql";
import { Button, Input } from "../components/base/components";

export default function SignInPage(props) {
  const cookies = new Cookies();
  const history = useHistory();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Call to the backend to sign in
  async function signIn(e) {
    e.preventDefault();

    const user = (
      await props.client.query({
        query: USER,
        variables: {
          email: email,
          password: password,
        },
      })
    ).data.user;

    if (user) {
      const expires = new Date();
      expires.setTime(expires.getTime + 7 * 24 * 60 * 60 * 1000 - 60000);
      cookies.set("user", user, { path: "/", expires });
      history.push("/home");
    } else {
      props.alert("Sign In failed", "Your email and/or password are incorrect", "red");
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-sm p-10">
        <p className="text-3xl font-bold mr-40">Sign in to your account</p>
        <div className="my-5" />
        <form className="flex flex-col gap-2" onSubmit={signIn}>
          <Input title="Email" placeholder="george1@gatech.edu" value={email} setValue={setEmail} />
          <Input type="password" title="Password" placeholder="password" value={password} setValue={setPassword} />
          <Button type="submit" className="mt-10">
            <p>Sign In</p>
          </Button>
        </form>
      </div>
    </div>
  );
}
