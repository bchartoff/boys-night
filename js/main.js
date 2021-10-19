// 3360 × 1381
var imgW = 3360,
    imgH = 1381,
    tvH = 388,
    tvImgW = 2691,
    tvImgH = 1622,
    rotateCount = 0,
    volRotateCount = 0;

var directors;

function getQueryString(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


function setBgPos(){
    var screenW = window.innerWidth,
        screenH = window.innerHeight

    var fullBgW, fullBgH
    if(imgW/imgH < screenW/screenH){
        fullBgW = screenW
        fullBgH = imgH*screenW/imgW
        d3.select("#bgContainer")
            .style("background-size", (screenW) + "px")
            .style("background-position", (screenW - imgW*screenW/imgW)*0.5 + "px " + 0 + "px")
    }else{
        
        fullBgW = imgW*screenH/imgH
        fullBgH = screenH
        d3.select("#bgContainer")
            .style("background-size", (screenH * imgW/imgH) + "px")
            .style("background-position", (screenW - imgW*(screenH * imgW/imgH)/imgW)*0.5 + "px " + 0 + "px")
    }

    var fullW, fullH;
    if(tvImgW/tvImgH < screenW/screenH){
        fullW = screenW
        fullH = tvImgH*screenW/tvImgW


    }else{
        fullW = tvImgW*screenH/tvImgH
        fullH = screenH
    }

    // var fullW = +d3.select('#bgContainer').style("background-size").replace("px","")



    d3.select("#mainText")
        .style("left", (fullW * 302/tvImgW) + "px")
        .style("width", (fullW * 1531/tvImgW) + "px")
        .style("margin-top", (fullH * 140/tvImgH) + "px")

// 2161
// 476

    d3.select("#knobsContainer")
        .style("transform-origin", (fullW * 2159/tvImgW) + "px " + (fullH * 475/tvImgH - .5*(fullH-screenH)) + "px")
    
    d3.select("#knobsContainerVol")
        .style("transform-origin", (fullW * 2489/tvImgW) + "px " + (fullH * 475/tvImgH - .5*(fullH-screenH)) + "px")

// 71

    var knobR = fullW*71/tvImgW

    var tvW = fullBgW*330/imgW
    var tvH = fullBgW*240/imgW

    d3.select("#knobRing")
        .style("width", knobR*2 + "px")
        .style("height", knobR*2 + "px")
        .style("left", ((fullW * 2159/tvImgW) - knobR) + "px")
        .style("top", ((fullH * 475/tvImgH) - knobR - .5*(fullH-screenH)) + "px")
        .on("click", function(event){
            event.preventDefault();
            rotateCount += 1
            d3.select("#knobsContainer").style("transform", "rotate(" + rotateCount*20 + "deg)")
            updateMovies(rotateCount)
            
        })
        .on("contextmenu", function (event) {
            event.preventDefault();
            rotateCount -= 1
            d3.select("#knobsContainer").style("transform", "rotate(" + rotateCount*20 + "deg)")
            updateMovies(rotateCount)
        });

    d3.select("#knobRingVol")
        .style("width", knobR*2 + "px")
        .style("height", knobR*2 + "px")
        .style("left", ((fullW * 2489/tvImgW) - knobR) + "px")
        .style("top", ((fullH * 475/tvImgH) - knobR - .5*(fullH-screenH)) + "px")
        .on("click", function(event){
            event.preventDefault();
            volRotateCount += 1
            d3.select("#knobsContainerVol").style("transform", "rotate(" + volRotateCount*20 + "deg)")
            updateMovies(0, true)
            
        })
        .on("contextmenu", function (event) {
            event.preventDefault();
            volRotateCount -= 1;
            d3.select("#knobsContainerVol").style("transform", "rotate(" + volRotateCount*20 + "deg)")
            updateMovies(0, true)
            // updateMovies(rotateCount)
        });


    d3.select("#tvBox")
        .style("width", tvW + "px")
        .style("height", tvH + "px")
        .style("left", ((fullBgW * 2108/imgW) - tvW - (fullBgW-screenW)*.5) + "px")
        .style("top", ((fullBgH * 768/imgH) - tvH) + "px")
        .on("click", function(){
            zoomIn(1)
        })







}


setBgPos()
d3.select(window).on('resize', setBgPos)


function zoomIn(scalar){
    d3.select("#knobRing").style("display","block")
    d3.select("#knobRingVol").style("display","block")
    d3.select("#tvBox").style("display","none")

    var screenW = window.innerWidth,
        screenH = window.innerHeight  

    var newSize = (screenH * imgW/tvH)
    
    var dx = (newSize/imgW) * 1740,
        dy = (newSize/imgW) * 500

    d3.select("#bgContainer")
        .transition()
        .ease(d3.easeLinear)
        .duration(3000 * scalar)
            .style("background-size", (newSize) + "px")
            .style("background-position", -1*dx + "px " + -1*dy + "px")
            .on("start", function(){
                d3.select("#bgContainer")
                    .transition()
                    .ease(d3.easeLinear)
                    .delay(1000 * scalar)
                    .duration(2000 * scalar)
                        .style("opacity",0)
                        .style("background-size", (newSize) + "px")
                        .style("background-position", -1*dx + "px " + -1*dy + "px")
            })

    d3.selectAll(".tvContainer")
        .transition()
        .delay(0 * scalar)
        .duration(3000 * scalar)
            .style("opacity",1)
}


function pickRando(){
    d3.select("#motherBox").style('display', 'block')
    var n = d3.selectAll(".randContainer").nodes().length
    var r = getRandomIntInclusive(0, n)
    var el = d3.select(".randContainer")
    var h = el.node().getBoundingClientRect().height
    console.log(n, h, r)
    el.transition()
        .duration(2000)
        .style("margin-top", (-1*r*h) + "px")    
}
function updateMovies(i, rando=false){
    if(rando){
        if(d3.select("#creditsTitle").html() == "Let's randomly pick a movie to watch:"){
            // var allShould = d3.selectAll(".movieContainer:not(.watched)").nodes()
            // var should = allShould[Math.floor(Math.random() * allShould.length)];
            // d3.selectAll(".movieContainer").style("display", "none")
            // d3.select(should).style("display","block")
            pickRando()

        }
        return false
    }
    var channels = ["should","have","randoShould"]
    channels = channels.concat(directors.filter(function(d){ return d != null } ))

    var channel = (i<0) ? channels[channels.length - i%channels.length ] : channels[ i%channels.length ]
    window.scrollTo(0,0);
    d3.selectAll(".movieContainer").style("display", "none")
    var creditsTitle = ""

    d3.select("#motherBox").style('display', 'none')
    if(channel == "should"){
        creditsTitle = "We Should Watch:"
        d3.selectAll(".movieContainer:not(.watched)").style("display","block")
    }
    else if(channel == "have"){
        creditsTitle = "We Already Watched:"
        d3.selectAll(".movieContainer.watched").style("display","block")
    }
    else if(channel == "randoShould"){
        console.log("foo")
        creditsTitle = "Let's randomly pick a movie to watch:"
        pickRando()
        // var allShould = d3.selectAll(".movieContainer:not(.watched)").nodes()
        // var should = allShould[Math.floor(Math.random() * allShould.length)];
        // d3.select(should).style("display","block")
        // console.log(allShould, should.innerHTML)
        // d3.select("#motherBox").style('display', 'block')
        // var n = d3.selectAll(".randContainer").nodes().length
        // var r = getRandomIntInclusive(0, n)
        // var el = d3.select(".randContainer")
        // var h = el.node().getBoundingClientRect().height
        // console.log(n, h, r)
        // el.transition()
        //     .duration(2000)
        //     .style("margin-top", (-1*r*h) + "px")

    }
    else if(channel[0] == "director"){
        creditsTitle = "We love movies by " + channel[1]
        d3.selectAll(".movieContainer[data-director=\"" + channel[1] + "\"]").style("display","block")

    }
    d3.select("#creditsTitle").html(creditsTitle)
}



var data_id = "1cpk9K-N6u67SVIYO5aE8oE_EGtLdHkILZHfsNmmfIG0",
    sheet_id = "0"

Papa.parse('https://docs.google.com/spreadsheets/d/' + data_id + '/pub?output=csv&gid=' + sheet_id, {
            download: true,
            header: true,
            complete: function(results) {
                var d = results.data
                buildSite(d)
              }
            })

function buildSite(data) {
    // JSON result in `data` variable
    // var cells = allData.feed.entry,
    //     headers = cells.filter(function(c){ return c.gs$cell.row == "1" }),
    //     gdata = cells.filter(function(c){ return c.gs$cell.row != "1" })

    // var data = [],
    //     colMap = {},
    //     rowData = {}

    // for(var i = 0; i < headers.length; i++){
    //   var h = headers[i]

    //   colMap[h.gs$cell.col] = h.gs$cell.$t
    // }


    // for(var i = 0; i < gdata.length; i++){
    //   var c = gdata[i]
    //   var row = c.gs$cell.row,
    //       col = c.gs$cell.col,
    //       val = c.gs$cell.$t


    //   if(!rowData.hasOwnProperty(row)){
    //     rowData[row] = {}
    //   }
    //   rowData[row][colMap[col]] = val
    // }


    // for (const rowNum in rowData) {
    //   if (rowData.hasOwnProperty(rowNum)) {
    //     var rowObj = rowData[rowNum]
    //   data.push(rowObj)

    //   }
    // }

    d3.select("#mainText")
        .append("div")
        .attr("id", "creditsTitle")
        .html("We Should Watch:")

    var movie = d3.select("#mainText")
        .selectAll(".movieContainer")
        .data(data)
        .enter()
        .append("div")
        .attr("class", function(d){
            var watched = d["Watched on"] != "" ? " watched" : "",
                pod = d["On the pod?"] != "" ? " pod" : ""
            return 'movieContainer' + watched + pod;
        })
        .attr("data-director", function(d){
            return d['Director']
        })

    var checkBox = movie.append("div")
        .attr("class", "blankIt")
    
    checkBox.append("img")
        .attr("src","img/thankIt.png")
        .style("opacity", function(d){
            console.log(d, d["On the pod?"])
            return d["On the pod?"] != "" ? 1 : 0;
        })
    checkBox.append("img")
        .attr("src","img/checkie.png")
        .style("opacity", function(d){
            return d["Watched on"] != "" ? 1 : 0;
        })        
    movie.append("div")
        .attr("class", "name")
        .html(function(d){
            return d["Movie name"] + " (" + d["Year"] + ")"
        })

    movie.append("div")
        .attr("class", "watchedOn")
        .html(function(d){
            return (d["Watched on"] != "") ? "The boys watched this picture on " + d['Watched on'] : ""
        })


    var rando = d3.select("#mainText")
        .append("div")
        .attr("id", "motherBox")
        .style("display","none")
        .selectAll(".randContainer")
        .data(data.filter(function(o){ return o["Watched on"] == ""}))
        .enter()
        .append("div")
        .attr("class", function(d){
            var watched = d['Watched on'] != '' ? " watched" : "",
                pod = d["On the pod?"] != "" ? " pod" : ""
            return 'randContainer' + watched + pod;
        })
        .attr("data-director", function(d){
            return d['Director']
        })

    var checkBoxRando = rando.append("div")
        .attr("class", "blankIt")
    
    checkBoxRando.append("img")
        .attr("src","img/thankIt.png")
        .style("opacity", function(d){
            return d["On the pod?"] != "" ? 1 : 0;
        })
       
    rando.append("div")
        .attr("class", "name")
        .html(function(d){
            return d["Movie name"] + " (" + d["Year"] + ")"
        })


    directorsRaw = data.map(function(d){
        return(d["Director"] != "") ? ["director", d["Director"]] : null
    })


    let set  = new Set(directorsRaw.map(JSON.stringify));
    directors = Array.from(set).map(JSON.parse);

    updateMovies(0)

}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
if(getQueryString("skip") != ""){
    zoomIn(0)
}