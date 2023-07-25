import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository);
  });

  it("sould be able to edit a Question", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("2"),
      })
    );

    await sut.execute({
      questionId: newQuestion.id.toString(),
      attachmentsIds: ["1", "3"],
      authorId: "author-1",
      title: "test edit title",
      content: "question new content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "test edit title",
      content: "question new content",
    });
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("3") }),
    ]);
  });

  it("sould not be able to edit a Question from another user", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: "test-id",
      attachmentsIds: [],
      authorId: "author-2",
      title: "test edit title",
      content: "question new content",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
