import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("sould be able to edit a Question", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "test-id",
      authorId: "author-1",
      title: "test edit title",
      content: "question new content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "test edit title",
      content: "question new content",
    });
  });

  it("sould not be able to edit a Question from another user", async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID("author-1") }, new UniqueEntityID("test-id"));

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        questionId: "test-id",
        authorId: "author-2",
        title: "test edit title",
        content: "question new content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
