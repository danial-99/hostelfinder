import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import LoginForm from "./(components)/login";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Login Into"}
        subTitle={"Lorem Ipsum is simply"}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, temporibus."
      >
        <Typography
          variant="h4"
          className="text-[32px] font-medium text-center"
        >
          Welcome back! Glad to see you , Again!
        </Typography>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Page;
