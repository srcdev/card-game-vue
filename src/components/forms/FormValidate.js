/*
* HTML5 native validation mixin
**/
export default {
  methods: {
    $_formHasErrors: function(formId) {
      const invalidFormFields = document.querySelectorAll(
          `#${formId} :not(fieldset) :invalid`
      );
      this.formErrors = {};
      invalidFormFields.forEach(element => {
        this.formErrors[element.name] = true;
      });
      return invalidFormFields.length > 0;
    }
  }
};
