// app/api/initialize/route.js o pages/api/initialize.js
import { startMessageSending } from "./schedule-messages/membership-to-expire.js";

export async function GET() {
  try {
    await startMessageSending();
    return new Response("Initialization completed successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error during initialization", { status: 500 });
  }
}
