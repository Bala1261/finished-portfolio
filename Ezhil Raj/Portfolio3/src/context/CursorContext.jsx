import { createContext, useContext, useState, useCallback } from 'react';

export const CURSOR_STATES = {
  DEFAULT: 'default',
  LINK:    'link',
  VIEW:    'view',
  EMAIL:   'email',
  DRAG:    'drag',
  PLAY:    'play',
  ABOUT:   'about',
};

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [cursorState, setCursorState] = useState(CURSOR_STATES.DEFAULT);
  const [previewImage, setPreviewImage] = useState(null);

  const setCursor = useCallback((state) => {
    setCursorState(state);
  }, []);

  const showPreview = useCallback((imgSrc) => {
    setPreviewImage(imgSrc);
  }, []);

  const hidePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorState, setCursor, previewImage, showPreview, hidePreview }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
