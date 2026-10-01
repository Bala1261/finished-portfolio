import React, { useState } from 'react';
import ContentCard from './ContentCard';
import ContentFilter from './ContentFilter';
import { useCursor } from '../../context/CursorContext';
import { ArrowRight } from 'lucide-react';

export default function FeaturedContent({ content, categories, onSelectArticle }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const { setCursor, resetCursor, showPreview, hidePreview } = useCursor();

  const featuredItem = content.find((item) => item.featured) || content[0];

  const filteredItems = content
    .filter((item) => item.id !== featuredItem?.id)
    .filter((item) => activeCategory === 'ALL' || item.category === activeCategory);

  const handleFeaturedEnter = () => {
    setCursor('read', 'READ →');
    if (featuredItem?.image) {
      showPreview(featuredItem.image, featuredItem.title, featuredItem.category);
    }
  };

  const handleFeaturedLeave = () => {
    resetCursor();
    hidePreview();
  };

  return (
    <section className="featured-content" id="content">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-header__title">Featured Writing & Ideas</h2>
          <div className="section-header__link">
            <span>{content.length} Pieces Published</span>
          </div>
        </div>

        {/* Large Featured Article */}
        {featuredItem && (
          <article
            className="featured-article"
            onClick={() => onSelectArticle(featuredItem.id)}
            onMouseEnter={handleFeaturedEnter}
            onMouseLeave={handleFeaturedLeave}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArticle(featuredItem.id);
              }
            }}
          >
            <div className="featured-article__content">
              <div>
                <span className="featured-article__tag">{featuredItem.category}</span>
                <h3 className="featured-article__title">{featuredItem.title}</h3>
                <p className="featured-article__excerpt">{featuredItem.excerpt}</p>
              </div>

              <div>
                <div className="featured-article__meta">
                  <span>{featuredItem.readTime}</span>
                  <span className="featured-article__meta-dot" />
                  <span>{featuredItem.date}</span>
                </div>

                <div className="featured-article__arrow">
                  <span>Read Full Essay</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>

            <div className="featured-article__image-wrap">
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                className="featured-article__image"
                loading="lazy"
              />
            </div>

            <div className="featured-article__accent-line" />
          </article>
        )}

        {/* Category Filters */}
        <ContentFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Smaller Articles Grid */}
        <div className="content-grid">
          {filteredItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onSelect={onSelectArticle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
