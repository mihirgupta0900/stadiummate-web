import React, { useState } from "react";
import Layout from "~/components/Layout";
import { useToast } from "@chakra-ui/react";
import Trivia from "~/components/engagements/trivia";

const trivia = [
  {
    id: 1,
    question: "Who is the first Indian to score a century in the World Cup?",
    options: [
      "Sachin Tendulkar",
      "Rahul Dravid",
      "Sourav Ganguly",
      "Virender Sehwag",
    ],
    answer: "Sachin Tendulkar",
  },
  {
    id: 2,
    question: "When was the Ashes first played? ",
    options: ["1882", "1884", "1886", "1888"],
    answer: "1882",
  },
  {
    id: 3,
    question: "Which Australian player has scored the most test runs? ",
    options: ["Steve Waugh", "Ricky Ponting", "Don Bradman", "Mark Taylor"],
    answer: "Don Bradman",
  },
  {
    id: 4,
    question:
      "Who is the only batsman to record 400 runs in an international Test match? ",
    options: ["Sachin Tendulkar", "Brian Lara", "Viv Richards", "Rahul Dravid"],
    answer: "Viv Richards",
  },
] as const;

const Engagement = () => {
  const [markedAnswer, setMarkedAnswer] = useState("");
  const [buttonCLicked, setButtonCLicked] = useState(false);
  const toast = useToast();
  return (
    <Layout>
      <div className="">
        <h1 className="px-[5%] pt-[5%] text-2xl font-medium ">
          Third Umpire Mode
        </h1>
        <p className="px-[5%] pb-[5%] ">
          Wear your cricket hat and act as a third Umpire!
        </p>
        <section className="flex w-full flex-col items-center justify-center gap-6  ">
          <div className="h-full  rounded-lg bg-gray-100 shadow-md">
            <img
              src="/icons/rohit.svg"
              className="mx-4 my-4"
              alt="engagement"
            />
            <p className=" mx-4 font-semibold text-gray-500">Over 13.6</p>
            <h1 className="mx-4 my-2 text-xl font-medium ">
              Rohit Sharma took DRS
            </h1>
            <p className="mx-4 w-[20rem]">
              Rohit appealed for DRS after umpire gave not out to Steve Smith
            </p>
            <h1 className="my-4 text-center text-xl text-red-400  ">
              Decision Pending
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => {
                setButtonCLicked(true);
              }}
              className="h-10 w-40 rounded-md bg-red-400 text-white hover:bg-red-500"
            >
              Out
            </button>
            <button
              onClick={() => {
                setButtonCLicked(true);
                toast({
                  position: "top",
                  render: () => (
                    <div className="rounded-xl bg-gray-100 px-4 py-4">
                      <div>
                        <span>Yes</span>
                        <div className="h-[4px] w-20 bg-green-400"></div> 25%
                      </div>
                      <div>
                        <span>No</span>
                        <div className="h-[4px] w-60 bg-red-400"></div> 75%
                      </div>
                    </div>
                  ),
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
              className="h-10 w-40 rounded-md  bg-green-400 text-white hover:bg-green-500"
            >
              Not Out
            </button>
          </div>
        </section>
      </div>
      <Trivia />
    </Layout>
  );
};

export default Engagement;
