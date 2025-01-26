// "use client";
// import { SignInButton, useSignIn } from "@clerk/nextjs";
// import Link from "next/link";
// import PinkButton from "./PinkButton";
// import { Button } from "../ui/button";
// import { FaFacebook, FaFacebookF, FaGoogle } from "react-icons/fa";

// export default function Login(): JSX.Element {
//   const { signIn } = useSignIn();

//   const handleOAuthSignIn = async (
//     provider: "oauth_google" | "oauth_facebook"
//   ): Promise<void> => {
//     try {
//       await signIn?.authenticateWithRedirect({
//         strategy: provider,
//         redirectUrl: "/dashboard", // Redirect to a page after successful login
//         redirectUrlComplete: "/dashboard",
//       });
//     } catch (error) {
//       console.error("OAuth login failed:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center ">
//       <div className="p-3 py-6 md:p-14 rounded-md gap-9 flex flex-col shadow-lg max-w-[544px] w-full">
//         <div className="flex flex-col gap-3">
//           <h1 className="text-3xl font-bold text-center text-black">Login</h1>
//           <p className="text-center text-subText">
//             Please login using account details below or continue with social
//             login.
//           </p>
//         </div>

//         <form>
//           <div className="mb-4">
//             <input
//               id="email"
//               type="email"
//               placeholder="Email Address"
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pPink"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               id="password"
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pPink"
//             />
//           </div>
//           <div className="text-left text-base mb-4">
//             <Link href="#" className="text-sm text-subText hover:underline">
//               Forgot your password?
//             </Link>
//           </div>
//           <PinkButton wFull>Sign In</PinkButton>
//         </form>

//         <div className="my-2 flex items-center justify-center gap-3">
//           <hr className="flex-grow border-t border-gray-300" />
//           <span className="mx-2 text-base text-gray-500">or</span>
//           <hr className="flex-grow border-t border-gray-300" />
//         </div>

//         <div className="flex  gap-3">
//           <Button
//             variant="secondary"
//             size={"lg"}
//             onClick={() => handleOAuthSignIn("oauth_google")}
//             className="w-full h-12 text-lg flex items-center justify-center "
//           >
//             <FaGoogle />
//             <p className="hidden md:block">Google</p>
//           </Button>

//           <Button
//             variant="secondary"
//             size={"lg"}
//             onClick={() => handleOAuthSignIn("oauth_facebook")}
//             className="w-full h-12 text-lg flex items-center justify-center  "
//           >
//             <FaFacebookF />
//             <p className="hidden md:block">Facebool</p>
//           </Button>
//         </div>

//         <p className="text-center text-subText">
//           Don&apos;t have an Account?{" "}
//           <Link href="/signup" className="hover:underline">
//             Create account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import { SignIn } from "@clerk/clerk-react";
import { useState } from "react";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center z-[100] justify-center bg-black bg-opacity-50">
          <SignIn
            appearance={{
              layout: {
                socialButtonsPlacement: "bottom",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
