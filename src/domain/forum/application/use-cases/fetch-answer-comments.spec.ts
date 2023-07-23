import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { FetchRecentAnswerCommentsUseCase } from "./fetch-answer-comments";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchRecentAnswerCommentsUseCase;

describe("Fetch Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchRecentAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("sould be able to fetch answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID("answer-comment-id") }));
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID("answer-comment-id") }));
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID("answer-comment-id") }));

    const result = await sut.execute({
      answerId: "answer-comment-id",
      page: 1,
    });

    if (result.isRight()) {
      expect(result.value?.answerComments).toHaveLength(3);
    }
  });

  it("sould be able to fetch paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID("answer-comment-id") }));
    }

    const result = await sut.execute({
      answerId: "answer-comment-id",
      page: 2,
    });

    if (result.isRight()) {
      expect(result.value?.answerComments).toHaveLength(2);
    }
  });
});
