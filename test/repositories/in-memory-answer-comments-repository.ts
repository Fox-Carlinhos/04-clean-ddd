import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comments";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async findById(id: string) {
    const answercomment = this.items.find((item) => item.id.toString() === id);

    if (!answercomment) {
      return null;
    }

    return answercomment;
  }

  async create(answer: AnswerComment) {
    this.items.push(answer);
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id);

    this.items.splice(itemIndex, 1);
  }
}
