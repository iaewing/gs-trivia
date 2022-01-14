import { shallowMount} from '@vue/test-utils'
import Trivia from '@/components/Trivia.vue'
import axios from 'axios'

jest.mock('axios');


describe('TriviaTest.vue', () => {
    const expectedResponse = "Trivia Question?";

    jest.mock('axios', () => ({
        get: () => Promise.resolve("Trivia Question?"),
    }))

    it('can consume the trivia api', async () => {
        const triviaWrapper = shallowMount(Trivia);
        await triviaWrapper.find('button').trigger('click');
        expect(triviaWrapper.text()).toContain(expectedResponse);


        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenLastCalledWith('https://opentdb.com/api.php?amount=1')

    })
})
