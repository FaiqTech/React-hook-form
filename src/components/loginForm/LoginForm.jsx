import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
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
  Spinner,
} from "reactstrap";

const LoginForm = () => {
  const [loading, setLoading] = useState(false); // Yükləmə vəziyyəti
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isTouched, isValid },
  } = useForm({
    mode: "onChange", // Formun dəyişdirildiyi anda validasiya edilməsi
    reValidateMode: "onChange", // Formu dəyişikliklərdən sonra yenidən doğrulama
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulyasiya edilmiş asinxron əməliyyat (API çağırışı və s.)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
      reset(); // Formu sıfırlayırıq
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h2 className="text-center mb-4">Giriş Forması</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
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
                    invalid={!!errors.email && (isDirty || isTouched)}
                    aria-describedby="emailHelp"
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
              <FormFeedback id="emailHelp">
                {errors.email ? errors.email.message : ""}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Şifrə</Label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Şifrə tələb olunur",
                  minLength: {
                    value: 6,
                    message: "Şifrə ən azı 6 simvol olmalıdır",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    placeholder="Şifrənizi daxil edin"
                    type="password"
                    invalid={!!errors.password && (isDirty || isTouched)}
                    aria-describedby="passwordHelp"
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
              <FormFeedback id="passwordHelp">
                {errors.password ? errors.password.message : ""}
              </FormFeedback>
            </FormGroup>

            <Button
              color="primary"
              block
              type="submit"
              disabled={isSubmitting || loading || !isValid}
            >
              {loading ? <Spinner size="sm" /> : "Giriş"}
            </Button>
          </Form>
        </Col>
      </Row>
      <DevTool control={control} placement="top-right" />
    </Container>
  );
};

export default LoginForm;
