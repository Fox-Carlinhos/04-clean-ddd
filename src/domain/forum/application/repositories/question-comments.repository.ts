import { QuestionComment } from "../../enterprise/entities/question-comments";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
