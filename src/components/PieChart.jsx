import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  const mapDataToChart = (data) => {
    const filteredData = data.filter((item) => item.label !== "Total");
    const asVezesIndex = filteredData.findIndex(
      (item) => item.label === "Às vezes"
    );
    const asVezesItem = filteredData.splice(asVezesIndex, 1)[0];
    filteredData.push(asVezesItem);
    const total = data.find((item) => item.label === "Total").quantidade;

    return filteredData.map((item) => ({
      id: item.label,
      label: item.label,
      value: (item.quantidade / total).toFixed(4),
    }));
  };

  return (
    <ResponsivePie
      data={mapDataToChart(data)}
      margin={{ top: 40, right: 20, bottom: 58, left: 20 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      valueFormat=" >-~%"
      colors={{ scheme: "pastel2" }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#000"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 15,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 160,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: "#000",
          symbolSize: 20,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export { PieChart };
