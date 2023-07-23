import { Either, left, right } from "@/core/either";
import { AnswerComment } from "../../enterprise/entities/answer-comments";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface FetchRecentAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

type FetchRecentAnswerCommentsUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answerComments: AnswerComment[] }>;

export class FetchRecentAnswerCommentsUseCase {
  constructor(private AnswerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ answerId, page }: FetchRecentAnswerCommentsUseCaseRequest): Promise<FetchRecentAnswerCommentsUseCaseResponse> {
    const answerComments = await this.AnswerCommentsRepository.findManyByAnswerId(answerId, { page });

    if (!answerComments) {
      return left(new ResourceNotFoundError());
    }

    return right({
      answerComments,
    });
  }
}
