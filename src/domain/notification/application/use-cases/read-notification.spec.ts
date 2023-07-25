import { makeNotification } from "test/factories/make-notification";
import { ReadNotificationUseCase } from "./read-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notification-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Create Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });
  it("sould be able to create a Notification", async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(expect.any(Date));
  });

  it("sould not be able to read another user notification", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("recipient-id"),
    });

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: "another-recipient-id",
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
