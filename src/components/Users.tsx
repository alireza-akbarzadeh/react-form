import { Container } from "@mui/material";
import { FormContext } from "./FormContext.tsx";
import UserForm from "./UserForm.tsx";

export function Users() {
  return (
    <Container>
      <FormContext>
        <UserForm />
      </FormContext>
    </Container>
  );
}
