import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswersRepository } from "@/domain/forum/application/repositories/answer-repository";
import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen-event";

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotificationUseCase: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), QuestionBestAnswerChosenEvent.name);
  }

  private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(bestAnswerId.toString());

    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: `Your response was chosen`,
        content: `Your response was chosen on "${question.title.substring(0, 20).concat("...")}. Foi escolhida pelo autor!"`,
      });
    }
  }
}
