import React, { useState } from 'react';

function History() {
  const [historyItem, setHistoryItem] = useState(
    localStorage.getItem(historyItem) || null
  );

  return <></>;
}
