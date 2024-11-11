import React, { ReactNode } from 'react';

interface TContainerProps {
  children: ReactNode;
}

export default function Container({ children }: TContainerProps) {
  return <div className="w-full mx-2">{children}</div>;
}
