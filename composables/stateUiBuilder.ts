export const useStateUiBuilder = () => {
  const toogleRight = useState('toogleRight', () => true);
  const toogleLeft = useState('toogleLeft', () => false);
  const display = useState('display', () => 'xs');
  const isPreview = useState('isPreview', () => false);
  const isFit = useState('isFit', () => false);

  const setDisplay = (size: string) => {
    display.value = size;
  };

  const openPreview = () => {
    toogleLeft.value = false;
    toogleRight.value = false;
    isPreview.value = true;
  };

  const closePreview = () => {
    isPreview.value = false;
    setDisplay('xs');
  };

  return {
    toogleLeft,
    toogleRight,
    display,
    isPreview,
    isFit,
    openPreview,
    closePreview,
    setDisplay,
  };
};
