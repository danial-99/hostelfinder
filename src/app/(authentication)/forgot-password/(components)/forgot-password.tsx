"use client";

import Typography from "@/components/Custom/Typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.string().email().min(5, {
    message: "email must be 5 characters",
  }),
});

const ForgotPasswordForm = () => {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data, 'form data');
  }
  
  return (
    <div className="mt-16">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="mb-[200px]">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="email"
                  placeholder="Enter your email"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={false}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90 mb-11"
          >
            {false && <Loader2 className="animate-spin text-white h-4 w-4" />}
            <Typography variant="span">Submit</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        Remember Password?{" "}
        <Link href={"/login"} className="text-primary">
          Login
        </Link>
      </Typography>
    </div>
  );
};

export default ForgotPasswordForm;
