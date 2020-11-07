<template>
  <div class="form-row-inner form-row-inner_text">
    <div class="form-row-inner-col">
      <label class="form_label" for="gameName">{{ this.inputLabel }}</label>
    </div>
    <div class="form-row-inner-col">
      <input
        class="form-input_text"
        :class="[
          {'active': this.inputIsActive},
          {'error': this.inputHasErrors},
          {'dirty': this.inputIsDirty}
        ]"
        @focus="[
          setActiveFieldState(),
        ]"
        @focusout="[
          setBlurFieldState($event),
        ]"
        type="text"
        :id="inputName"
        :name="inputName"
        :placeholder="this.inputPlaceholder"
        :minlength="this.inputMinLength"
        :maxlength="this.inputMaxLength"
        :pattern="setValidationPattern()"
        :title="this.inputLabel"
        v-bind:required="this.inputRequired"
        :value="value"
        v-on:input="updateValue($event.target.value)"
        :autocomplete="this.autocomplete"
      />
    </div>
  </div>
</template>

<script>
  import validationPatterns from './validationPatterns';
  export default {
    name: "FormInputText",
    data() {
      return {
        validationPattern: null,
        inputHasErrors: false,
				inputIsDirty: false,
				inputIsActive: false,
      }
    },
		props: {
			autocomplete: {
				type: String,
				default: "off"
			},
			inputType: {
				type: String,
				default: "text"
			},
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
      inputPatternErrorMessage: {
        type: String,
        default: "Error"
      },
			inputMinLength: {
				type: Number,
				default: 0
			},
			inputMaxLength: {
				type: Number,
				default: 255
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
    methods: {
      setValidationPattern() {
        return validationPatterns[this.inputName];
      },
      setActiveFieldState() {
				this.inputIsActive = true;
			},
			setBlurFieldState(event) {
				this.inputIsActive = false;
				this.inputIsDirty = false;
        const currentLength = event.target.value.length;
        if (currentLength === 0) {
					this.inputIsDirty = false;
        } else {
					this.inputIsDirty = true;
        }
      },
      updateValue: function (value) {
        this.testInputValidity(value);
        this.$emit('input', value);
      },
      testInputValidity(value) {
        const regex = new RegExp(this.setValidationPattern());
        this.inputHasErrors = !regex.test(value) && value.length > 0;
      }
    }
  }
</script>
