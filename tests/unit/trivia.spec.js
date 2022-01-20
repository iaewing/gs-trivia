import {shallowMount} from '@vue/test-utils'
import Trivia from '@/components/Trivia.vue'

var axios = require("axios")
var MockAdapter = require('axios-mock-adapter')
var mock = new MockAdapter(axios);


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
    const expectedResponse = sampleResponse.results?.[0].question;

    it('can consume the trivia api', async () => {

        mock.onGet('https://opentdb.com/api.php?amount=1').reply(200, sampleResponse)
        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const triviaQuestion = triviaWrapper.find("[aria-label='theQuestion']")

        expect(triviaQuestion.text()).toContain(expectedResponse)
    })
})
