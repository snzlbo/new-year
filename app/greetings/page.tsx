"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { createLogs } from "@/lib/graphql/mutations";
import awsmobile from "@/aws-exports";

Amplify.configure(awsmobile);
const client = generateClient();

export default function Greetings() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const resp = await client.graphql({
        query: createLogs,
        variables: {
          input: {
            username: name
          }
        }
      });

      const speech = await fetch(
        "https://quvajuy6na.execute-api.ap-northeast-1.amazonaws.com/generate_speech",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: resp.data.createLogs.id,
            username: resp.data.createLogs.username
          })
        }
      );
      console.log(speech.json());

      if (!speech.ok) {
        throw new Error("Speech generation failed");
      }

      toast.success("Successfully sent! 🎉");
      setName("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center w-full px-4 bg-black">
      <div className="w-full max-w-md mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg animate__animated animate__bounceInDown">
          Happy New Year
        </h1>
        <p className="text-2xl font-bold text-white mb-6 animate__animated animate__backInLeft">
          DDAM ALL 🎉
        </p>
      </div>

      <div className="w-full max-w-sm mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg"
        >
          <div className="space-y-2">
            <label className="text-xl text-white font-medium">Your Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name (min. 3 characters)"
              className="bg-white/20 border-white/20 text-white placeholder:text-white/70"
              required
              minLength={3}
            />
          </div>

          <div>
            <p className="text-lg text-white text-center">
              Send your wishes to everyone!
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || name.length < 3}
            className="w-full bg-blue-500/75 hover:bg-blue-500/90 text-white border border-white/50"
          >
            {isSubmitting ? "..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
