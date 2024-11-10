import React, { ReactNode } from 'react';

interface TLayoutProps {
  children: ReactNode;
}

export default function layout({ children }: TLayoutProps) {
  return <div>{children}</div>;
}
