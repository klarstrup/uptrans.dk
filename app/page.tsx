import Image from "next/image";
import UpTransShonkTransPng from "./UpTransShonkTrans.png";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.GuildScheduledEvents],
});
client.login(process.env.DISCORD_TOKEN);
export default async function Home() {
  const guild =
    client.guilds.cache.get("1348233191349026846") ||
    (await client.guilds.fetch("1348233191349026846"));
  const scheduledEventsCollection = await guild.scheduledEvents.fetch();

  return (
    <main className="min-h-screen justify-center p-8 outline-solid [outline-width:1em] outline-[#dcccb6] [text-shadow:0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6,0_0_1em_#dcccb6] flex flex-col-reverse sm:flex-row gap-8 items-center text-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-7xl font-bold text-foreground">UpTrans</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Trans & Non-Binary Bouldering Meet-Up
        </h2>
        <p className="text-lg font-semibold text-foreground max-w-[35rem]">
          Do you want to climb with fellow trans and non-binary climbers?
        </p>
        <hr className="border-black/25 border-solid border-2 my-1 mx-auto w-full max-w-[18rem]" />
        <p className="text-lg font-semibold text-foreground max-w-[35rem]">
          Doesn&apos;t matter if you&apos;re a first-timer or a crusher, this is
          a space for us to come together, have fun, get comfortable and to grow
          as climbers and as a community within climbing.
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          Upcoming Meet-Ups:
        </h2>
        <ul
          className="text-lg [text-shadow:none] sm:text-xl flex flex-col gap-2 font-semibold text-foreground max-w-[35rem] text-left"
          style={{ listStyleType: "none" }}
        >
          {scheduledEventsCollection.map((event) => (
            <li
              className={`
                border border-solid border-foreground rounded-md p-2
                bg-white flex flex-col gap-1
                `}
              key={event.id}
            >
              <div className="text-xl font-semibold">
                {event.scheduledStartAt &&
                  new Date(event.scheduledStartAt).toLocaleString("da-DK", {
                    dateStyle: "long",
                  })}
              </div>
              <div className="text-base font-semibold">
                {event.name}
              </div>
              {event.description ? (
                <p className="text-base font-normal">
                  {event.description}
                </p>
              ) : null}
              <span
                className="text-sm font-normal"
                style={{ fontStyle: "italic" }}
              >
                {event.entityMetadata?.location}
              </span>
            </li>
          ))}
        </ul>
        <div
          className="text-xs font-semibold text-foreground"
          style={{ fontStyle: "italic" }}
        >
          📆 Add schedule to your calendar:{" "}
          <a href="/schedule.ics" className="text-blue-500">
            http://uptrans.dk/schedule.ics
          </a>
        </div>
        <hr className="border-black/25 border-solid border-2 my-1 mx-auto w-full max-w-[18rem]" />
        <p className="text-lg font-semibold text-foreground">
          If you have any questions, feel free to reach out on Discord or email.
        </p>
        <div className="flex gap-4 flex-row flex-wrap items-center justify-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors [text-shadow:none] flex items-center justify-center bg-[#5865F2] text-white gap-2 hover:text-black hover:bg-[#ff0] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://discord.gg/uhchMEGEMB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 -28.5 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                  fill="currentColor"
                  fillRule="nonzero"
                ></path>
              </g>
            </svg>
            <span className="text-lg font-bold">Join us on Discord</span>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors [text-shadow:none] flex items-center justify-center bg-foreground text-white gap-2 hover:text-black hover:bg-[#ff0] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="mailto:uptrans@klarstrup.dk"
            target="_blank"
            rel="noopener noreferrer"
          >
            ✉️
            <span className="text-lg font-bold">Contact by email</span>
          </a>
        </div>

        <hr className="border-black/25 border-solid border-2 my-1 mx-auto w-full max-w-[18rem]" />
        <p className="text-base text-foreground">
          Suggest changes or improvements to this website on{" "}
          <a
            className="[text-shadow:none] text-blue-500 text-lg font-semibold"
            href="https://github.com/klarstrup/uptrans.dk"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <Image
        src={UpTransShonkTransPng}
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </main>
  );
}
