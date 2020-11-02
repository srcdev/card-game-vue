import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import AppEntryPage from '../App'
Vue.use(Vuex);
describe("AppEntryPage > /App.vue", () => {

    const wrapper = shallowMount(AppEntryPage);

    test("AppEntryPage is a Vue instance", () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test("AppEntryPage has an H1 tag", () => {
        expect(wrapper.get('[data-test="h1-text"]').exists()).toBe(true);
    });

    test("AppEntryPage has an H1 content", () => {
        expect(wrapper.get('[data-test="h1-text"]').text()).toBe(
            "Fill in the blanks game"
        );
    });

});
