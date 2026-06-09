import type { Route } from "./+types/api.data-deletion-request";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { requestType, email, reason } = body;

    if (!email || !requestType) {
      return Response.json(
        { error: "Email and request type are required" },
        { status: 400 },
      );
    }

    if (!["export", "delete"].includes(requestType)) {
      return Response.json(
        { error: "Request type must be 'export' or 'delete'" },
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
    const requestTypeLabel =
      requestType === "export" ? "Data Export" : "Account Deletion";

    const logEntry = [
      `New ${requestTypeLabel} Request`,
      `Timestamp: ${timestamp}`,
      `Email: ${email}`,
      `Request Type: ${requestTypeLabel}`,
      `Reason: ${reason || "Not provided"}`,
    ].join("\n");

    console.log("Data Deletion Request:", logEntry);

    return Response.json(
      { message: "Request submitted successfully" },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
