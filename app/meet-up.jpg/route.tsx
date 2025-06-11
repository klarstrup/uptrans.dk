import { Client, GatewayIntentBits } from "discord.js";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const client = new Client({
  intents: [GatewayIntentBits.GuildScheduledEvents],
});
client.login(process.env.DISCORD_TOKEN);

export async function GET() {
  const fontData = await readFile(
    resolve(
      process.cwd(),
      "./app/meet-up.jpg/HelveticaNeue-CondensedBlack-10.ttf"
    )
  );
  const logoData = await readFile(
    resolve(process.cwd(), "./app/meet-up.jpg/bg.jpg")
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
            width={800}
            height={800}
            alt={"a"}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: "-1",
            }}
          />
          <div />
          <div />
          <div style={{ display: "flex" }}>
            <h1
              style={{
                fontSize: 150,
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
                fontSize: 150,
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
                fontSize: 80,
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
                fontSize: 64,
                textShadow: Array.from({ length: 40 })
                  .map(() => `0 0 0.08em rgba(0, 0, 0)`)
                  .join(","),
                transform: "rotate(-7deg)",
              }}
            >
              {nextMeetUp.entityMetadata?.location?.split(",")[0] ?? ""}
            </div>
          ) : null}
          <div />
          <div />
          <div
            style={{
              fontSize: 40,
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
        width: 600,
        height: 800,
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
