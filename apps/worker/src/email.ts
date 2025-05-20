import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, body: string) {
  try {
    const response = await resend.emails.send({
      from: "autoweave.example.com", // must be verified in Resend
      to,
      subject: "Hello from zapier",
      html: body,
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
