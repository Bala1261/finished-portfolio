import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function MetricsStrip() {
  const { metricsStrip } = portfolioData;
  const stripRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trigger count animation once on viewport entry
      ScrollTrigger.create({
        trigger: stripRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          metricsStrip.forEach((metric, index) => {
            const el = itemsRef.current[index];
            if (!el) return;

            const numEl = el.querySelector('.metric-num');
            const target = metric.value;
            const obj = { val: 0 };

            gsap.to(obj, {
              val: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                const currentVal = Math.round(obj.val);
                const display = metric.prefix
                  ? `${currentVal < 10 && metric.prefix ? '0' : ''}${currentVal}`
                  : `${currentVal}`;
                if (numEl) numEl.innerText = display;
              },
            });

            gsap.from(el, {
              opacity: 0,
              y: 20,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power2.out',
            });
          });
        },
      });
    }, stripRef);

    return () => ctx.revert();
  }, [metricsStrip]);

  return (
    <section ref={stripRef} className="py-10 md:py-12 bg-[#F7F9FC] border-b border-[rgba(16,24,40,0.06)]">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(16,24,40,0.08)]">
          {metricsStrip.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              className={`flex flex-col justify-center ${
                idx > 0 ? 'pt-6 sm:pt-0 sm:pl-8 lg:pl-10' : ''
              }`}
            >
              <div className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#101828] flex items-baseline gap-0.5">
                <span className="metric-num text-[#101828]">
                  {item.prefix}0
                </span>
                <span className="text-[#145BFF]">{item.suffix}</span>
              </div>
              <div className="font-heading font-bold text-base text-[#101828] mt-2">
                {item.label}
              </div>
              <p className="text-xs text-[#667085] mt-1 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
