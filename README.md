# Greystone-Labs-FE-Challenge

Welcome to my Loan Amortization app!

## Technology used

This app was created with:

- `React 18` and `Create React App`  as the base.
- `Material UI` for styling.
- `useForm` hook for reducing the amount of re-renders during form input.
- `jest` as testing framework.
- `enzyme` as supplementary testing framework, although it is not very useful in this case with Material UI, but I opted to leave it in as a proof of concept.
- `react-app-rewired-aliases` to allow aliasing in a `CRA` without needing to `eject`


## Running the app

Running the app in a development environment should be only 3 steps:

1. clone this repository
2. run:

```
npm i
```

3. run:

```
npm start
```

## Additional details

This project performs all the actions as detailed in the requirements. It can:

- Create a user
- Create a loan
- Fetch all User's Loans
- Fetch the amortization term for a Loan
- Share a Loan with another User

Additionally, the project also has:

- Proper and simple front-end validation. All fields are required and will not allow you to 
submit until they are filled out.
- Additional simple validation laid out by the API such as loan amounts needing to be more than 0.
- All loans that are displayed are only loans that are owned or shared by the user.
- All shared loans are not eligible to be shared, and does not appear in a drop down for that purpose.
- Simple error handling via `Snackbar` popup indicating that the request had some error.
- Consistent styling with Material UI's `theme` engine.
- Testing framework set up with `Enzyme` by overriding proper fields in `package.json`, installing the correct depedencies, and creating additional files for the sake of compatibility with `CRA`.
- Simple test cases for most of the `.js` files.