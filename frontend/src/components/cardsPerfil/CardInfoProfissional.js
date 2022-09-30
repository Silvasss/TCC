import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import FindPerfilProfissonal from '../../contexts/findPerfilProfissonal';


function CardInfoProfissional() {
  let userData = JSON.parse(localStorage.getItem('user_dados'))

  FindPerfilProfissonal(userData['idPerfil'])

  let userDataAcademico = JSON.parse(localStorage.getItem('user_perfilprofissonal'))


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
                  <p class="text-muted mb-0">{userDataAcademico[0]['empresa']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Cargo / Função</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">{userDataAcademico[0]['cargo']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ano de início</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{userDataAcademico[0]['anoInicio']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ano de saída</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{userDataAcademico[0]['anoSaida'] ? userDataAcademico[0]['anoSaida'] : 'Em contrato'}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Cidade</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{userDataAcademico[0]['cidade']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">País</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{userDataAcademico[0]['pais']}</p>
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