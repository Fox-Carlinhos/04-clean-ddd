import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";

interface FetchRecentAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchRecentAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchRecentAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ questionId, page }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return { answers };
  }
}
