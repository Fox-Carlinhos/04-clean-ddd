import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchRecentAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

type FetchRecentAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchRecentAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ questionId, page }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return right({ answers });
  }
}
