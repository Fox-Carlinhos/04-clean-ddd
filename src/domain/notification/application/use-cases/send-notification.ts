import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notification-repository";

interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
  readAt?: Date;
}

type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>;

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, content, title, readAt }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      title,
      content,
      recipientId: new UniqueEntityID(recipientId),
      readAt,
    });

    await this.notificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}
