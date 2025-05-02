// /app/api/send-reminders/route.js (Next.js App Router)

import { startMessageSending } from "../backend/schedule-messages/membership-to-expire.js"

export default async function handler(req, res) {
  console.log("taamooss");
  if (req.method === "GET") {
    await startMessageSending();
    res.status(200).send("Reminders processed");
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
