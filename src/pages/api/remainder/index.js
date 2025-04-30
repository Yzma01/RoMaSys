// /app/api/send-reminders/route.js (Next.js App Router)

import { startMessageSending } from "../backend/schedule-messages/membership-to-expire.js"

export async function GET() {
  await startMessageSending();
  return new Response("Reminders processed", { status: 200 });
}
