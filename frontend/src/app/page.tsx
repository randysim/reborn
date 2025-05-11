'use client'
import { UserContext } from "./components/Auth";
import SignIn from "./components/SignIn";
import { useContext } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const { signedIn } = useContext(UserContext)

  if (signedIn) redirect("/dashboard");

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
