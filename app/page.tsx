"server only";

import Connect from "@/features/temp/components/connect";

export default async function Home() {
  return (
    <main className="mx-auto w-full  max-w-md space-y-4 pb-40 pt-10">
      <Connect />
    </main>
  );
}
