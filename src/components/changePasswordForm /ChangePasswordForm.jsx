import { DevTool } from "@hookform/devtools";
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

const ChangePasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("newPassword", ""); // Yeni şifrə sahəsinin dəyərini izləyirik

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h2 className="text-center mb-4">Şifrəni Dəyiş</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="currentPassword">Cari Şifrə</Label>
              <Controller
                name="currentPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Cari sifrə tələb olunur" }}
                render={(
                  { field } //fildi inputa veririk ki inputda yazilanlari ala bilek ve validasiyadan keciririk
                ) => (
                  <Input
                    {...field} //inputa veririk ki inputda yazilanlari ala bilek ve validasiyadan keciririk
                    id="currentPassword"
                    placeholder="Cari sifrənizi daxil edin"
                    type="password"
                    invalid={!!errors.currentPassword} //eger error varsa invalid olur ve error mesajini gosterir
                  />
                )}
              />
              {errors.currentPassword && (
                <FormFeedback>{errors.currentPassword.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="newPassword">Yeni Şifrə</Label>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Yeni sifrə tələb olunur",
                  minLength: {
                    value: 8,
                    message: "Sifrə ən azı 8 simvol olmalıdır",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      "Sifrə ən azı 1 böyük hərf, 1 kiçik hərf və 1 rəqəm olmalıdır",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="newPassword"
                    placeholder="Yeni sifrənizi daxil edin"
                    type="password"
                    invalid={!!errors.newPassword}
                  />
                )}
              />
              {errors.newPassword && (
                <FormFeedback>{errors.newPassword.message}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="confirmNewPassword">Yeni Şifrə Təsdiqi</Label>
              <Controller
                name="confirmNewPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Yeni sifrə təsdiqi tələb olunur",
                  validate: (value) =>
                    value === newPassword || "Sifrələr uyğun gəlmir",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmNewPassword"
                    placeholder="Yeni sifrənizi təsdiqləyin"
                    type="password"
                    invalid={!!errors.confirmNewPassword}
                  />
                )}
              />
              {errors.confirmNewPassword && (
                <FormFeedback>{errors.confirmNewPassword.message}</FormFeedback>
              )}
            </FormGroup>

            <Button color="primary" block type="submit">
              Şifrəni Dəyiş
            </Button>
          </Form>
        </Col>
      </Row>
      <DevTool control={control} placement="top-right" />
    </Container>
  );
};

export default ChangePasswordForm;
