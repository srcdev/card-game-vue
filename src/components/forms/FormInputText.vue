<template>
  <div class="form-row-inner form-row-inner_text">
    <div class="form-row-inner-col">
      <label v-if="requiredIsRequiredError" class="form_label error" :for="inputName">{{ this.inputLabel }} is required</label>
      <label v-else-if="inputHasErrors && !inputValueShort" class="form_label error" :for="inputName">{{ this.inputPatternErrorMessage }}</label>
      <label v-else-if="inputHasErrors && inputValueShort" class="form_label error" :for="inputName">{{ this.inputLabel }} too short</label>
      <label v-else class="form_label" :for="inputName">{{ this.inputLabel }}</label>
    </div>
    <div class="form-row-inner-col">
      <input
        class="form-input_text"
        :class="[
          {'active': this.inputIsActive},
          {'error': this.inputHasErrors || this.requiredIsRequiredError},
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
        inputValueShort: false,
        requiredIsRequiredError: false
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
      inputInError: {
				type: Boolean,
				default: false
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
    watch: {
      inputInError(newVal) {
        if (newVal) {
          this.requiredIsRequiredError = true;
        }
      }
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
      updateValue(value) {
        this.$emit('input', value);
        setTimeout(() => {
          this.testInputValidity(value);
        }, 0);
      },
      testInputValidity() {
        const regex = new RegExp(this.setValidationPattern());
        this.requiredIsRequiredError = this.value.length === 0;
        this.inputValueShort = (this.value.length > 0 && this.value.length < this.inputMinLength);
        this.inputHasErrors = !regex.test(this.value) && this.value.length > 0;
      }
    }
  }
</script>
