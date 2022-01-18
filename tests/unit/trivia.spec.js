import {shallowMount} from '@vue/test-utils'
import Trivia from '@/components/Trivia.vue'

var axios = require("axios")
var MockAdapter = require('axios-mock-adapter')
var mock = new MockAdapter(axios);


describe('TriviaTest.vue', () => {
    const expectedResponse = {
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "How long is an IPv6 address?",
        "correct_answer": "128 bits",
        "incorrect_answers": ["32 bits", "64 bits", "128 bytes"]
    };

    it('can consume the trivia api', async () => {

        mock.onGet('https://opentdb.com/api.php?amount=1').reply(200, expectedResponse)
        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        const triviaQuestion = triviaWrapper.find("[aria-label='theQuestion']")
console.log(triviaQuestion);
        expect(triviaQuestion.text()).toContain(expectedResponse.question);
        //expect(axios.get).toHaveBeenCalledTimes(1);
        //expect(axios.get).toHaveBeenLastCalledWith('https://opentdb.com/api.php?amount=1')

    })
})
