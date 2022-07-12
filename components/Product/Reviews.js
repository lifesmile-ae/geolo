import React, { useState } from 'react';
import Image from 'next/image';
import ReactStars from 'react-rating-stars-component';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const Reviews = ({ active, productid }) => {
  const [rating, setRating] = useState(0);
  const [session, loading] = useSession();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [groupBy, setGroupBy] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  const ratingChanged = (newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
    if (session) {
      setFullName(session.user.firstname + ' ' + session.user.lastname);
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (active === 'review') {
      axios
        .get(`/api/review?productid=${productid}`)
        .then(({ data }) => {
          setReviews(data.reviews[0].reviews);
          setAverage(data.average[0].averageRate);
          setCount(data.count);
          setGroupBy(data.groupBy);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [active]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating === 0 && fullname === '' && email === '' && comment === '') {
      toast.error('Please fill all fields');
      return;
    }
    axios
      .post(`/api/review`, { rating, fullname, email, comment, productid })
      .then(({ data }) => {
        toast.success(
          'Review added successfully. It will be displayed once verified'
        );
        setFullName('');
        setEmail('');
        setComment('');
        setRating(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`tab-pane ${active == 'review' ? 'active' : ''}`}
      id="product-tab-reviews"
    >
      <div className="row mb-4">
        <div className="col-xl-4 col-lg-5 mb-4">
          <div className="ratings-wrapper">
            <div className="avg-rating-container">
              <h4 className="avg-mark font-weight-bolder ls-50">
                {average.toFixed(1)}
              </h4>
              <div className="avg-rating">
                <p className="text-dark mb-1">Average Rating</p>
                <div className="ratings-container">
                  <div className="ratings-full">
                    <span
                      className="ratings"
                      style={{ width: `${average * 20}%` }}
                    ></span>
                    <span className="tooltiptext tooltip-top"></span>
                  </div>
                  <a href="#" className="rating-reviews">
                    ({count} Reviews)
                  </a>
                </div>
              </div>
            </div>
            <div className="ratings-list">
              {groupBy.map((item, i) => (
                <div className="ratings-container" key={i}>
                  <div className="ratings-full">
                    <span
                      className="ratings"
                      style={{ width: `${item._id * 20}%` }}
                    ></span>
                  </div>
                  <div className="progress-bar progress-bar-sm ">
                    <span
                      style={{ width: `${(item.count / count) * 100}%` }}
                    ></span>
                  </div>
                  <div className="progress-value">
                    <mark> {(item.count / count) * 100}%</mark>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 mb-4">
          <div className="review-form-wrapper">
            <h3 className="title tab-pane-title font-weight-bold mb-1">
              Submit your review
            </h3>
            <form onSubmit={submitHandler} className="review-form">
              <div className="rating-form">
                <label htmlFor="rating">
                  <strong>Your rating of this product :</strong>
                </label>
                <span className="rating-stars">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#F77C29"
                  />
                </span>
              </div>

              {!session && (
                <div className="row gutter-md">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={fullname}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <textarea
                cols="30"
                rows="6"
                placeholder="Write Your Review Here..."
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button type="submit" className="btn btn-dark">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="tab tab-nav-boxed tab-nav-outline tab-nav-center">
        <div className="tab-content">
          <div className="tab-pane active" id="show-all">
            <ul className="comments list-style-none">
              {reviews.map((item, i) => (
                <>
                  {item.verified && (
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-content">
                          <h4 className="comment-author">
                            <a href="#">{item.fullname}</a>
                            <span className="comment-date">
                              {' '}
                              {dayjs(item.createdAt).format('MMMM D, YYYY')}
                            </span>
                          </h4>
                          <div className="ratings-container comment-rating">
                            <div className="ratings-full">
                              <span
                                className="ratings"
                                style={{ width: `${item.rating * 20}%` }}
                              ></span>
                            </div>
                          </div>
                          <p>{item.comment}</p>
                        </div>
                      </div>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
