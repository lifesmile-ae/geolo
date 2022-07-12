import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Index = ({ limit }) => {
  const router = useRouter();
  const [limitFilter, setLimitFilter] = useState(limit);
  const handleLimitFilter = (e) => {
    setLimitFilter(e.target.value);
    router.push(
      `/product-category/${router.query.slug}?limit=${e.target.value}`
    );
  };

  return (
    <nav className="toolbox sticky-toolbox sticky-content fix-top">
      <div className="toolbox-left">
        <a
          href="#"
          className="btn btn-primary btn-outline btn-rounded left-sidebar-toggle 
                      btn-icon-left d-block d-lg-none"
        >
          <i className="w-icon-category"></i>
          <span>Filters</span>
        </a>
        <div className="toolbox-item toolbox-sort select-box text-dark">
          <label>Sort By :</label>
          <select name="orderby" className="form-control">
            <option value="default">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="rating">Sort by average rating</option>
            <option value="date">Sort by latest</option>
            <option value="price-low">Sort by pric: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
          </select>
        </div>
      </div>
      <div className="toolbox-right">
        <div className="toolbox-item toolbox-show select-box">
          <select
            name="count"
            className="form-control"
            value={limitFilter}
            onChange={handleLimitFilter}
          >
            <option value="12">Show 12</option>
            <option value="20">Show 20</option>
            <option value="30">Show 30</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Index;
