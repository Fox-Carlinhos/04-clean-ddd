import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchRecentAnswersUseCase } from "./fetch-recent-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchRecentAnswersUseCase;

describe("Fetch Recent Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchRecentAnswersUseCase(inMemoryAnswersRepository);
  });
  it("sould be able to fetch recent answers", async () => {
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID("question-id") }));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID("question-id") }));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID("question-id") }));

    const { answers } = await sut.execute({
      questionId: "question-id",
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it("sould be able to fetch paginated recent answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-id"),
        })
      );
    }

    const { answers } = await sut.execute({
      questionId: "question-id",
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
