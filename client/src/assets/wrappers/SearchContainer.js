import styled from 'styled-components'


const Wrapper = styled.section`
  .form {
    width: 100%;

    max-width: 100%;
  }

  .form-input, .form-select, .btn-block, .searc-btn {
    height: 35px;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;

    grid-template-columns: 1fr;

    column-gap: 2rem;

    row-gap: 0.5rem;
  }

  h5 {
    font-weight: 700;
  }

  .btn-block {
    align-self: end;

    margin-top: 1rem;
  }

  .searc-btn {
    background-color: #57abff;
    border-radius: 0.25rem;
    border: transparent;
    display: inline-block;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    letter-spacing: 1px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: 0.3s ease-in-out all;
  }

  .searc-btn:hover {
    background-color:#80b5ea;
    color: #fff;
  }

  .searc-btn:active {
    position:relative;
    top:1px;
  }

  .limpar-btn {
    background-color: #c25959;
    border-radius: 0.25rem;
    border: transparent;
    display: inline-block;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    letter-spacing: 1px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: 0.3s ease-in-out all;
  }

  .limpar-btn:hover {
    background-color:#f09e90;
    color: #fff;
  }

  .limpar-btn:active {
    position:relative;
    top:1px;
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`


export default Wrapper