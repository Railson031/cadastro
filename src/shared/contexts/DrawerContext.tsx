import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
interface IDrawerOption {
  icon: string;
  label: string;
  path: string;
}
interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawrContextProps {
  children: ReactNode;
};

export const DrawerProvider: React.FC<IDrawrContextProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOper => !oldDrawerOper);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};