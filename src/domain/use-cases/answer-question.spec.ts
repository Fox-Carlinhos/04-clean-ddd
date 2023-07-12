import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: "1",
    questionId: "2",
    content: "essa é a resposta",
  });

  expect(answer.content).toEqual("essa é a resposta");
});
