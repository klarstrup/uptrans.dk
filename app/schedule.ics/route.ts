import { Client, GatewayIntentBits } from "discord.js";
import * as ical from "ical-generator";
import { NextResponse } from "next/server";

const client = new Client({
  intents: [GatewayIntentBits.GuildScheduledEvents],
});
client.login(process.env.DISCORD_TOKEN);
export async function GET() {
  const guild =
    client.guilds.cache.get("1348233191349026846") ||
    (await client.guilds.fetch("1348233191349026846"));
  const scheduledEventsCollection = await guild.scheduledEvents.fetch();

  const calendar = new ical.ICalCalendar({
    name: "UpTrans - Trans & Non-Binary Bouldering Meet-Ups",
    timezone: "Europe/Copenhagen",
    url: "https://uptrans.dk",
  });

  for (const event of scheduledEventsCollection.values()) {
    calendar.createEvent({
      start: event.scheduledStartAt!,
      end: event.scheduledEndAt!,
      summary: event.name,
      description: event.description ?? "",
      location: event.entityMetadata?.location ?? "",
      url: event.url ?? "",
    });
  }

  const icsFile = calendar.toString();

  return new NextResponse(icsFile, {
    headers: { "Content-Type": "text/calendar" },
  });
}
