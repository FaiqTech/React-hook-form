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

const FormComponent = () => {
  // useForm hook-u ilə formun idarə edilməsinə lazım olan metodları əldə edirik
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Form göndərildikdə çağırılacaq funksiya
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h2 className="text-center mb-4">Qeydiyyat Forması</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Ad sahəsi */}
            <FormGroup>
              <Label for="name">Ad</Label>
              <Controller
                name="name" // Form sahəsinin adı
                control={control} // Form sahəsini Controller ilə əlaqələndiririk
                defaultValue="" // Form sahəsinin ilkin dəyəri
                rules={{ required: "Ad tələb olunur" }} // Doğrulama qaydaları
                render={({ field }) => (
                  <Input
                    {...field} // Form sahəsinə lazım olan bütün xüsusiyyətləri verir
                    id="name" // Form sahəsinin ID-si
                    placeholder="Adınızı daxil edin" // Form sahəsinin placeholder-i
                    invalid={!!errors.name} // Səhv olduqda sahənin qırmızı rəngdə olmasını təmin edir
                  />
                )}
              />
              {errors.name && ( // Səhv mesajını göstərir
                <FormFeedback>{errors.name.message}</FormFeedback> // Səhv mesajı
              )}
            </FormGroup>

            {/* Email sahəsi */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Controller
                name="email" // Form sahəsinin adı
                control={control} // Form sahəsini Controller ilə əlaqələndiririk
                defaultValue="" // Form sahəsinin ilkin dəyəri
                rules={{
                  required: "Email tələb olunur", // Doğrulama qaydaları
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Email düzgün deyil", // Email doğrulama qaydası
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field} // Form sahəsinə lazım olan bütün xüsusiyyətləri verir
                    id="email" // Form sahəsinin ID-si
                    placeholder="Emailinizi daxil edin" // Form sahəsinin placeholder-i
                    type="email" // Form sahəsinin tipi
                    invalid={!!errors.email} // Səhv olduqda sahənin qırmızı rəngdə olmasını təmin edir
                  />
                )}
              />
              {errors.email && ( // Səhv mesajını göstərir
                <FormFeedback>{errors.email.message}</FormFeedback> // Səhv mesajı
              )}
            </FormGroup>

            {/* Göndər düyməsi */}
            <Button color="primary" block type="submit">
              Göndər
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
