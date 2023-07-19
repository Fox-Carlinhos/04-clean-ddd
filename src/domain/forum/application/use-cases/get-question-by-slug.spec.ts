import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it("sould be able to find a Question by slug", async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: "Example Question",
      slug: Slug.create("example-question"),
      content: "Example content",
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
  });
});
