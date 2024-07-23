import "./App.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "reactstrap";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "Faiq",
      email: "hesenovfaiq@icloud.com",
      password: "faiq12345",
      confirmPassword: "faiq12345",
    },
  });

  const submitForm = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="App">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your user name"
            {...register("userName", {
              required: {
                value: true,
                message: "User Name is required",
              },
              minLength: {
                value: 3,
                message: "User Name must be at least 3 characters",
              },
              mode: "onChange",
            })}
          />
          {errors.userName && <span>{errors.userName.message}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" || "Enter a valid email"
                  );
                },
                notBlacklisted: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "Email domain is blacklisted"
                  );
                },
              },
              rules: {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format",
                },
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <Button type="submit" disabled={isDirty && !isValid}>
          Login
        </Button>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default App;
