// components/ui/Container.tsx
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`
      w-full mx-auto
      px-[var(--space-container-padding)]
      max-w-[var(--container-mobile-max)]
      md:px-[var(--space-l)]
      md:max-w-[var(--container-tablet-max)]
      lg:px-[var(--space-xl)]
      lg:max-w-[var(--container-desktop-max)]
      ${className}
    `}>
      {children}
    </div>
  );
}
