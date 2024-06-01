import { Container } from "@mui/material";
import { UserContext } from "../../context/UserContext.tsx";
import UserForm from "./UserForm.tsx";

export function Users() {
  return (
    <Container>
      <UserContext>
        <UserForm />
      </UserContext>
    </Container>
  );
}
