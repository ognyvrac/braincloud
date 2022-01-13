import { useEffect } from "react";
import * as d3 from "d3";
import { IdeaType, PlotData } from "../../model/AppTypes";

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
  useEffect(() => {
    async function getCriteria() {
      const response = await fetch("http://127.0.0.1:8000/api/sessions", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      let criteria1 = ""
      let criteria2 = ""

      await response.json().then((session: any) => {
        criteria1 = session.criteria1
        criteria2 = session.criteria2
      });

      const responseIdeas = await fetch(
        "http://127.0.0.1:8000/api/ideas/votes_first",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );

      let functionIdeas: IdeaType[] = [];

      await responseIdeas.json().then((ideasJson: any[]) => {
        ideasJson.forEach((idea: any) => {
          functionIdeas.push({
            id: idea.id,
            content: idea.content,
            votes: idea.votes_first,
            criteria1: idea.criteria1,
            criteria2: idea.criteria2
          });
        });
      });

      draw(criteria1, criteria2, functionIdeas);
    }
    getCriteria();
  }, []);

  const handleUndefined = (number: number | undefined) => {
    if (number === undefined) {
      return 0;
    }
    return number;
  };

  const draw = (criteria1: string, criteria2: string, data: IdeaType[]) => {
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
        return x(handleUndefined(d.criteria1));
      })
      .attr("cy", (d) => {
        return y(handleUndefined(d.criteria2));
      })
      .attr("r", 5)
      .style("fill", props.fill)
      .append("text");

    // Add labels
    dots
      .append("text")
      .style("font-size", "15px")
      .text((d) => {
        return d.content;
      })
      .attr("x", (d) => {
        return x(handleUndefined(d.criteria1) + 0.03);
      })
      .attr("y", (d) => {
        return y(handleUndefined(d.criteria2) + 0.03);
      });
  };
  return <div className="basicScatterChart" />;
};
