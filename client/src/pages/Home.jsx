import React from "react";
import Container from "../components/UI/Container";
import HeroSection from "../components/UI/HeroSection";
import homeIllustration1 from "../assets/homeIllustation.jpg";

const Home = () => {
  return (
    <main>
      <HeroSection
        BgImg="bg-login"
        pt="pt-[10rem]"
        pb="pb-[10rem]"
        alignItem="items-center"
        OverlayColor="bg-[#000]/40"
      >
        <h1 className="text-6xl">NeuroLink</h1>
        <p className="text-neutral-200 w-[70%] mt-2 text-center">
          It is a platform that will help in diagnosis of a neurological
          disorder, stores patient history, and a data hub that will help
          researchers in their field.
        </p>
      </HeroSection>
      <section className="py-14">
        <Container className="grid justify-items-center items-center md:grid-cols-2">
          <div className="flex flex-col justify-start gap-4 px-10">
            <h2 className="text-4xl font-semibold tracking-wide text-neutral-700">
              What is ADHD?
            </h2>
            <p className="text-neutral-500">
              ADHD, or Attention Deficit Hyperactivity Disorder, is a
              neurodevelopmental condition marked by challenges in attention,
              impulse control, and activity regulation. Explore here for
              diagnosing and support in managing ADHD symptoms effectively.
            </p>
          </div>
          <div className="w-fit">
            <img
              className="w-[20rem]"
              src={homeIllustration1}
              alt="ADHD Illustration"
            />
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Home;
