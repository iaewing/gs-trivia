import {mount} from '@vue/test-utils'
import Trivia from '@/components/Trivia.vue'
import axios from 'axios'

jest.mock('axios');

describe('TriviaTest.vue', () => {
    it('can consume the trivia api', async () => {

        let trivia = mount(Trivia)

        const expectedResponse = "Trivia Question?";

        axios.get.mockResolvedValueOnce(expectedResponse);

        //assert the question is on the page
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenLastCalledWith('https://opentdb.com/api.php?amount=1')
        expect(trivia.contains(expectedResponse));

    })
})