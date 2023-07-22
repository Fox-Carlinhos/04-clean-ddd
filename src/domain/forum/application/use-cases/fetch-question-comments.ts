import { QuestionComment } from "../../enterprise/entities/question-comments";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchRecentQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchRecentQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchRecentQuestionCommentsUseCase {
  constructor(private QuestionCommentsRepository: QuestionCommentsRepository) {}

  async execute({ questionId, page }: FetchRecentQuestionCommentsUseCaseRequest): Promise<FetchRecentQuestionCommentsUseCaseResponse> {
    const questionComments = await this.QuestionCommentsRepository.findManyByQuestion(questionId, { page });

    if (!questionComments) {
      throw new Error("Question comments not found.");
    }

    return { questionComments };
  }
}
