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
  username: z.string().min(1, "Name is required"),
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
  confirmPassword: z.string().refine(
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

const SignupForm = () => {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      remeber: false,
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data, 'form data');
  }
  
  return (
    <div className="mt-12">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
            control={form.control}
            name={"username"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  placeholder="Username"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />   <FormField
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
                  placeholder="Password"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder="Confirm password"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name={"terms&Conditions"}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <div className="flex justify-start items-center gap-x-2">
                    <Checkbox value={field.value} onSelect={field.onChange} />
                    <Typography className="text-muted-foreground text-xs">
                      I accept {' '}
                    <Link href={'/terms-conditions'} className="text-xs text-primary">
                      terms and conditions
                    </Link>
                    </Typography>
                  </div>
                  <FormControl>
                    <FormMessage />
                  </FormControl>
                </FormItem>
              )}
            />
          <Button
            disabled={false}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90"
          >
            {false && <Loader2 className="animate-spin text-white h-4 w-4" />}
            <Typography variant="span">Register</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        Already have an account?{" "}
        <Link href={"/login"} className="text-primary">
          Login Now
        </Link>
      </Typography>
    </div>
  );
};

export default SignupForm;
