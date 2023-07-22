import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { FetchRecentQuestionCommentsUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchRecentQuestionCommentsUseCase;

describe("Fetch Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new FetchRecentQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("sould be able to fetch question comments", async () => {
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID("question-comment-id") }));
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID("question-comment-id") }));
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID("question-comment-id") }));

    const { questionComments } = await sut.execute({
      questionId: "question-comment-id",
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
  });

  it("sould be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID("question-comment-id") }));
    }

    const { questionComments } = await sut.execute({
      questionId: "question-comment-id",
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
  });
});
