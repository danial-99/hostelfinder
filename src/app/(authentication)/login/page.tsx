import React from "react";
import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/ui/Custom/Typography";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Login Into"}
        subTitle={"Lorem Ipsum is simply"}
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, temporibus.'
      >
        <Typography variant="h4" className="text-[32px] font-medium text-center">Welcome back! Glad to see you , Again!</Typography>
      </AuthLayout>
    </>
  );
};

export default Page;
