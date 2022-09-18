import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardUser() {
  return (
    <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "6%" }}>
      <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" style={{ width: "150px", align: "center", marginTop:"3%" }} class="rounded-circle mx-auto d-block"/>

      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>John Smith</Card.Title>

        <Card.Text style={{ fontSize: "16px", textAlign: "center" }}>Full Stack Developer</Card.Text>

        <Card.Text style={{ fontSize: "13px", marginTop:"-16px", textAlign: "center"}}>Bay Area, San Francisco, CA</Card.Text>

        <Button variant="primary" style={{ marginLeft:"20%" }}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardUser;