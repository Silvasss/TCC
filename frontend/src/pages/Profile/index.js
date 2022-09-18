import CardInfoAcademico from '../../components/CardInfoAcademico';
import CardInfoProfissional from '../../components/CardInfoProfissional';
import CardInfoUser from '../../components/cardInfoUser';
import CardUser from '../../components/cardUser';
import NavBar from '../../components/navBar';
import * as C from "./styles";


const ProfilePage = () => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>

      <div>
        <CardUser/>
      </div>
      
      <C.div>
        <CardInfoUser/>

        <CardInfoAcademico/>

        <CardInfoProfissional/>
      </C.div>

    </div>
  );
}

export default ProfilePage