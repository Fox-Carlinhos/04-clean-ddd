import { Either, left, right } from "./either";

function doSomenthing(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(1);
  } else {
    return left("error");
  }
}

test("success result", () => {
  const result = doSomenthing(true);

  if (result.isRight()) {
    console.log(result.value);
  }

  expect(result.isRight()).toBe(true);
  expect(result.isLeft()).toBe(false);
});

test("error result", () => {
  const result = left("error");

  expect(result.isRight()).toBe(false);
  expect(result.isLeft()).toBe(true);
});
