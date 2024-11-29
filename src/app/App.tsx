import { useState } from 'react';
import Button from '../shared/ui/Button';
import { IconOpenInNew } from '../shared/ui/Icon';
import { CircularProgress } from '../shared/ui/CircularProgress';

const App = () => {
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(50);

  return (
    <>
      <div className='m-4 flex gap-4'>
        <Button disabled={disabled} onClick={() => setDisabled(true)}>
          <IconOpenInNew />
          <span>Подробнее</span>
        </Button>
        <Button fullwidth>
          <span>Подробнее</span>
        </Button>
        <Button size='sm'>
          <IconOpenInNew />
          <span>Подробнее</span>
        </Button>

        <Button shape='circle'>
          <IconOpenInNew />
        </Button>
        <Button size='sm' shape='circle'>
          <IconOpenInNew />
        </Button>
        <Button shape='circle' onClick={() => setProgress((p) => p + 10)}>
          +
        </Button>
        <Button shape='circle' onClick={() => setProgress((p) => p - 10)}>
          -
        </Button>
      </div>
      <div className='m-4 flex gap-4'>
        <CircularProgress size={160} strokeWidth={12} progress={progress}>
          <span>Progress is {progress}</span>
        </CircularProgress>
        <CircularProgress progress={progress} />
        <CircularProgress frontLineClass='stroke-red-700' progress={progress} />
        <CircularProgress frontLineColor='green' progress={progress} />
      </div>
    </>
  );
};

export default App;
