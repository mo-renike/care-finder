import { Metadata } from "next";

import Index from "./index/landing-page";

export const metadata = {
  title: "Find hospitals close to you",
};
export default function Home() {
  return (
    <main>
      <Index />
    </main>
  );
}
