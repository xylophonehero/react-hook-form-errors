const React = require("react");
const { render, screen, fireEvent } = require("@testing-library/react");
const { useForm, createFormControl, Controller } = require("react-hook-form");

const formControl = createFormControl({
  defaultValues: {
    firstName: "",
  },
});

const setError = () => {
  formControl.setError("firstName", "First name is required");
};

function SimpleForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    formControl,
  });

  return (
    <form
      onSubmit={handleSubmit(() => {
        setError();
      })}
    >
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              {...field}
              placeholder="First Name"
              aria-label="First Name"
            />
            {error && <span>Field state error</span>}
          </>
        )}
      />
      {errors.firstName && <span>Form state error</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

describe("React Hook Form", () => {
  it("renders a simple form and handles submission", async () => {
    render(<SimpleForm />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);
    await screen.findByText("Form state error");
    await screen.findByText("Field state error");
  });
});
