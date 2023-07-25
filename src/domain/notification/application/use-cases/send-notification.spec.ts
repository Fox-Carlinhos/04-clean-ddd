import { SendNotificationUseCase } from "./send-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notification-repository";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

let sut: SendNotificationUseCase;

describe("Create Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });
  it("sould be able to create a Notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "titulo notificacao",
      content: "essa é a notificação",
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0]).toEqual(result.value?.notification);
  });
});
