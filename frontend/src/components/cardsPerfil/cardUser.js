import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardUser() { 
  let userData = JSON.parse(localStorage.getItem('user_dados'))

  
  return (
    <Card style={{ width: '20rem', marginTop: "2%", marginLeft: "6%" }}>

      <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" style={{ width: "150px", align: "center", marginTop:"3%" }} class="rounded-circle mx-auto d-block"/>

      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>{userData['name']}</Card.Title>

        <Card.Text style={{ fontSize: "16px", textAlign: "center" }}>Full Stack Developer</Card.Text>

        <Card.Text style={{ fontSize: "13px", marginTop:"-16px", textAlign: "center"}}>{userData['cidade']}, {userData['pais']}</Card.Text>

        <Button variant="primary" style={{ marginLeft:"26%" }}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}


export default CardUser;