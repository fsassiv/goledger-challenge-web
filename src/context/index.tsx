import { ReactNode } from 'react';
import { DialogContextWrapper } from './dialogs';

export const ContextWrapper = ({ children }: { children: ReactNode }) => {
  return <DialogContextWrapper>{children}</DialogContextWrapper>;
};
