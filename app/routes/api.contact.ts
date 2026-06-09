import type { Route } from "./+types/api.contact";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const timestamp = new Date().toISOString();

    const logEntry = [
      `New Contact Message`,
      `Timestamp: ${timestamp}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
    ].join("\n");

    console.log("Contact Form:", logEntry);

    return Response.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }
}
