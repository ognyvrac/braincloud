import React, { useEffect } from "react";
import * as d3 from "d3";
import { PlotData } from "../../model/AppTypes";

interface IScatterPlotProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  fill: string;
}

export const ScatterPlot = (props: IScatterPlotProps) => {
  let data: PlotData[] = [
    { idea: "Hire UX designer", criteriax: 4, criteriay: 2 },
    { idea: "Fire boss", criteriax: 1, criteriay: 1 },
    { idea: "Lorem", criteriax: 1, criteriay: 5 },
  ];
  let criteria1 = "Innovation";
  let criteria2 = "Fun";

  useEffect(() => {
    draw();
  });

  const draw = () => {
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;

    const svg = d3
      .select(".basicScatterChart")
      .append("svg")
      .attr("width", width + props.left + props.right)
      .attr("height", height + props.top + props.bottom)
      .append("g")
      .attr("transform", `translate(${props.left},${props.top})`);

    const x = d3.scaleLinear().domain([0, 5]).range([0, width]);
    const xTicks = d3
      .scaleLinear()
      .domain([0, 5])
      .range([0, width])
      .ticks()
      .filter(Number.isInteger);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(xTicks).tickFormat(d3.format("d")));

    const y = d3.scaleLinear().domain([0, 5]).range([height, 0]);
    const yTicks = d3
      .scaleLinear()
      .domain([0, 5])
      .range([height, 0])
      .ticks()
      .filter((tick) => Number.isInteger(tick));
    svg
      .append("g")
      .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(d3.format("d")));

    // Add X axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + props.left)
      .attr("y", height + props.top + 20)
      .text(criteria1);

    // Y axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -props.left + 20)
      .attr("x", -props.top - height / 2 + 20)
      .text(criteria2);

    let dots = svg.append("g").selectAll("dot").data(data).enter();

    // Add dots
    dots
      .append("circle")
      .attr("cx", (d) => {
        return x(d.criteriax);
      })
      .attr("cy", (d) => {
        return y(d.criteriay);
      })
      .attr("r", 5)
      .style("fill", props.fill)
      .append("text");

    // Add labels
    dots
      .append("text")
      .style("font-size", "15px")
      .text((d) => {
        return d.idea;
      })
      .attr("x", (d) => {
        return x(d.criteriax + 0.03);
      })
      .attr("y", (d) => {
        return y(d.criteriay + 0.03);
      });
  };
  return <div className="basicScatterChart" />;
};
