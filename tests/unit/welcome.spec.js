import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/Welcome.vue'

describe('Welcome.vue', () => {

    it('displays welcome message', () => {
        const expectedMsg = "Welcome to Trivia!"
        const wrapper = shallowMount(Welcome)
        expect(wrapper.text()).toMatch(expectedMsg)
    })
})
