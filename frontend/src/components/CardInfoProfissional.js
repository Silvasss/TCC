import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


function CardInfoProfissional() {
  return (
    //<Card style={{ width: '38rem', marginLeft: "27%", marginTop: "1%"}}>
    <Card style={{ width: '38rem'}}>

      <Card.Body style={{ width: '50rem'}}>   
        <p>Dados profissional</p>
        <div class="col-lg-9">
          <div class="card mb-0">
            <div class="card-body">

              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Empresa</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">Tlab - SQUAD sob medida</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Cargo / Função</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">Gestão da Tecnologia da Informação</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ano de início</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">17/03/2023</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ano de saída</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">01/06/2032</p>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Cidade</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Sinop</p>
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

export default CardInfoProfissional;