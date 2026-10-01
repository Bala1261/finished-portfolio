import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(2, "Message is too short!"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json(
        { error: zodError.errors[0].message },
        { status: 400 }
      );

    // If RESEND_API_KEY is not configured, simulate success (works out-of-the-box without API key)
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact submission received (demo mode - no RESEND_API_KEY):", zodData);
      return Response.json({
        id: "demo-message-id",
        message: "Message received successfully!",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      return Response.json({ error: resendError.message }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
