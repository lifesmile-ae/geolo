import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';

const Index = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [order, setOrder] = useState([]);

  const orderStatus = (order) => {
    let stats = '';
    order.orderStatus?.map((a) => {
      if (a.isCompleted === false) {
        stats = a.type;
      }
    });
    return stats;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/${input}`);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        setOrder(data.message[0]);
        setIsOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <>
        <div className="page-content">
          <section className="boost-section pt-10 pb-10">
            <div className="container mt-5 mb-9">
              <div className="row align-items-center mb-10">
                <div className="col-md-12 col-sm-6 mb-8">
                  <article className="tcard">
                    <header className="tcard-header">
                      {' '}
                      My Orders / Tracking{' '}
                    </header>
                    <div className="tcard-body">
                      <div className={isOpen ? 'd-none' : 'd-block'}>
                        <form onSubmit={submitHandler}>
                          <input
                            type="text"
                            className="form-control"
                            name="search"
                            placeholder="Enter your invoice number"
                            size={5}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{ backgroundColor: '#f5f5f5' }}
                          />
                          <div
                            className="cart-action"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginTop: '10px',
                            }}
                          >
                            <button
                              className="btn btn-primary btn-icon-left btn-rounded"
                              type="submit"
                            >
                              Track Order
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className={isOpen ? 'd-block' : 'd-none'}>
                        <h6>Invoice ID: #{order.invoiceNumber}</h6>
                        <article className="tcard">
                          <div className="tcard-body row">
                            <div className="col-card">
                              {' '}
                              <strong className="text-dark">
                                Estimated Delivery time:
                              </strong>{' '}
                              <br />
                              {dayjs(order.createdAt)
                                .add(3, 'day')
                                .format('MMMM D, YYYY')}
                            </div>
                            <div className="col-card">
                              {' '}
                              <strong className="text-dark">
                                Shipping BY:
                              </strong>{' '}
                              <br /> BLUEDART | <i className="fa fa-phone"></i>{' '}
                              +1598675986{' '}
                            </div>
                            <div
                              className="col-card"
                              style={{ textTransform: 'capitalize' }}
                            >
                              {' '}
                              <strong className="text-dark">
                                Status:
                              </strong>{' '}
                              <br /> {orderStatus(order)}{' '}
                            </div>
                            <div className="col-card">
                              {' '}
                              <strong className="text-dark">
                                Tracking #:
                              </strong>{' '}
                              <br /> BD045903594059{' '}
                            </div>
                          </div>
                        </article>
                        <div className="track">
                          <div
                            className={`step ${
                              order?.orderStatus?.length > 1 && 'active'
                            }`}
                          >
                            {' '}
                            <span className="icon">
                              {' '}
                              <i className="fa fa-check"></i>{' '}
                            </span>{' '}
                            <span className="text">Order confirmed</span>{' '}
                          </div>
                          <div
                            className={`step ${
                              order?.orderStatus?.length > 2 && 'active'
                            }`}
                          >
                            {' '}
                            <span className="icon">
                              {' '}
                              <i className="fa fa-user"></i>{' '}
                            </span>{' '}
                            <span className="text"> Processing</span>{' '}
                          </div>
                          <div
                            className={`step ${
                              order?.orderStatus?.length > 4 && 'active'
                            }`}
                          >
                            {' '}
                            <span className="icon">
                              {' '}
                              <i className="w-icon-gift2"></i>{' '}
                            </span>{' '}
                            <span className="text">Dispatched to courier </span>{' '}
                          </div>
                          <div
                            className={`step ${
                              order?.orderStatus?.length > 6 && 'active'
                            }`}
                          >
                            {' '}
                            <span className="icon">
                              {' '}
                              <i className="fa fa-truck"></i>{' '}
                            </span>{' '}
                            <span className="text"> On the way </span>{' '}
                          </div>
                          <div
                            className={`step ${
                              order?.orderStatus?.length > 8 && 'active'
                            }`}
                          >
                            {' '}
                            <span className="icon">
                              {' '}
                              <i className="fa fa-box"></i>{' '}
                            </span>{' '}
                            <span className="text">Ready for pickup</span>{' '}
                          </div>
                        </div>
                        <hr />
                        <ul className="row">
                          {order?.cartitems?.cartItems.map((item, i) => (
                            <li className="col-md-4" key={i}>
                              <figure className="itemside mb-3">
                                <div className="aside">
                                  <Image
                                    src={item.productImage}
                                    className="img-sm tborder"
                                    height={80}
                                    width={80}
                                    alt={item.name}
                                  />
                                </div>
                                <figcaption className="info align-self-center">
                                  <p className="ttitle text-dark">
                                    16CM Sauce Pan <br />{' '}
                                    <span className="ttitle-item">
                                      {item.productCode}
                                    </span>
                                  </p>{' '}
                                  <span className="text-muted">
                                    {item.currency} {item.discountedPrice}{' '}
                                  </span>
                                </figcaption>
                              </figure>
                            </li>
                          ))}
                        </ul>
                        <hr />
                      </div>

                      {isOpen && (
                        <div
                          className="cart-action"
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <a
                            className="btn btn-primary btn-icon-left btn-rounded"
                            data-abc="true"
                            onClick={(e) => setIsOpen(!isOpen)}
                          >
                            Go Back
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default Index;
