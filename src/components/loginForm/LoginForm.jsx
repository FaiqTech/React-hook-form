import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Container,
  Row,
  Col,
} from "reactstrap";

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Form göndərildikdən sonra formu sıfırlayırıq
    reset();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h2 className="text-center mb-4">Giriş Forması</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Email sahəsi */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email tələb olunur",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Email düzgün deyil",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    placeholder="Emailinizi daxil edin"
                    type="email"
                    invalid={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <FormFeedback>{errors.email.message}</FormFeedback>
              )}
            </FormGroup>

            {/* Şifrə sahəsi */}
            <FormGroup>
              <Label for="password">Şifrə</Label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Şifrə tələb olunur",
                  minLength: {
                    value: 6,
                    message: "Şifrə ən az 6 simvoldan ibarət olmalıdır",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    placeholder="Şifrənizi daxil edin"
                    type="password"
                    invalid={!!errors.password}
                  />
                )}
              />
              {errors.password && (
                <FormFeedback>{errors.password.message}</FormFeedback>
              )}
            </FormGroup>

            {/* Giriş düyməsi */}
            <Button color="primary" block type="submit">
              Giriş
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
