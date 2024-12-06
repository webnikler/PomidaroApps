import * as d3 from 'd3';

export const Axis = ({ labels }: { labels: string[] }) => {
  const width = 500;
  const height = 200;
  const xScale = d3.scalePoint().domain(labels).range([0, width]).padding(1);

  return (
    <g transform={`translate(${0}, ${height - 30})`}>
      {labels.map((day) => (
        <g key={day} transform={`translate(${xScale(day)}, 0)`}>
          <line y2='6' stroke='currentColor' />
          <text
            y='12'
            textAnchor='middle'
            fontSize='12'
            fill='currentColor'
            dy='0.71em'
          >
            {day}
          </text>
        </g>
      ))}
      <line x1={0} x2={width} stroke='currentColor' />
    </g>
  );
};
