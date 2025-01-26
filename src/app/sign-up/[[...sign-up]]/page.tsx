import { SignUp} from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-red-400 w-full">
      <SignUp />
    </div>
  );
}
