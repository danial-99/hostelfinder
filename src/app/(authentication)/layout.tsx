"use client";
import Image from "next/image";
import AuthLayout from "./(components)/AuthLayout";
import { usePathname } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const title =
    pathname === "/login"
      ? "Sign In"
      : pathname === "/register"
      ? "Register Here"
      : pathname === "/forgot-password"
      ? "Forgot Password"
      : pathname === "/otp-verification"
      ? "OTP Verification"
      : pathname === "/reset-password"
      ? "Reset Password"
      : pathname === "/change-password"
      ? "Changed Passowrd"
      : "";

  const SubTitle =
    pathname === "/login"
      ? "Sign In into your account"
      : pathname === "/register"
      ? "Register Here to create an account"
      : pathname === "/forgot-password"
      ? "Did you Forgot your Password"
      : pathname === "/otp-verification"
      ? "please enter the OTP in your email"
      : pathname === "/reset-password"
      ? "Reset the Password"
      : pathname === "/change-password"
      ? "Changed Passowrd"
      : "";

  const description =
    pathname === "/login"
      ? "Sign In into your account"
      : pathname === "/register"
      ? "Register Here to create an account"
      : pathname === "/forgot-password"
      ? "Did you Forgot your Password"
      : pathname === "/otp-verification"
      ? "please enter the OTP in your email"
      : pathname === "/reset-password"
      ? "Reset the Password"
      : pathname === "/change-password"
      ? "Changed Passowrd"
      : "";

  return (
    <>
      <div className="bg-gradient-to-b from-primary from-60% to-40% to-white h-screen px-20">
        <div className="py-8">
          <Image
            src={"/logo.png"}
            alt="Logo"
            height={30}
            width={100}
            unoptimized={false}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
