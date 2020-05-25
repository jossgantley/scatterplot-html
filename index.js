var w= 0.9 * window.innerWidth;
        var h= 0.6 * window.innerHeight;
        const padding= 80;
        const svg = d3.select("#app")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("background-color", "#eee")

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10 )
        .attr("x",0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Time taken to climb Alpe d'Huez (minutes)");     

        svg.append("text")
        .attr("transform", "translate("+w/2+","+(h -50) + ")")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Year"); 

        const legend = svg.append("g")
        .attr("id", "legend")
        .attr("transform", "translate("+w/1.75+","+(h/4 ) + ")")
        
        legend.append("rect")
        .attr("width", "1em")
        .attr("height", "1em")
        .attr("transform", "translate(-"+ 20+",-"+(h/35 ) + ")")
        .attr("fill", "lightblue")
        .attr("stroke", "darkslategrey")

        legend.append("text")
        .text("cyclists with doping allegations")

        legend.append("rect")
        .attr("width", "1em")
        .attr("height", "1em")
        .attr("transform", "translate(-"+ 20+","+(h/50 ) + ")")
        .attr("fill", "maroon")
        .attr("stroke", "darkslategrey")

        legend.append("text")
        .text("cyclists without doping allegations")
        .attr("transform", "translate(0,"+(h/20) + ")")
        
        
                
     
      
      

window.onload = ()=>{
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
       

      

        const newData = data.map(item=>{
            
            return {...item, Parsed: d3.timeParse("%M:%S")(item.Time)}
        })
        console.log([d3.extent(newData, d=>d.Parsed)])

     
        
      
        const xScale = d3.scaleLinear()
            .domain([d3.min(newData, d=>d.Year -1 ), d3.max(newData, d=>d.Year + 1)])
            .range([padding, w-padding]);
            
       

        const yScale = d3.scaleTime()
        .domain([d3.max(newData, d=>d.Parsed), d3.min(newData, d=>d.Parsed)])
        .range([h-padding, padding ])
        
        const scaleTimes = d3.scaleTime()
        .domain(d3.extent(newData, d=>d.Parsed))
        .range([h-padding, padding])
        
        console.log(d3.extent(newData, d=>d.Parsed))
        console.log([d3.min(newData, d=>d.Year),d3.max(newData, d=>d.Year)])
 
            

        const tooltip= d3.select("body")
            
            
            .append("div")
       
            .attr("id", "tooltip")
           
            .style("opacity", "0")
                       

        svg.selectAll(".dot")
            .data(newData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", (d,i)=> xScale(d.Year))
            .attr("cy", d => yScale(d.Parsed))
            .attr("r", 10)
         
            .attr("data-xvalue", d=>d.Year)
            .attr("data-yvalue", d=>d.Parsed)
            .attr("fill", d=>d.Doping? "lightblue": "maroon")
            .attr("stroke", "darkslategrey")
            .on("mousemove", (d)=>{
                tooltip
                    .style("opacity", "0.9")
                    
                    .html(`Name: ${d.Name} <br> 
                            Nationality: ${d.Nationality} <br>
                            Time: ${d.Time} <br>
                            ${d.Doping? "Doping: "+ d.Doping : "" }`)
                    .attr("data-year", d.Year)
                    .style("top", d3.event.pageY - 100 + "px")
                    .style("left", d3.event.pageX  -50 + "px")
               })
                    
                    
            .on("mouseleave", ()=>tooltip.style("opacity", "0"))
        

            
          

            
            
           
       
        
        
        const xAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format("d"))
        const yAxis = d3.axisLeft(yScale)
                                   
                        .tickFormat(d3.timeFormat("%M:%S"))

        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0," + (h-padding) + ")")
            
            .call(xAxis)
            

        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)
         
           
        
        
    
        })
    .catch(()=>{
        console.log("Error")
    })
    }
            
window.onresize = ()=>{
    h= 0.6 * window.innerHeight
    w= 0.8 * window.innerWidth
}
            
    



