import React, { useState } from "react";
import clsx from "clsx";
import { Button, useToast } from "@chakra-ui/react";
import { api, type RouterOutputs } from "~/utils/api";
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

const Trivia = () => {
  const toast = useToast();
  const [markedAnswer, setMarkedAnswer] = useState("");
  const [counter, setCounter] = useState(1);
  const [visbile, setVisible] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState("");

  const watchPartyUtils = api.useContext().watchParty;

  const joinMutation = api.watchParty.join.useMutation({
    onSuccess: async ({ txHash }) => {
      await watchPartyUtils.getAll.invalidate();
      toast({
        title: "Congratulations!",
        description: txHash && `You earned 10 tokens! TxHash: ${txHash}`,
        status: "success",
        // duration: 5000,
        isClosable: true,
      });
      {
        counter > 4 ? setCounter(1) : setCounter(counter + 1);
      }
    },
  });
  return (
    <div>
      <h1 className="px-[5%] pt-[5%] text-2xl font-medium ">
        Trivia-Win pirzes by answering the questions correctly
      </h1>
      <p className="px-[5%] pb-[5%] ">
        Answer the questions correctly and win pirzes
      </p>
      {trivia.map((item) => {
        return (
          <div className="flex flex-col px-[5%] " key={item.id}>
            {counter === item.id && (
              <div className="flex flex-col">
                <h1 className="font-medium">{item.question}</h1>
                <div className="grid grid-cols-2">
                  {item.options.map((option) => {
                    return (
                      <div className=" cursor-pointer " key={option}>
                        <input
                          type="radio"
                          name="option"
                          id="option"
                          className="mr-2"
                          value={option}
                          onChange={(e) => setMarkedAnswer(e.target.value)}
                        />
                        <label htmlFor="option">{option}</label>
                      </div>
                    );
                  })}
                  <div className="w-40">
                    <Button
                      onClick={() => {
                        setFinalAnswer(markedAnswer);
                        setTimeout(() => {
                          setCounter(counter + 1);
                          setFinalAnswer("");
                        }, 7000);
                        joinMutation.mutate({ id: item.id.toString() });
                      }}
                      isLoading={joinMutation.isLoading}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </div>
                {finalAnswer.length > 1 ? (
                  <p
                    className={clsx(
                      finalAnswer === item.answer
                        ? "text-green-500 "
                        : "text-red-500"
                    )}
                  >
                    correct answer is {item.answer}
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Trivia;
