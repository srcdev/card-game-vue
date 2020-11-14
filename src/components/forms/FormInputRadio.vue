<template>
  <div>
    <p v-if="inputHasErrors" class="form_label error">{{ this.inputPlaceholder }} is required</p>
    <p v-else class="form_label">{{ this.inputPlaceholder }}</p>
    <div
      v-for="(item,index) in inputOptions"
      v-bind:key="index"
      class="form-row-inner form-row-inner_radio"
    >
      <input
        class="form-input_radio"
        :class="[
          {'error': inputHasErrors},
          {'valid': !inputHasErrors && inputTouched}
        ]"
        type="radio"
        :name="inputName"
        :id="item.id"
        :value="value"
        :checked="isChecked(item.value, value)"
        :required="inputRequired"
        v-on:input="updateValue(item.value)"
      />
      <label v-if="inputHasErrors" class="form_label error" :for="item.id"><span class="form-input_radio-icon"></span>{{ item.text }}</label>
      <label v-else class="form_label" :for="item.id"><span class="form-input_radio-icon"></span>{{ item.text }}</label>
    </div>

  </div>
</template>

<script>
  export default {
    name: "FormInputText",
    data() {
      return {
        inputHasErrors: false,
        inputTouched: false,
      }
    },
		props: {
			inputName: {
				type: String,
				default: null
			},
			inputLabel: {
				type: String,
				default: null
			},
			inputPlaceholder: {
				type: String,
				default: null
      },
      inputInError: {
				type: Boolean,
				default: false
      },
      inputOptions: {
        type: Array,
      },
			inputRequired: {
				type: Boolean,
				default: false
			},
      value: {
          type: String,
          default: ''
      },
    },
    watch: {
      inputInError(newVal) {
        if (newVal) {
          this.inputHasErrors = true;
        }
      }
    },
    methods: {
      updateValue(value) {
        this.inputHasErrors = false;
        this.inputTouched = true;
        this.$emit('input', value)
      },
      isChecked(savedValue, value) {
        return savedValue == value;
      }
    }
  }
</script>
