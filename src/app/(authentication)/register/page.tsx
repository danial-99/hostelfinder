import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import SignupForm from "./(components)/signup";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Sign Up"}
        subTitle={"Lorem Ipsum is simply"}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, temporibus."
      >
        <Typography
          variant="h4"
          className="text-[32px] font-medium text-center"
        >
          Hello! Register for an account
        </Typography>
        <SignupForm />
      </AuthLayout>
    </>
  );
};

export default Page;
