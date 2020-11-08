import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GameDeckStartCreate from '../components/GameDeckStartCreate.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('GameDeckStartCreate.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      START_GAME: jest.fn(),
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
    const wrapper = mount(GameDeckStartCreate, {
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

  it('correctly sets value of gameName', async () => {
    const wrapper = mount(GameDeckStartCreate, {
      store,
      localVue,
      data () {
        return {
          formValues: {}
        }
      }
    })
    // gameName too short
    wrapper.get('[name="gameName"]').setValue(`S`)
    await wrapper.trigger('keyup')
    expect(wrapper.find('[name="gameName"].error')).toBeTruthy()

    // gameName constains bad characters
    wrapper.get('[name="gameName"]').setValue(`~`)
    await wrapper.trigger('keyup')
    expect(wrapper.find('[name="gameName"].error')).toBeTruthy()

    // gameName is valid
    wrapper.get('[name="gameName"]').setValue(`Simon`)
    await wrapper.trigger('keyup')
    expect(wrapper.find('[name="gameName"].valid')).toBeTruthy()
    wrapper.destroy()
  })

  it('dispatches "formSubmit" when form is submitted', async () => {
    const spyOnFormSubmit = jest.spyOn(GameDeckStartCreate.methods, 'formSubmit')
    const wrapper = mount(GameDeckStartCreate, {
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
    wrapper.get('[name="gameName"]').setValue(`Simon's Game`)
    await wrapper.trigger('keyup')
    wrapper.get('[name="gameRating"][value="3"]').setChecked(true)
    await wrapper.trigger('keyup')
    wrapper.get('#formSubmit').trigger('click')
    await wrapper.trigger('keyup')
    expect(spyOnFormSubmit).toHaveBeenCalled();
    expect(actions.START_GAME).toHaveBeenCalled()
    wrapper.destroy()
  })

})
