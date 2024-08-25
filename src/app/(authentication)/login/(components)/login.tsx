"use client";

import Typography from "@/components/Custom/Typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email().min(5, {
    message: "email must be 5 characters",
  }),
  password: z.string().refine(
    (value) => {
      return (
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[!@#$%^&*()\-_+=<>?]/.test(value) &&
        /[0-9]/.test(value)
      );
    },
    {
      message:
        "Password must contain at least 8 characters long",
    }
  ),
  remeber: z.boolean(),
});

const LoginForm = () => {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remeber: false,
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data, 'form data');
  }
  
  return (
    <div className="mt-[152px]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="mb-4">
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
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder="Enter your password"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center flex-wrap gap-x-3 gap-y-2 mb-4">
            <FormField
              control={form.control}
              name={"remember"}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-start items-center gap-x-2">
                    <Checkbox value={field.value} onSelect={field.onChange} />
                    <FormLabel className="text-muted-foreground text-xs">
                      Remember me
                    </FormLabel>
                  </div>
                  <FormControl>
                    <FormMessage />
                  </FormControl>
                </FormItem>
              )}
            />
            <Link
              href={"/forgot-password"}
              className="text-xs text-primary font-normal whitespace-nowrap"
            >
              Forget Password
            </Link>
          </div>
          <Button
            disabled={false}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90"
          >
            {false && <Loader2 className="animate-spin text-white h-4 w-4" />}
            <Typography variant="span">Login</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        Don't have an account?{" "}
        <Link href={"/register"} className="text-primary">
          Register Now
        </Link>
      </Typography>
    </div>
  );
};

export default LoginForm;
