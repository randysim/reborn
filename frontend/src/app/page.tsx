'use client'
import { UserContext } from "./components/Auth";
import SignIn from "./components/SignIn";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { signedIn, user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (signedIn) {
      router.push("/dashboard")
    }
  }, [user])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Yes");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
