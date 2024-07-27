import React from "react";
import Container from "../components/UI/Container";
import goal3Icon from "../assets/goal-3-icon.jpg";
import goal10Icon from "../assets/goal-10-icon.jpg";
import goal17Icon from "../assets/goal-17-icon.jpg";

const SDGs = () => {
  return (
    <section>
      {/* <Container className="grid w-full justify-items-center items-center gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4 px-10">
          <h2 className="text-4xl font-semibold tracking-wide text-neutral-700">
            Linking NeuroLink with Sustainable Development Goals
          </h2>
          <p className="text-neutral-500">
            Our project, NeuroLink, aligns with several United Nations
            Sustainable Development Goals (SDGs), contributing to global efforts
            for a better and more sustainable future.
          </p>
          <h3 className="text-3xl font-semibold text-neutral-700">
            SDG 3: Good Health and Well-being
          </h3>
          <p className="text-neutral-500">
            NeuroLink aims to improve ADHD diagnosis accuracy and reduce waiting
            times, promoting better health outcomes.
          </p>
          <h3 className="text-3xl font-semibold text-neutral-700">
            SDG 10: Reduced Inequality
          </h3>
          <p className="text-neutral-500">
            Making the ML model accessible reduces disparities in neurological
            diagnostic access, contributing to healthcare equality.
          </p>
          <h3 className="text-3xl font-semibold text-neutral-700">
            SDG 17: Partnerships for the Goals
          </h3>
          <p className="text-neutral-500">
            Collaboration with healthcare institutions and experts will enhance
            the model's validity and promote knowledge sharing.
          </p>
        </div>
        <div className="border w-full relative flex flex-col items-center md:max-w-[400px] gap-4 py-8 rounded-md bg-secondary/35">
          <img
            className="w-[120px] rounded-lg"
            src={SDG3}
            alt="SDG 3: Good Health and Well-being"
          />
          <div className="flex gap-8">
            <img
              className="w-[120px] rounded-lg"
              src={SDG10}
              alt="SDG 10: Reduced Inequality"
            />
            <img
              className="w-[120px] rounded-lg"
              src={SDG17}
              alt="SDG 17: Partnerships for the Goals"
            />
          </div>
        </div>
      </Container> */}
      <div className="w-full flex gap-2 flex-col  text-white">
        <div className="flex bg-goal3 px-8 pt-[13px] pb-[30px]">
          <Container className="relative">
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[15px] underline font-semibold">SDG</span>
                <span className="text-6xl font-semibold opacity-30">3</span>
              </div>
              <h1 className="text-[1.6125rem] font-bold max-w-[83%]">
                NeuroLink aims to improve ADHD diagnosis accuracy and reduce
                waiting times, promoting better health outcomes
              </h1>
            </div>
            <img
              src={goal3Icon}
              className="w-[80px] absolute top-[30px] right-[13px]"
              alt=""
            />
          </Container>
        </div>
        <div className="flex bg-goal10 px-8 pt-[13px] pb-[30px]">
          <Container className="relative">
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[15px] underline font-semibold">SDG</span>
                <span className="text-6xl font-semibold opacity-30">10</span>
              </div>
              <h1 className="text-[1.6125rem] font-bold max-w-[83%]">
                Making the ML model accessible reduces disparities in
                neurological diagnostic access, contributing to healthcare
                equality.
              </h1>
            </div>
            <img
              src={goal10Icon}
              className="w-[80px] absolute top-[30px] right-[13px]"
              alt=""
            />
          </Container>
        </div>
        <div className="flex bg-goal17 px-8 pt-[13px] pb-[30px]">
          <Container className="relative">
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[15px] underline font-semibold">SDG</span>
                <span className="text-6xl font-semibold opacity-30">10</span>
              </div>
              <h1 className="text-[1.6125rem] font-bold max-w-[83%]">
                Making the ML model accessible reduces disparities in
                neurological diagnostic access, contributing to healthcare
                equality.
              </h1>
            </div>
            <img
              src={goal17Icon}
              className="w-[80px] absolute top-[30px] right-[13px]"
              alt=""
            />
          </Container>
        </div>
      </div>
    </section>
  );
};

export default SDGs;
