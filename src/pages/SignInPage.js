import { useState } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Refresh } from "@heroicons/react";

import { Button, Input } from "../components/base/components";

export default function SignInPage(props) {
  const cookies = new Cookies();
  const history = useHistory();

  // State variables
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Call to the backend to sign in
  function signIn(e) {
    setIsLoading(true);

    // sign in
    // const expires = new Date();
    // expires.setTime(expires.getTime + 7 * 24 * 60 * 60 * 1000 - 60000);
    // cookies.set("token", body.data.authToken, { path: "/", expires });
    // cookies.set("user", body.data.user, { path: "/", expires });
    // cookies.set("role", body.data.role, { path: "/", expires });
    // history.push("/manage-lessons");

    // fail
    props.alert("Sign In failed", "Your username/email and/or password are incorrect", "red");

    setIsLoading(false);
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-sm p-10">
        <p className="text-3xl font-bold mr-40">Sign in to your account</p>
        <div className="my-5" />
        <form className="flex flex-col gap-2" onSubmit={signIn}>
          <Input title="Username" placeholder="username" value={user} setValue={setUser} />
          <Input type="password" title="Password" placeholder="password" value={password} setValue={setPassword} />
          <Button type="submit" className="mt-10">
            {isLoading ? null : <p>Sign In</p>}
          </Button>
        </form>
      </div>
    </div>
  );
}
