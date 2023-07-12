import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../repositories/answer-repository";
import { Answer } from "../entities/answer";

const fakeAnswerRepository: AnswerRepository = {
  create: async function (answer: Answer): Promise<void> {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    instructorId: "1",
    questionId: "2",
    content: "essa é a resposta",
  });

  expect(answer.content).toEqual("essa é a resposta");
});
