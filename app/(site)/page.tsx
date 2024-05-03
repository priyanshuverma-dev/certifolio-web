import { BackgroundBeams } from "@/components/landing/background-beams";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Intro from "@/components/landing/intro";

export default async function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Features />
      <Footer />
      {/* <BackgroundBeams /> */}
    </>
  );
}
