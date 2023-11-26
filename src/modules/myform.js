import Alpine from 'alpinejs';
import { object, string } from 'yup';
import { mapErrorMessagesWithFields } from '../helpers';

document.addEventListener("alpine:init", () => {
  Alpine.data("myform", () => ({
    selectedProduct: null,
    selectedPost: null,
    name: "",
    errors: {},

    async onSubmit() {
      this.errors = {};
      const schema = object().shape({
        selectedProduct: object().required('Product is required'),
        selectedPost: object().nullable(),
        name: string().trim().required('Name is required'),
      });
      try {
        const validationResult = await schema.validate({
          selectedProduct: this.selectedProduct,
          selectedPost: this.selectedPost,
          name: this.name,
        }, { abortEarly: false });
        // do something with data here
        console.log(validationResult);
      } catch (error) {
        console.log(error.inner);
        this.errors = mapErrorMessagesWithFields(error.inner);
      }
    },
  }))
});