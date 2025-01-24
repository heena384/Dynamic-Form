
### React + TypeScript + Vite Dynamic Form Project

This project demonstrates a dynamic form handling setup using React, TypeScript, and Vite. The form is auto-generated based on a schema and includes robust validation, modal-based result display, and console logging for debugging.

#### Features
`Dynamic Form Generation`: The form fields are dynamically rendered from a schema. Any updates to the schema instantly reflect in the UI.

`Validation Rules`: Built-in validation ensures that required fields are filled before enabling the "Save" button.

`Success Modal`: Displays submitted form data in a modal upon successful submission.
Console Debugging: Logs the submitted data to the console for easier debugging.

`Customizable Schema`: Modify the schema to dynamically add, remove, or update form fields.
Technologies Used

`React`: For building the dynamic user interface.
`TypeScript`: Provides static typing for better code safety and developer productivity.
`Vite`: A blazing-fast development environment and build tool.
`ESLint`: Ensures code consistency and quality.

### Approach
1. Dynamic Form Rendering
The formSchema defines the structure, labels, and validation rules of the form.
The application automatically generates form fields based on this schema, making it highly flexible.

2. Form Validation
Each field includes validation rules defined in the schema.
The "Save" button remains disabled until all required fields are valid.

3. Form Submission
Upon submission, the form data is displayed in a modal and logged to the console.
This allows users to visualize and debug the data before integrating with a backend.

### Steps to Run the Project Locally

1. *Clone the Repository*
Clone the repository to your local machine using the following command:

`git clone https://github.com/heena384/Dynamic-Form.git`

2. *Navigate to the Project Directory*
Move into the project directory:

`cd dynamic-form-template`

3. *Install Dependencies*
Install the required dependencies using npm or yarn:

`npm install`
# or
`yarn install`

4. *Run the Development Server*
Start the development server with:

`npm run dev`
# or
`yarn dev`

The application will be accessible at http://localhost:3000.

5. *Open the Application in Your Browser*
Visit the URL http://localhost:3000 in your browser to see the dynamic form rendered.

6. *Modify the Schema*
To dynamically update the form:

Open the formSchema file.
Add, remove, or edit fields as needed.
Save the file and reload the page to see the changes instantly.

### Future Improvements
Advanced Validation: Add custom validation rules and detailed error messages.
Enhanced Field Types: Extend support  radio buttons, file uploads, and more.
Backend Integration: Connect the form to a backend API for data persistence.
Styling Enhancements: Improve the UI/UX with better styling and layout.
