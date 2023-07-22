import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;

describe("Create comment on a answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
  });
  it("sould be able to create a Answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const { answerComment } = await sut.execute({
      authorId: "1",
      answerId: answer.id.toString(),
      content: "esse e o comentário",
    });

    expect(answerComment.id).toBeTruthy();
    expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(answerComment.id);
  });
});
