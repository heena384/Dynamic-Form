# React + TypeScript + Vite Dynamic Form Project

This project is a minimal React setup using Vite and TypeScript. It includes dynamic form handling, validation, and the ability to populate form fields automatically based on a schema. Additionally, it integrates a modal to display the submitted form data and console logging of the submitted values.

## Project Features

- **Dynamic Form Fields**: The form fields are generated dynamically from a `formSchema` file. If a new field is added to the schema, the form automatically updates in the UI.
- **Field Validation**: Required field validation is implemented. The "Save" button is only enabled if all required fields are valid.
- **Modal on Success**: Upon successful form submission, a modal will appear displaying the submitted values.
- **Console Output**: The form data is also logged to the console after submission.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for better tooling and validation.
- **Vite**: A fast and modern build tool for front-end projects.
- **ESLint**: Linting setup for consistent code quality.

## Approach

1. **Dynamic Form Rendering**: 
   - A `formSchema` file defines the structure of the form, including field names, types, and validation rules.
   - The form is automatically populated based on this schema. When fields are added or removed from the schema, the form UI updates accordingly.

2. **Form Validation**:
   - Each form field is validated based on the rules defined in the schema.
   - The "Save" button is only enabled when all required fields pass validation.

3. **Form Submission**:
   - When the form is submitted successfully, a modal opens with the submitted values.
   - The values are also logged to the console for debugging purposes.

## Steps to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/react-vite-typescript-form.git


1. Clone the Repository
cd react-vite-typescript-form


3. Install Dependencies
Install the required dependencies using npm or yarn.

npm install
# or
yarn install


4. Run the Project Locally
To start the development server and run the project locally, use:
npm run dev
# or
yarn dev

The application will be accessible at http://localhost:3000.



5. Open the Project in Your Browser
Once the server is running, open your browser and visit the URL http://localhost:3000. You should see the dynamic form rendered based on the schema.


6. Modify the formSchema
You can modify the formSchema file to add or remove fields dynamically. The form will automatically reflect the changes when reloaded.


###Future Improvements
Implement more advanced form validation, including custom rules and error messages.
Add support for form field types beyond text inputs, such as checkboxes, radio buttons, and selects.
Integrate a backend API for saving the form data.