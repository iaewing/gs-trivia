import {shallowMount} from '@vue/test-utils'
import Trivia from '@/components/Trivia.vue'

var axios = require("axios")
var MockAdapter = require('axios-mock-adapter')
var mock = new MockAdapter(axios);

const BASE_URL = 'https://opentdb.com/api.php?amount=1';

describe('TriviaTest.vue', () => {
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

    it('can consume the trivia api', async () => {
        mock.onGet(BASE_URL).reply(200, sampleResponse)
        const expectedResponse = sampleResponse.results?.[0].question;

        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const triviaQuestion = triviaWrapper.find("[aria-label='the question']")

        expect(triviaQuestion.text()).toContain(expectedResponse)
    });

    it('displays the correct answer', async () => {

        mock.onGet(BASE_URL).reply(200, sampleResponse)
        const expectedResponse = sampleResponse.results[0].correct_answer;

        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const correctAnswer = triviaWrapper.find("[aria-label='correct answer']")

        expect(correctAnswer.text()).toContain(expectedResponse)
    })

    it('displays the incorrect answer', async () => {
        // arrange
        mock.onGet(BASE_URL).reply(200, sampleResponse);
        const expectedWrongAnswers = sampleResponse.results[0].incorrect_answers;

        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const wrongAnswers = triviaWrapper.findAll("[aria-label='incorrect answer']");
        // await nextTick();
        // expect(wrongAnswers.text()).toContain(expectedWrongAnswers);

        console.log(triviaWrapper);

        let arrayOfAnswers = [];
        for (let i = 0; i < wrongAnswers.length; ++i) {
            arrayOfAnswers.push(wrongAnswers[i].text());
        }
        console.log(arrayOfAnswers);

        expectedWrongAnswers.forEach( function (incorrectAnswer) {
            expect(arrayOfAnswers).toContain(incorrectAnswer)
        })
    })
})
