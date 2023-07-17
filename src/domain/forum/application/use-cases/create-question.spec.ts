import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionRepository: QuestionRepository = {
  create: async function (question: Question): Promise<void> {},
};

test("create a Question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "questão titulo",
    content: "essa é a pergunta",
  });

  expect(question.id).toBeTruthy();
});
