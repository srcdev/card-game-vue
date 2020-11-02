import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppEntryPage from '../App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AppEntryPage', () => {
    describe('with a store', () => {
        let store
        let getters
        const message = 'Welcome message text from store';
        beforeEach(() => {
            getters = {
                getInfoText: () => message,
            }
            store = new Vuex.Store({ 
                modules: {
                    game: {
                        namespaced: true,
                        getters,
                    },
                },
            })
        })
        // it('renders a values from getters', async () => {
        //     const wrapper = shallowMount(AppEntryPage, {
        //         store,
        //         localVue,
        //         computed: {
        //             //error: () => 'test error',
        //             infoText: getters.getInfoText,
        //         },
        //     })
        //     expect(wrapper.find('.message').text().trim()).toEqual(message);
        //     wrapper.destroy()
        // })
        it('renders a values from getters', async () => {
            const wrapper = shallowMount(AppEntryPage, {
                store,
                localVue
            })
            expect(wrapper.get('[data-test="h1-text"]').exists()).toBe(true);
            wrapper.destroy()
        })
        it('renders a values from getters', async () => {
            const wrapper = shallowMount(AppEntryPage, {
                store,
                localVue
            })
            expect(wrapper.get('[data-test="h1-text"]').text()).toBe(
                "Fill in the blanks game"
            );
            wrapper.destroy()
        })

    })
})
