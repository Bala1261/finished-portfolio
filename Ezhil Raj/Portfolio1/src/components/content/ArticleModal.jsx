import React, { useEffect, useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, Check } from 'lucide-react';

export default function ArticleModal({ article, onClose, onSelectNext, allArticles, authorName }) {
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    // Scroll progress inside article
    const handleScroll = () => {
      const modalEl = document.getElementById('article-modal-scroll');
      if (!modalEl) return;
      const { scrollTop, scrollHeight, clientHeight } = modalEl;
      const total = scrollHeight - clientHeight;
      if (total > 0) {
        setReadProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
      }
    };

    const modalEl = document.getElementById('article-modal-scroll');
    if (modalEl) {
      modalEl.scrollTop = 0;
      modalEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Keyboard ESC to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll when open
    document.body.style.overflow = 'hidden';

    return () => {
      if (modalEl) modalEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [article.id, onClose]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find next article
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length];

  return (
    <div
      id="article-modal-scroll"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--bg)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
    >
      {/* Top Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--border)',
          zIndex: 1002,
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--accent)',
            width: `${readProgress}%`,
            transition: 'width 0.08s ease-out',
          }}
        />
      </div>

      {/* Floating Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(247, 244, 238, 0.94)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px var(--gutter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1001,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="article-back__btn"
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'var(--font-label)', fontSize: '11px', color: 'var(--secondary)', letterSpacing: '0.08em' }}>
            {Math.round(readProgress)}% READ
          </span>

          <button
            type="button"
            onClick={handleShare}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              border: '1px solid var(--border)',
              padding: '6px 12px',
              borderRadius: '2px',
            }}
          >
            {copied ? <Check size={14} color="var(--accent)" /> : <Share2 size={14} />}
            {copied ? 'Copied' : 'Share'}
          </button>
        </div>
      </div>

      {/* Article Hero */}
      <header className="article-hero">
        <div className="article-hero__category">{article.category}</div>
        <h1 id="article-title" className="article-hero__title">
          {article.title}
        </h1>
        <p className="article-hero__intro">{article.excerpt}</p>

        <div className="article-meta">
          <div>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>By {authorName}</span>
          </div>
          <span>&bull;</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            <span>{article.date}</span>
          </div>
          <span>&bull;</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {article.image && (
        <div style={{ maxWidth: '960px', margin: '0 auto 48px', padding: '0 var(--gutter)' }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '2px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            }}
          />
        </div>
      )}

      {/* Article Body */}
      <div className="article-body">
        <p>
          In an era where everyone has a megaphone, volume is no longer an advantage. Clarity is.
          The brands, thinkers, and creators who thrive today aren&apos;t the ones who produce the most content &mdash;
          they are the ones who articulate perspective with precision.
        </p>

        <h2>The Illusion of Frequency</h2>
        <p>
          For the past decade, internet marketing preached an unbroken gospel: publish daily, optimize for algorithms,
          and feed the feed. But algorithms are mercurial landlords. When you optimize for reach over resonance,
          you trade durable authority for transient clicks.
        </p>

        <blockquote>
          &ldquo;When everyone is shouting, the most powerful sound in the room is a whispered truth told clearly.&rdquo;
        </blockquote>

        <p>
          Consider what makes writing memorable. It is rarely the format or the distribution gimmick.
          It is the friction between an original observation and honest expression. When a reader encounters
          a thought they have felt but never formulated into words, trust is born instantly.
        </p>

        <h2>Building an Editorial Moat</h2>
        <p>
          To stand out in any competitive landscape &mdash; whether as an independent consultant, a content strategist,
          or a growing organization &mdash; you must build what I call an <em>editorial moat</em>.
          This consists of three interconnected pillars:
        </p>

        <ul style={{ paddingLeft: '24px', marginBottom: '28px', color: 'var(--secondary)', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: 'var(--primary)' }}>Distinctive Lexicon:</strong> The specific vocabulary and frameworks that represent your worldview.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: 'var(--primary)' }}>Proof Through Depth:</strong> Choosing a few complex problems to solve in public with radical transparency.
          </li>
          <li>
            <strong style={{ color: 'var(--primary)' }}>A Repeatable Publishing Rhythm:</strong> A predictable cadence that respects reader time and attention.
          </li>
        </ul>

        <h2>The Long View</h2>
        <p>
          Writing is thinking on paper. When you commit to clarifying your ideas in writing, you don&apos;t just produce marketing assets &mdash;
          you refine your product, sharpen your positioning, and attract clients who already believe in how you work before you ever jump on a call.
        </p>
      </div>

      {/* Related Content & Next Article */}
      <footer style={{ maxWidth: '800px', margin: '40px auto 120px', padding: '0 var(--gutter)' }}>
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              cursor: 'pointer',
            }}
          >
            &larr; Back to all essays
          </button>

          {nextArticle && (
            <div
              style={{
                textAlign: 'right',
                cursor: 'pointer',
                maxWidth: '380px',
              }}
              onClick={() => onSelectNext(nextArticle.id)}
              onMouseEnter={() => setCursor('read', 'NEXT →')}
              onMouseLeave={resetCursor}
            >
              <div style={{ fontFamily: 'var(--font-label)', fontSize: '10px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Next Essay &rarr;
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--primary)', lineHeight: 1.2 }}>
                {nextArticle.title}
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
