'use client';
import InfoIcon from "./InfoIcon";
import { API_URL } from "../lib/constants"

export default function SignIn() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `${API_URL}/login/oauth2/authorization/google`

    window.open(url, "_self")
  }

  return (
    <form 
        onSubmit={handleSubmit} 
        className="flex flex-col items-center gap-4 border-2 border-white p-10 px-20 [box-shadow:0_0_20px_#3b82f6] text-white [text-shadow:0_0_10px_#3b82f6] bg-white/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <div className="border-2 border-white p-2 mr-2 [box-shadow:0_0_20px_#3b82f6]">
          <InfoIcon />
        </div>
        <div className="border-2 border-white p-2 px-8 [box-shadow:0_0_20px_#3b82f6]">
            <h1 className="text-center text-4xl font-bold [text-shadow:0_0_10px_#3b82f6]">NOTIFICATION</h1>
        </div>
      </div>
      <p className="text-lg w-3/4 my-10 leading-10 [text-shadow:0_0_10px_#3b82f6]">
        Your heart will stop in <span className="text-red-500">0.02 seconds</span> if you choose not to accept.<br></br>Will you accept?
      </p>
      <button type="submit" className="border-2 border-white p-2 px-8 cursor-pointer hover:bg-white hover:text-black [box-shadow:0_0_20px_#3b82f6] [text-shadow:0_0_10px_#3b82f6] font-bold">
        [YES] Google Sign In
      </button>
    </form>
  );
}