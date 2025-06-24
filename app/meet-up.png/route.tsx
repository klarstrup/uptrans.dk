import { Client, GatewayIntentBits } from "discord.js";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const client = new Client({
  intents: [GatewayIntentBits.GuildScheduledEvents],
});
client.login(process.env.DISCORD_TOKEN);

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const fontData = await readFile(
    resolve(
      process.cwd(),
      "./app/meet-up.png/HelveticaNeue-CondensedBlack-10.ttf"
    )
  );
  const logoData = await readFile(
    resolve(process.cwd(), "./app/meet-up.png/bg.jpg")
  );
  const logoSrc = Uint8Array.from(logoData).buffer;
  const guild =
    client.guilds.cache.get("1348233191349026846") ||
    (await client.guilds.fetch("1348233191349026846"));
  const scheduledEventsCollection = await guild.scheduledEvents.fetch();

  const nextMeetUp = scheduledEventsCollection
    .sort(
      (a, b) =>
        new Date(a.scheduledStartAt!).getTime() -
        new Date(b.scheduledStartAt!).getTime()
    )
    .first();

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "black",
            color: "white",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc as unknown as string}
            alt={"a"}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <div />
          <div />
          <div style={{ display: "flex" }}>
            <h1
              style={{
                fontSize: 300,
                fontWeight: "bold",
                textAlign: "center",
                textShadow: Array.from({ length: 40 })
                  .map(() => `0 0 0.06em rgba(0, 0, 0)`)
                  .join(","),
                transform: "rotate(-7deg)",
                paddingLeft: "0.125em",
              }}
            >
              Up
            </h1>
            <h1
              style={{
                fontSize: 300,
                fontWeight: "bold",
                textAlign: "center",
                textShadow: Array.from({ length: 40 })
                  .map(() => `0 0 0.06em rgba(0, 0, 0)`)
                  .join(","),
                transform: "rotate(7deg)",
              }}
            >
              Trans
            </h1>
          </div>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          {nextMeetUp ? (
            <div
              style={{
                fontSize: 160,
                textShadow: Array.from({ length: 40 })
                  .map(() => `0 0 0.08em rgba(0, 0, 0)`)
                  .join(","),
                transform: "rotate(-7deg)",
              }}
            >
              {nextMeetUp.scheduledStartAt?.toLocaleString("en-DK", {
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Copenhagen",
              })}
            </div>
          ) : null}
          {nextMeetUp ? (
            <div
              style={{
                fontSize: 128,
                textShadow: Array.from({ length: 40 })
                  .map(() => `0 0 0.08em rgba(0, 0, 0)`)
                  .join(","),
                transform: "rotate(-7deg)",
                textAlign: "center",
              }}
            >
              {nextMeetUp.entityMetadata?.location?.split(",")[0] ?? ""}
            </div>
          ) : null}
          <div />
          <div />
          <div
            style={{
              fontSize: 80,
              textShadow: Array.from({ length: 40 })
                .map(() => `0 0 0.1em rgba(0, 0, 0)`)
                .join(","),
            }}
          >
            More info on uptrans.dk
          </div>
          <div />
          <div />
        </div>
      ),
      {
        width: 1200,
        height: 1600,
        fonts: [
          {
            name: "Helvetica Neue Condensed Black",
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
      return new Response(`Failed to generate the image`, {
        status: 500,
      });
    }

    // who the fuck knows what this is
    throw e;
  }
}
