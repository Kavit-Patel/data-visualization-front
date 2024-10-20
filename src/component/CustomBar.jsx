const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill} // Use the fill prop to customize color
    />
  );
};

export default CustomBar;
