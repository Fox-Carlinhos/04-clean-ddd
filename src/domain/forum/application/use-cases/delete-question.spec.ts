import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("sould be able to delete a Question", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "test-id",
      authorId: "author-1",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("sould not be able to delete a Question from another user", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: "test-id",
      authorId: "author-2",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
