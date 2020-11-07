/*
* HTML5 native validation mixin
**/
export default {
  methods: {
    $_isFormValid: function(formId) {
      const invalidFormFields = document.querySelectorAll(
          `#${formId} :not(fieldset) :invalid`
      );
      this.formErrors = {};
      invalidFormFields.forEach(element => {
        console.log(element.id);
        this.formErrors[element.id] = true;
      });

      return invalidFormFields.length > 0;
    }
  }
};
