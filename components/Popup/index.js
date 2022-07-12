import React, { useState } from 'react';

const Index = () => {
  const [modal, setModal] = useState(true);
  return (
    <div className={`modal ${modal ? '' : 'hide'}`}>
      <div className="modal-content">
        <div className="newsletter-popup">
          <span
            className="close"
            onClick={(e) => setModal(false)}
            style={{ marginRight: '70rem' }}
          >
            &times;
          </span>
          <div className="newsletter-content">
            <h4 className="text-uppercase font-weight-normal ls-25">
              Get Flat<span className="text-primary">10% Off</span>
            </h4>
            <h2 className="ls-25">USE CODE SMILE10</h2>
            <p className="text-light ls-10">
              Subscribe to the newsletter to receive updates on special offers
              and coupons.
            </p>
            <form
              action="#"
              method="get"
              className="input-wrapper input-wrapper-inline input-wrapper-round"
            >
              <input
                type="email"
                className="form-control email font-size-md"
                name="email"
                id="email2"
                placeholder="Your email address"
                required=""
              />
              <button className="btn btn-dark" type="submit">
                SUBMIT
              </button>
            </form>
            <div className="form-checkbox d-flex align-items-center">
              <input
                type="checkbox"
                className="custom-checkbox"
                id="hide-newsletter-popup"
                name="hide-newsletter-popup"
                required=""
              />
              <label
                htmlFor="hide-newsletter-popup"
                className="font-size-sm text-light"
              >
                Dont show this popup again.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
