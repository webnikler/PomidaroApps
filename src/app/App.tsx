import { useState } from 'react';
import { Chart } from '../shared/ui/Chart';
import Button from '../shared/ui/Button';

const defaultData = [
  { label: '15.09', value: 6 },
  { label: '16.09', value: 8 },
  { label: '17.09', value: 4 },
  { label: '18.09', value: 3 },
  { label: '19.09', value: 6 },
  { label: '20.09', value: 5 },
  { label: '21.09', value: 7 },
  { label: '22.09', value: 2 },
  { label: '23.09', value: 6 },
];

const App = () => {
  const [dataSet, setDataSet] = useState([defaultData, defaultData]);
  const [width, height] = [500, 200];
  const areaGradient = { 0: '#3F51B5', 100: '#C5CAE9' };
  const generateData = () =>
    defaultData.map((d) => ({ ...d, value: Math.floor(Math.random() * 10) }));

  return (
    <div className='flex'>
      <div className='m-4 flex flex-col gap-4'>
        {/* Chart start */}
        <Chart width={width} height={height} className='bg-indigo-50'>
          <Chart.Area fill={areaGradient[100]} data={dataSet[1]} />
          <Chart.Area data={dataSet[0]} gradient={areaGradient} />
          <Chart.Line data={dataSet[0]} stroke={areaGradient[0]} />
        </Chart>
        {/* Chart end */}
        <Button onClick={() => setDataSet([generateData(), generateData()])}>
          Generate data
        </Button>
      </div>
      <div className='m-4 flex gap-4'>
        <pre className='text-xs'>{JSON.stringify(dataSet[0], null, 2)}</pre>
        <pre className='text-xs'>{JSON.stringify(dataSet[1], null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
