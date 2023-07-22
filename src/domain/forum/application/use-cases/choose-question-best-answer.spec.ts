import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question best answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
  });

  it("sould be able to choose a question best answer", async () => {
    const newQuestion = makeQuestion();

    const newAnswer = makeAnswer({ questionId: newQuestion.id });

    await inMemoryQuestionsRepository.create(newQuestion);

    await inMemoryAnswersRepository.create(newAnswer);

    const { question } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(question.bestAnswerId).toEqual(newAnswer.id);
  });

  it("sould not be able to choose another person question best answer", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("other-id") });

    const newAnswer = makeAnswer({ questionId: newQuestion.id });

    await inMemoryQuestionsRepository.create(newQuestion);

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: "author",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
