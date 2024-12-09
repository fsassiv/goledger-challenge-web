'use client';
import { useParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const DialogsContext = createContext({
  isUpdateDialogOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUpdateDialogOpen: () => {},
  closeDialogs: () => {},
  target: '',
  targetKey: '',
});

export const useDialogContext = () => useContext(DialogsContext);

export const DialogContextWrapper = ({ children }: { children: ReactNode }) => {
  const params = useParams();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [assetType, setAssetType] = useState<string>('');
  const [targetKey, setTargetKey] = useState<string>('');

  const setUpdateDialogOpen = () => {
    setIsUpdateDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsUpdateDialogOpen(false);
  };

  useEffect(() => {
    if (params?.key) {
      const key = (params?.key as string)?.replace('%3A', ':');
      const target = key.split(':')[0];
      setTargetKey(key);
      setAssetType(target);
      return;
    }
    setTargetKey('');
    setAssetType('');
  }, [params]);

  return (
    <DialogsContext.Provider
      value={{
        isUpdateDialogOpen,
        setUpdateDialogOpen,
        closeDialogs,
        target: assetType,
        targetKey,
      }}
    >
      {children}
    </DialogsContext.Provider>
  );
};
