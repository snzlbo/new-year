"use client";
import { useState } from "react";
import { DeviceUUID } from "device-uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  })
});

export default function Greetings() {
  const { isMobile } = new DeviceUUID().parse();
  const deviceId = new DeviceUUID().get();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/greetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          deviceId,
          isMobile
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  console.log(isSubmitted);
  return (
    <div className="relative h-screen flex flex-col items-center justify-center w-full px-4">
      <div className="w-full max-w-md mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg animate__animated animate__bounceInDown">
          Happy New Year
        </h1>
        <p className="text-2xl font-bold text-white mb-6 animate__animated animate__backInLeft">
          DDAM ALL 🎉
        </p>
      </div>

      <div className="w-full max-w-sm mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white font-medium">
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="bg-white/20 border-white/20 text-white placeholder:text-white/70"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div>
              <p className="text-lg text-white text-center">
                Send your wishes to everyone!
              </p>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-blue-500/75 hover:bg-blue-500/90 text-white border border-white/50"
            >
              {form.formState.isSubmitting ? "..." : "Send Greeting"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
