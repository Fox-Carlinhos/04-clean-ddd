import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments.repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comments";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

  async create(question: QuestionComment) {
    this.items.push(question);
  }
}
