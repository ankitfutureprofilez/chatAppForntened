import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
function Footer() {
  return (

    <section id="footer">
      <div className='row'>
        <div className='col-md-12'>
          <MDBFooter className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 '>

              <div>
                <Link to='' className='me-4 text-reset'>
                  <MDBIcon fab icon="facebook-f" />
                </Link>
                <Link to='' className='me-4 text-reset'>
                  <MDBIcon fab icon="facebook-f" />
                </Link>
                <Link to='' className='me-4 text-reset'>
                  <MDBIcon fab icon="facebook-f" />
                </Link>
                <Link to='' className='me-4 text-reset'>
                  <MDBIcon fab icon="facebook-f" />
                </Link>
                <Link to='' className='me-4 text-reset'>
                  <MDBIcon fab icon="facebook-f" />
                </Link>
                <Link to='' className='me-4 text-reset'>
                  <MDBIcon fab icon="facebook-f" />
                </Link>
              </div>
            </section>

            <section className=''>
              <MDBContainer className='text-center text-md-start mt-5'>
                <MDBRow className='mt-2'>
                  <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                    <h6 className='text-uppercase  mb-4'>
                      <MDBIcon icon="gem" className="me-3" />
                      Company name
                    </h6>
                    <p>
                      Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit.
                    </p>
                  </MDBCol>

                  <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                  </MDBCol>

                  <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                    <p>
                      <Link to='' className='text-reset'>
                        React
                      </Link>
                    </p>
                  </MDBCol>

                  <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                    <p>
                      <MDBIcon icon="home" className="me-2" />
                      New York, NY 10012, US
                    </p>
                    <p>
                      <MDBIcon icon="envelope" className="me-3" />
                      info@example.com
                    </p>
                    <p>
                      <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                    </p>
                    <p>
                      <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>


          </MDBFooter>
        </div>
      </div>
    </section>

  );
}

export default Footer;