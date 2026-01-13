const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { useForm } = require('react-hook-form');

function SimpleForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" {...register('firstName', { required: true })} />
      {errors.firstName && <span>First name is required</span>}

      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" {...register('lastName', { required: true })} />
      {errors.lastName && <span>Last name is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

describe('React Hook Form', () => {
  it('renders a simple form and handles submission', async () => {
    const mockSubmit = jest.fn();
    render(<SimpleForm onSubmit={mockSubmit} />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { firstName: 'John', lastName: 'Doe' },
        expect.anything()
      );
    });
  });
});
