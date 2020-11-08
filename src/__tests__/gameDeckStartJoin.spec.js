import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GameDeckStartJoin from '../components/GameDeckStartJoin.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('GameDeckStartJoin.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      JOIN_GAME: jest.fn(),
    }
    store = new Vuex.Store({
      modules: {
          game: {
              namespaced: true,
              actions,
          },
      },
    })
  })

  it('correctly sets value of playerName', async () => {
    const wrapper = mount(GameDeckStartJoin, {
      store,
      localVue,
      data () {
        return {
          formValues: {}
        }
      }
    })
    // playerName too short
    wrapper.get('[name="playerName"]').setValue(`S`)
    await wrapper.trigger('keyup')
    expect(wrapper.find('[name="playerName"].error')).toBeTruthy()

    // playerName constains bad characters
    wrapper.get('[name="playerName"]').setValue(`~`)
    await wrapper.trigger('keyup')
    expect(wrapper.find('[name="playerName"].error')).toBeTruthy()

    // playerName is valid
    wrapper.get('[name="playerName"]').setValue(`Simon`)
    await wrapper.trigger('keyup')
    expect(wrapper.find('[name="playerName"].valid')).toBeTruthy()
    wrapper.destroy()
  })

  it('dispatches "formSubmit" when form is submitted', async () => {
    const spyOnFormSubmit = jest.spyOn(GameDeckStartJoin.methods, 'formSubmit')
    const wrapper = mount(GameDeckStartJoin, {
      store,
      localVue,
      data () {
        return {
          formValues: {}
        }
      }
    })
    wrapper.get('[name="playerName"]').setValue(`Simon`)
    await wrapper.trigger('keyup')
    wrapper.get('#formSubmit').trigger('click')
    await wrapper.trigger('keyup')
    expect(spyOnFormSubmit).toHaveBeenCalled();
    expect(actions.JOIN_GAME).toHaveBeenCalled()
    wrapper.destroy()
  })

})
