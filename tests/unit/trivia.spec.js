import {shallowMount} from '@vue/test-utils'
import Trivia from '@/components/Trivia.vue'

const axios = require("axios")
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios);

const BASE_URL = 'https://opentdb.com/api.php?amount=1';
const sampleResponse = {
    "response_code": 0,
    "results": [
        {
            "category": "Entertainment: Television",
            "type": "multiple",
            "difficulty": "medium",
            "question": "The fictional movie &#039;Rochelle, Rochelle&#039; features in which sitcom?",
            "correct_answer": "Seinfeld",
            "incorrect_answers": [
                "Frasier",
                "Cheers",
                "Friends"
            ]
        }
    ]
};
mock.onGet(BASE_URL).reply(200, sampleResponse)

describe('TriviaTest.vue', () => {
    let windowSpy;

    beforeEach(() => {
        windowSpy = jest.spyOn(window, "alert");
    });

    afterEach(() => {
        windowSpy.mockRestore();
    });

    it('can consume the trivia api', async () => {
        const expectedResponse = sampleResponse.results?.[0].question;

        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const triviaQuestion = triviaWrapper.find("[aria-label='the question']")

        expect(triviaQuestion.text()).toContain(expectedResponse)
    });

    it('displays the possible answers', async () => {
        const expectedResponse = sampleResponse.results[0].correct_answer;
        const expectedAnswers = sampleResponse.results[0].incorrect_answers;
        expectedAnswers.push(expectedResponse);

        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const possibleAnswers = triviaWrapper.findAll("[aria-label='Possible Answers']")
        let arrayOfAnswers = [];
        for (let i = 0; i < possibleAnswers.length; ++i) {
            arrayOfAnswers.push(possibleAnswers[i].text());
        }

        expectedAnswers.forEach(function (expected) {
            expect(arrayOfAnswers).toContain(expected)
        })
    })

    it('renders a submit button with appropriate text', async () => {
        const triviaWrapper = shallowMount(Trivia);

        await triviaWrapper.find("[aria-label='Click Me for a new question!']").trigger('click');

        const submitButton = triviaWrapper.find("[aria-label='Submit']");
        expect(submitButton.isVisible()).toBe(true);
        expect(submitButton.text()).toBe("Submit");
    })

    it('can submit answer to question', async () => {
        const triviaWrapper = shallowMount(Trivia);

        await triviaWrapper.find('button').trigger('click');
        const answer = triviaWrapper.find("[aria-label='Possible Answers']");
        await answer.trigger('click');

        const submit = triviaWrapper.find("[aria-label='Submit']");
        await submit.trigger('click');

        expect(triviaWrapper.find("[aria-label='Answer Results']").isVisible()).toBe(true);
    })

    it('can show tell the user if they are correct', async () => {
        let window = {
            alert: jest.fn()
        }
        const triviaWrapper = shallowMount(Trivia);
        const correctAnswer = sampleResponse.results[0].correct_answer;

        await triviaWrapper.find('[aria-label=\'Click Me for a new question!\']').trigger('click');
        await triviaWrapper.find('input', {text: correctAnswer}).trigger('click');
        triviaWrapper.find("[aria-label='Submit']").trigger('click');

        expect(window.alert).toHaveBeenCalled();
    })
})
