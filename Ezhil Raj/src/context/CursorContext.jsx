import React, { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  cursorState: 'default',
  cursorLabel: '',
  setCursor: () => {},
  resetCursor: () => {},
  preview: { visible: false, src: '', title: '', category: '' },
  showPreview: () => {},
  hidePreview: () => {},
});

export function CursorProvider({ children }) {
  const [cursorState, setCursorState] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [preview, setPreview] = useState({ visible: false, src: '', title: '', category: '' });

  const setCursor = useCallback((state, label = '') => {
    setCursorState(state);
    setCursorLabel(label);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState('default');
    setCursorLabel('');
  }, []);

  const showPreview = useCallback((src, title = '', category = '') => {
    if (!src) return;
    setPreview({ visible: true, src, title, category });
  }, []);

  const hidePreview = useCallback(() => {
    setPreview((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        cursorLabel,
        setCursor,
        resetCursor,
        preview,
        showPreview,
        hidePreview,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
