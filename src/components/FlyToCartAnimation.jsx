"use client";

import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const FlyToCartContext = createContext(undefined);

export const FlyToCartProvider = ({ children }) => {
    const [flyingItems, setFlyingItems] = useState([]);

    const triggerFlyToCart = useCallback((imageUrl, startPosition) => {
        const id = Date.now() + Math.random();

        // Get cart icon position (usually top right of page)
        const cartIcon = document.querySelector('[data-cart-icon]');
        let endPosition = { x: window.innerWidth - 60, y: 20 }; // fallback

        if (cartIcon) {
            const rect = cartIcon.getBoundingClientRect();
            endPosition = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }

        const newItem = {
            id,
            imageUrl,
            startX: startPosition.x,
            startY: startPosition.y,
            endX: endPosition.x,
            endY: endPosition.y,
        };

        setFlyingItems(prev => [...prev, newItem]);

        // Remove after animation completes
        setTimeout(() => {
            setFlyingItems(prev => prev.filter(item => item.id !== id));
        }, 800);
    }, []);

    return (
        <FlyToCartContext.Provider value={{ triggerFlyToCart }}>
            {children}
            <FlyingItemsRenderer items={flyingItems} />
        </FlyToCartContext.Provider>
    );
};

const FlyingItemsRenderer = ({ items }) => {
    if (typeof window === 'undefined') return null;

    return createPortal(
        <>
            {items.map(item => (
                <FlyingItem key={item.id} {...item} />
            ))}
        </>,
        document.body
    );
};

const FlyingItem = ({ imageUrl, startX, startY, endX, endY }) => {
    return (
        <div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: startX,
                top: startY,
                animation: 'flyToCart 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                '--end-x': `${endX - startX}px`,
                '--end-y': `${endY - startY}px`,
            }}
        >
            <div
                className="w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-orange-500"
                style={{
                    animation: 'shrinkAndFade 0.7s ease-out forwards',
                }}
            >
                <img
                    src={imageUrl}
                    alt="Flying item"
                    className="w-full h-full object-cover"
                />
            </div>
            <style jsx global>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.3 - 50px)) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes shrinkAndFade {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

export const useFlyToCart = () => {
    const context = useContext(FlyToCartContext);
    if (context === undefined) {
        // Return a no-op function if context is not available
        return { triggerFlyToCart: () => { } };
    }
    return context;
};
