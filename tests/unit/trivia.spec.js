import { shallowMount } from "@vue/test-utils";
import Trivia from "@/components/Trivia.vue";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

const BASE_URL = "https://opentdb.com/api.php?amount=1";
const sampleResponse = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Television",
      type: "multiple",
      difficulty: "medium",
      question:
        "The fictional movie &#039;Rochelle, Rochelle&#039; features in which sitcom?",
      correct_answer: "Seinfeld",
      incorrect_answers: ["Frasier", "Cheers", "Friends"],
    },
  ],
};
// const sampleResponseTwo = {
//     "response_code": 0,
//     "results": [{
//         "category": "Entertainment: Music",
//         "type": "boolean",
//         "difficulty": "medium",
//         "question": "For his performance at ComplexCon 2016 in Long Beach, California, Skrillex revived his &quot;Mothership&quot; set piece for one night only.",
//         "correct_answer": "True",
//         "incorrect_answers": ["False"]
//     }]
// };
// mock.onGet(BASE_URL).replyOnce(200, sampleResponse).onGet(BASE_URL).replyOnce(200, sampleResponseTwo);

describe("TriviaTest.vue", () => {
  beforeEach(() => {
    window.alert = jest.fn();
    mock.onGet(BASE_URL).reply(200, sampleResponse);
  });

  afterEach(() => {
    mock.reset();
  });

  it("can consume the trivia api", async () => {
    const expectedResponse = sampleResponse.results?.[0].question;

    const triviaWrapper = shallowMount(Trivia);
    await triviaWrapper.find("button").trigger("click");
    const triviaQuestion = triviaWrapper.find("[aria-label='the question']");

    expect(triviaQuestion.text()).toContain(expectedResponse);
  });

  it("displays the possible answers", async () => {
    const expectedResponse = sampleResponse.results[0].correct_answer;
    const expectedAnswers = sampleResponse.results[0].incorrect_answers;
    expectedAnswers.push(expectedResponse);

    const triviaWrapper = shallowMount(Trivia);
    await triviaWrapper.find("button").trigger("click");
    const possibleAnswers = triviaWrapper.findAll(
      "[aria-label='Possible Answers']"
    );
    let arrayOfAnswers = [];
    for (let i = 0; i < possibleAnswers.length; ++i) {
      arrayOfAnswers.push(possibleAnswers[i].text());
    }

    expectedAnswers.forEach(function (expected) {
      expect(arrayOfAnswers).toContain(expected);
    });
  });

  it("renders a submit button with appropriate text", async () => {
    const triviaWrapper = shallowMount(Trivia);

    await triviaWrapper
      .find("[aria-label='Click Me for a new question!']")
      .trigger("click");

    const submitButton = triviaWrapper.find("[aria-label='Submit']");
    expect(submitButton.isVisible()).toBe(true);
    expect(submitButton.text()).toBe("Submit");
  });

  it("can submit answer to question", async () => {
    const triviaWrapper = shallowMount(Trivia);

    await triviaWrapper.find("button").trigger("click");
    const answer = triviaWrapper.find("[aria-label='Possible Answers']");
    await answer.trigger("click");

    const submit = triviaWrapper.find("[aria-label='Submit']");
    await submit.trigger("click");

    expect(
      triviaWrapper.find("[aria-label='Answer Results']").isVisible()
    ).toBe(true);
  });

  it("can tell the user if they chose the correct answer", async () => {
    const triviaWrapper = shallowMount(Trivia);
    const correctAnswer = sampleResponse.results[0].correct_answer;

    await triviaWrapper
      .find("[aria-label='Click Me for a new question!']")
      .trigger("click");
    await triviaWrapper.find("input", { text: correctAnswer }).trigger("click");
    triviaWrapper.find("[aria-label='Submit']").trigger("click");

    const answerResult = await triviaWrapper.find(
      '[aria-label="Answer Results"]'
    );
    expect(answerResult.text()).toContain("Correct!");
  });

  it("can tell the user if they chose the wrong answer", async () => {
    const triviaWrapper = shallowMount(Trivia);
    const incorrectAnswer = sampleResponse.results[0].incorrect_answers[0];

    await triviaWrapper
      .find("[aria-label='Click Me for a new question!']")
      .trigger("click");
    await triviaWrapper
      .find("input", { text: incorrectAnswer })
      .trigger("click");
    triviaWrapper.find("[aria-label='Submit']").trigger("click");

    const result = await triviaWrapper.find('[aria-label="Answer Results"]');
    expect(result.text()).toContain("NO!");
  });

  it("loads a new question after answering the question", async () => {
    window.alert = jest.fn();

    const triviaWrapper = shallowMount(Trivia);
    const incorrectAnswer = sampleResponse.results[0].incorrect_answers[0];

    await triviaWrapper
      .find("[aria-label='Click Me for a new question!']")
      .trigger("click");
    await triviaWrapper
      .find("input", { text: incorrectAnswer })
      .trigger("click");
    await triviaWrapper.find("[aria-label='Submit']").trigger("click");

    // find the question text for the second question
    const question = await triviaWrapper.find('[aria-label="the question"]');
    expect(question.text()).toContain(sampleResponse.results[0].question);
  });
});
