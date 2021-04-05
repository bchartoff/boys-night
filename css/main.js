d3.select("body").on("click", function(){
    var w = window.innerWidth
    console.log(w)
    d3.select("#bgContainer")
        .style("background-size", w*4 + "px")
})