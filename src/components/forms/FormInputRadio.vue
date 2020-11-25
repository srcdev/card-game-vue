<template>
  <div class="form-row">
    <p
      v-if="inputHasErrors"
      class="form_label error"
      :id="`rg_${inputName}_label`"
      >{{ this.inputPlaceholder }} is required</p>
    <p
      v-else
      class="form_label"
      :id="`rg_${inputName}_label`"
      >{{ this.inputPlaceholder }}</p>
    <ul
      class="form-row-inner form-row-inner_radio"
      role="radiogroup"
      :aria-labelledby="`rg_${inputName}_label`"
    >
      <li
        v-for="(item,index) in inputOptions"
        v-bind:key="index"
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
          :checked="isChecked(item, value)"
          :aria-checked="isChecked(item, value)"
          :aria-labelledby="`${item.id}label`"
          :required="inputRequired"
          v-on:input="updateValue(item.value)"
        />
        <label v-if="inputHasErrors" class="form_label error" :for="item.id">
          <span
            class="form-input_radio-icon"
            role="presentation"
          ></span>
          {{ item.text }}
        </label>
        <label v-else class="form_label" :for="item.id">
          <span
            class="form-input_radio-icon"
            role="presentation"
          ></span>
          {{ item.text }}
        </label>
      </li>
    </ul>

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
      isChecked(item, value) {
        const checkedStated = !this.inputTouched && item.checked || item.value == value;
        if (checkedStated) {
          this.updateValue(item.value);
        }
        return checkedStated;
      }
    }
  }
</script>
