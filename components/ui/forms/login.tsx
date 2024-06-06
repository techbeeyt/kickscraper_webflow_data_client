"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/register";
import { Input } from "@/components/ui/input";
// import { loginUserFailure } from "@/redux/features/token/tokenSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export default function LoginForm({ access_token }: { access_token: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      // Validate form values using the schema
      formSchema.parse(values);
      try {
        setIsLoading(true);
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        // console.log(result);
        if (result?.error) {
          toast.error("Login Failed", {
            description: "Invalid Credentials, Please try again.",
            position: "top-center",
          });
          return;
        } else {
          toast.success("Successfully logged in.", {
            description: "We are now redirecting you to setup page.",
            position: "top-center",
          });
          router.push("/setup/setup_kickscraper_app");
        }
      } catch (error) {
        // Handle errors
        toast.error("Failed.", {
          description: (error as any).response?.data?.message,
          position: "top-center",
        });
        console.error(
          "An Axios error occurred:",
          (error as any).response?.data?.message
        );
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Form validation error:", error);
      toast.error("Failed.", {
        description: "Something went wrong with the form.",
        position: "top-center",
      });
    }
  }

  const { data: session, status } = useSession();

  useEffect(() => {
    if (access_token) {
      sessionStorage.setItem("access_token", access_token);
    }
    if (status === "authenticated") {
      router.replace("/setup/setup_kickscraper_app");
    }
  }, [status]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-[#344054] text-sm cursor-pointer"
            >
              Remember for 30 days
            </label>
          </div>

          <Link
            href="https://kickscraper.com/auth/forgot-password"
            className="text-sm text-[#1303A7]"
          >
            Forgot password
          </Link>
        </div>

        <Button
          className="w-full bg-[#1B00DF] hover:bg-[#1B00FA] mb-0"
          type="submit"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 rounded-full mr-3 border-t-2" />
          ) : (
            "Sign in"
          )}
        </Button>

        <Button
          variant="outline"
          type="button"
          onClick={() => signIn("google")}
          className="w-full flex justify-center gap-2"
        >
          <Image alt="" width={24} height={24} src="/images/google.svg"></Image>
          <span>Sign in with Google</span>
        </Button>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/setup/account/register" className="text-[#1303A7]">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
