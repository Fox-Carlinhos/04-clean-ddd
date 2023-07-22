import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create comment on a question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository);
  });
  it("sould be able to create comment on a question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    const { questionComment } = await sut.execute({
      authorId: "1",
      questionId: question.id.toString(),
      content: "esse e o comentário",
    });

    expect(questionComment.id).toBeTruthy();
    expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(questionComment.id);
  });
});
