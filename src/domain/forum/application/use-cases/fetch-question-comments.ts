import { Either, left, right } from "@/core/either";
import { QuestionComment } from "../../enterprise/entities/question-comments";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchRecentQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

type FetchRecentQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    questionComments: QuestionComment[];
  }
>;

export class FetchRecentQuestionCommentsUseCase {
  constructor(private QuestionCommentsRepository: QuestionCommentsRepository) {}

  async execute({ questionId, page }: FetchRecentQuestionCommentsUseCaseRequest): Promise<FetchRecentQuestionCommentsUseCaseResponse> {
    const questionComments = await this.QuestionCommentsRepository.findManyByQuestionId(questionId, { page });

    if (!questionComments) {
      return left(new ResourceNotFoundError());
    }

    return right({ questionComments });
  }
}
