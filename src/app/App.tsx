import { useState } from 'react';
import Button from '../shared/ui/Button';
import { IconOpenInNew } from '../shared/ui/Icon';

const App = () => {
  const [disabled, setDisabled] = useState(false);

  return (
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
    </div>
  );
};

export default App;
