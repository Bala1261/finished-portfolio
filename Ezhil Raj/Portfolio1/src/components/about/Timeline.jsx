import React, { useState } from 'react';

export default function Timeline({ experience }) {
  const [activeYear, setActiveYear] = useState(experience[0]?.year || '2026');

  return (
    <section className="timeline" id="timeline">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header__title">Career Timeline</h2>
          <div className="section-header__link">
            <span>2020 &mdash; Present</span>
          </div>
        </div>

        <div className="timeline__items">
          {experience.map((item) => {
            const isActive = activeYear === item.year;
            return (
              <div
                key={item.year}
                className={`timeline__item ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveYear(item.year)}
              >
                <div className="timeline__year">{item.year}</div>

                <div className="timeline__content">
                  <h3 className="timeline__role">{item.role}</h3>
                  <div className="timeline__company">{item.company}</div>
                  <p className="timeline__desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
