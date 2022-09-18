import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


function CardInfoUser() {
  return (
    //<Card style={{ width: '38rem', marginLeft: "27%", marginTop: "-22%"}}>
    <Card style={{ width: '38rem'}}>
      <Card.Body style={{ width: '50rem'}}>   
        <p>Dados pessoais</p>
        <div class="col-lg-9">
          <div class="card mb-0">
            <div class="card-body">

              <div class="row">
                <div class="col-sm-4">
                  <p class="mb-0">Nome</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">Johnatan Smith</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">example@example.com</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Phone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">(097) 234-5678</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Cidade</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Palmas</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">País</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Brasil</p>
                </div>
              </div>

            </div>
          </div>
        </div>
          
      </Card.Body>

    </Card>
  );
}

export default CardInfoUser;