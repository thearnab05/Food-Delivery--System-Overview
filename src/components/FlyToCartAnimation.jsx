"use client";

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FlyToCartContext = createContext(undefined);

// Inject global styles once
const injectStyles = () => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('fly-to-cart-styles')) return;

    const style = document.createElement('style');
    style.id = 'fly-to-cart-styles';
    style.textContent = `
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
    @keyframes flyRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(style);
};

export const FlyToCartProvider = ({ children }) => {
    const [flyingItems, setFlyingItems] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        injectStyles();
    }, []);

    const triggerFlyToCart = useCallback((imageUrl, startPosition) => {
        if (typeof window === 'undefined') return;

        const id = Date.now() + Math.random();

        // Get cart icon position
        const cartIcon = document.querySelector('[data-cart-icon]');
        let endPosition = { x: window.innerWidth - 60, y: 20 };

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

        setTimeout(() => {
            setFlyingItems(prev => prev.filter(item => item.id !== id));
        }, 800);
    }, []);

    return (
        <FlyToCartContext.Provider value={{ triggerFlyToCart }}>
            {children}
            {mounted && <FlyingItemsRenderer items={flyingItems} />}
        </FlyToCartContext.Provider>
    );
};

const FlyingItemsRenderer = ({ items }) => {
    if (items.length === 0) return null;

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
            style={{
                position: 'fixed',
                left: startX,
                top: startY,
                pointerEvents: 'none',
                zIndex: 9999,
                animation: 'flyToCart 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                '--end-x': `${endX - startX}px`,
                '--end-y': `${endY - startY}px`,
            }}
        >
            <div
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                    border: '3px solid #f97316',
                    animation: 'flyRotate 0.7s ease-out forwards',
                }}
            >
                <img
                    src={imageUrl}
                    alt="Flying item"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export const useFlyToCart = () => {
    const context = useContext(FlyToCartContext);
    if (context === undefined) {
        return { triggerFlyToCart: () => { } };
    }
    return context;
};
