import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import FindPerfilAcademico from '../../contexts/findPerfilAcademico';



function CardInfoAcademico() {
  let userData = JSON.parse(localStorage.getItem('user_dados'))

  FindPerfilAcademico(userData['_id'])

  let userDataAcademico = JSON.parse(localStorage.getItem('user_perfilacademico'))

  return (
    //<Card style={{ width: '38rem', marginLeft: "27%", marginTop: "1%"}}>
    <Card style={{ width: '38rem'}}>

      <Card.Body style={{ width: '50rem'}}>   
        <p>Dados acadêmico</p>
        
        <div class="col-lg-9">
          <div class="card mb-0">
            <div class="card-body">

              <div class="row">
                <div class="col-sm-4">
                  <p class="mb-0">Instituição de ensino</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">{userDataAcademico[0]['instituicaoEnsino']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Curso</p>
                </div>
                <div class="col-sm-7">
                  <p class="text-muted mb-0">{userDataAcademico[0]['curso']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ano / Semestre de entrada</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{userDataAcademico[0]['anoInicio']}</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ano / Semestre de saída</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{userDataAcademico[0]['anoSaida']}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
          
      </Card.Body>

    </Card>
  );
}

export default CardInfoAcademico;