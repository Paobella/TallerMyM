
const Footer = () => {
return (

<footer className="footer footer-white-text">
<section
  className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
></section>

<section className="">
  <div className="container text-center mt-5 align-items-center">
    <div
      className="d-flex justify-content-start flex-column align-items-start ms-4 mb-5"
    >
      <h5>Estamos a las ordenes</h5>
    </div>

    <div className="row mt-3">
      <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">San Marcos de Tarrazú San José</h6>
      </div>

      <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Productos y servicios</h6>
        <p>Mantenimiento</p>
        <p>Reparación</p>
        <p>Modificaciones</p>
        <p>Peronalización</p>
      </div>

      <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Redes sociales</h6>
        <p>Facebook</p>
        <p>Instagram</p>
      </div>

      <div className="col-md-4 col-lg-3 col-xl-2 mx-auto mb-md-0 mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
        <p>+506 22222222</p>
      </div>
    </div>
  </div>
</section>

<div className="text-center p-4">
  <h6>
  Copyright &copy; 2025 - Taller Mécanico MyM
  </h6>
</div>
</footer>

);

}

export default Footer;