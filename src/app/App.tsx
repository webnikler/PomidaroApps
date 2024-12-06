import { useState } from 'react';
import { Chart } from '../shared/ui/Chart';
import Button from '../shared/ui/Button';

const data = [
  { label: '19.09', value: 6 },
  { label: '20.09', value: 5 },
  { label: '21.09', value: 7 },
  { label: '22.09', value: 2 },
  { label: '23.09', value: 6 },
  { label: '24.09', value: 6 },
  { label: '25.09', value: 5 },
  { label: '26.09', value: 7 },
  { label: '27.09', value: 2 },
  { label: '28.09', value: 6 },
];

const values = data.map((d) => d.value);
const labels = data.map((d) => d.label);

const App = () => {
  const [dataset, setDataset] = useState([values, values]);
  const [width, height] = [500, 200];
  const areaGradient = { 0: '#3F51B5', 100: '#C5CAE9' };
  const generateData = () => values.map(() => Math.floor(Math.random() * 10));

  return (
    <div className='flex'>
      <div className='m-4 flex flex-col gap-4'>
        {/* Chart start */}
        <Chart width={width} height={height} className='bg-indigo-50'>
          <Chart.Area
            fill={areaGradient[100]}
            labels={labels}
            values={dataset[1]}
          />
          <Chart.Area
            labels={labels}
            values={dataset[0]}
            gradient={areaGradient}
          />
          <Chart.Line
            labels={labels}
            values={dataset[0]}
            stroke={areaGradient[0]}
          />
          <Chart.Axis labels={labels} />
        </Chart>
        {/* Chart end */}
        <Button onClick={() => setDataset([generateData(), generateData()])}>
          Generate data
        </Button>
      </div>
      <div className='m-4 flex gap-4'>
        <pre className='text-xs'>{JSON.stringify(labels, null, 2)}</pre>
        <pre className='text-xs'>{JSON.stringify(dataset[0], null, 2)}</pre>
        <pre className='text-xs'>{JSON.stringify(dataset[1], null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
