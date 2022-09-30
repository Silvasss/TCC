import CardInfoProfissional from "../../components/cardsPerfil/CardInfoProfissional";
import CardInfoAcademico from "../../components/cardsPerfil/CardInfoAcademico";
import CardInfonUser from "../../components/cardsPerfil/cardInfoUser";
import CardUser from "../../components/cardsPerfil/cardUser";
import NavBar from "../../components/navigation/navBar";
import "./styles.css";


const ProfilePage = () => { 
  
  return (
    <div class="parent">

      <div class="div1"> 
        <NavBar/>
      </div>

      <div class="div2"> 
        <CardUser/>
      </div>

      <div class="div3"> 
        <CardInfonUser/>

        <CardInfoAcademico/>

        <CardInfoProfissional/>
      </div>

    </div>
  );
}

export default ProfilePage