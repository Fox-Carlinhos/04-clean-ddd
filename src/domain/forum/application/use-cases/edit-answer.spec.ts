import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("sould be able to edit a Answer", async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: "test-id",
      authorId: "author-1",
      content: "answer new content",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "answer new content",
    });
  });

  it("sould not be able to edit a Answer from another user", async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: "test-id",
      authorId: "author-2",
      content: "answer new content",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
