import { AnswerComment } from "../../enterprise/entities/answer-comments";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchRecentAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

interface FetchRecentAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchRecentAnswerCommentsUseCase {
  constructor(private AnswerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ answerId, page }: FetchRecentAnswerCommentsUseCaseRequest): Promise<FetchRecentAnswerCommentsUseCaseResponse> {
    const answerComments = await this.AnswerCommentsRepository.findManyByAnswerId(answerId, { page });

    if (!answerComments) {
      throw new Error("Answer comments not found.");
    }

    return { answerComments };
  }
}
