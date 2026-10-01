"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check for spam prevention
    if (honeypot) {
      return;
    }

    // Validation
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setStatusMessage("Please fill in all required fields.");
      toast({
        title: "Validation Error",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    if (phone.trim() && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/.test(phone.trim())) {
      setStatusMessage("Please enter a valid phone number.");
      toast({
        title: "Validation Error",
        description: "Please enter a valid phone number or leave it blank.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setStatusMessage("Sending your message...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          message,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setStatusMessage("Thank you! Your message has been sent successfully.");
      toast({
        title: "Thank you!",
        description: "I'll get back to you as soon as possible.",
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setLoading(false);
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      const timer = setTimeout(() => {
        router.push("/");
        clearTimeout(timer);
      }, 1000);
    } catch (err: any) {
      setStatusMessage(err.message || "Failed to send message. Please try again.");
      toast({
        title: "Error",
        description: err.message || "Something went wrong! Please try again.",
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  return (
    <form className="w-full mx-auto sm:mt-4" onSubmit={handleSubmit}>
      {/* Hidden honeypot field for spam prevention */}
      <input
        type="text"
        name="company_url_hp"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none", position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      />

      {/* Accessible live status region */}
      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name *</Label>
          <Input
            id="fullname"
            placeholder="Your Name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>

      <div className="mb-4">
        <LabelInputContainer>
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            placeholder="+1 555-0199"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </LabelInputContainer>
      </div>

      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message *</Label>
        <Textarea
          placeholder="Tell me anything."
          id="content"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          I&apos;ll never share your data with anyone else.
        </p>
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Message <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
