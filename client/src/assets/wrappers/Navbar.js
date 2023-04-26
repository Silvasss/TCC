import styled from 'styled-components'


const Wrapper = styled.nav`
  height: var(--nav-height);

  display: flex;
  
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .logo {
    display: flex;

    align-items: center;

    width: 100px;
  }

  .nav-center {
    display: relative;    

    align-items: center;

    margin-right: 1%
  }

  .pendencias {
    display: flex;

    align-items: center;

    margin-right: 5%
  }

  .toggle-btn {
    background: transparent;

    border-color: transparent;

    font-size: 1.75rem;

    color: var(--primary-500);

    cursor: pointer;

    display: flex;

    align-items: center;
  }

  background: var(--white);

  .logo-text {
    display: none;

    margin: 0;
  }

  @media (min-width: 992px) {
    position: relative;

    top: 0;

    .nav-center {
      position: relative;

      width: 90%;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: block;
    }
  }
`


export default Wrapper