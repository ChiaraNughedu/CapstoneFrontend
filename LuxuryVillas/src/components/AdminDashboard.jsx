import VilleComponent from "./VilleComponent";

import { Container } from "react-bootstrap";

const AdminDashboard = () => {  
  return (
   <Container>
    <VilleComponent isAdmin={true} />
    
   </Container>
  );
}
export default AdminDashboard;