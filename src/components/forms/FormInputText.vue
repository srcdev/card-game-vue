<template>
  <div class="form-row">
    <div class="form-row-inner form-row-inner_text">
      <div class="form-row-inner-col">
        <label v-if="requiredIsRequiredError" :data-test="`${inputName}ErrorRequiredLabel`" class="form_label error" :for="inputName">{{ this.inputLabel }} is required</label>
        <label v-else-if="inputHasErrors && !inputValueShort" :data-test="`${inputName}ErrorBadCharsLabel`"  class="form_label error" :for="inputName">{{ this.inputPatternErrorMessage }}</label>
        <label v-else-if="inputHasErrors && inputValueShort" :data-test="`${inputName}ErrorShortLabel`"  class="form_label error" :for="inputName">{{ this.inputLabel }} too short</label>
        <label v-else :data-test="`${inputName}Label`" class="form_label" :for="inputName">{{ this.inputLabel }}</label>
      </div>
      <div class="form-row-inner-col">
        <input
          class="form-input_text"
          :class="[
            {'active': this.inputIsActive},
            {'error': this.inputHasErrors || this.requiredIsRequiredError},
            {'dirty': this.inputIsDirty},
            {'valid': this.inputIsValid}
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
          :ref="inputName"
          :placeholder="this.inputPlaceholder"
          :minlength="this.inputMinLength"
          :maxlength="this.inputMaxLength"
          :pattern="setValidationPattern()"
          :title="this.inputLabel"
          :required="this.inputRequired"
          :aria-required="`${this.inputRequired}`"
          :aria-labelledby="`${this.inputName}label`"
          :value="value"
          v-on:input="updateValue($event.target.value)"
          :autocomplete="this.autocomplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
  //import { debounce } from '../../helpers/debounce';
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
        inputIsValid: false,
        requiredIsRequiredError: false
      }
    },
		props: {
			autocomplete: {
				type: String,
				default: "off"
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
      setInputIsDirty(value) {
        return value.length > 0;
      },
			setBlurFieldState(event) {
				this.inputIsActive = false;
				//this.inputIsDirty = false;
        this.inputIsDirty = this.setInputIsDirty(event.target.value)
      },
      updateValue(value) {
        this.$emit('input', value);
        setTimeout(() => {
          this.testInputValidity(value);
        }, 0);

        // debounce(() => {
        //   console.log(`debounce(`);
        //   this.testInputValidity();
        // }, 300);

      },
      testInputValidity() {
        const regex = new RegExp(this.setValidationPattern());
        this.inputIsDirty = this.setInputIsDirty(this.value);
        this.requiredIsRequiredError = this.value.length === 0;
        this.inputValueShort = (this.value.length > 0 && this.value.length < this.inputMinLength);
        this.inputHasErrors = !regex.test(this.value) && this.value.length > 0;
        this.inputIsValid = this.inputIsDirty && !this.inputHasErrors && !this.inputValueShort && !this.inputHasErrors;
      }
    }
  }
</script>
