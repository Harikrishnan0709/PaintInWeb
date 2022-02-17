var svg = document.getElementById("svg");
var svgNS = svg.namespaceURI;

var g = document.createElementNS(svgNS, "g");
var shape = document.createElementNS(svgNS, formtools.strokeshape.value);

svg.width = screen.width;
svg.height = screen.height;

function startShape(ev) {
    g = document.createElementNS(svgNS, "g");
    shape = document.createElementNS(svgNS, formtools.strokeshape.value);
    switch (formtools.strokeshape.value) {
        case "ellipse":
            shape.setAttribute("cx", ev.offsetX);
            shape.setAttribute("cy", ev.offsetY);
            break;
        case "rect":
            shape.setAttribute("x", ev.offsetX);
            shape.setAttribute("y", ev.offsetY);
            break;
        case "line":
            shape.setAttribute("x1", ev.offsetX);
            shape.setAttribute("y1", ev.offsetY);
            break;
    }
}
function endShape(ev) {
    g.appendChild(shape);
    svg.appendChild(g);
}
function drawData(ev) {
    if (ev.buttons != 0) {
        switch (formtools.strokeshape.value) {
            case "ellipse":
                var cx = parseInt(shape.getAttribute("cx"));
                var cy = parseInt(shape.getAttribute("cy"));
                var rx = (ev.offsetX) - cx;
                var ry = (ev.offsetY) - cy;
                shape.setAttribute("rx", rx);
                shape.setAttribute("ry", ry);
                break;
            case "rect":
                var x = parseInt(shape.getAttribute("x"));
                var y = parseInt(shape.getAttribute("y"));
                var width = ev.offsetX;
                var height = ev.offsetY;
                shape.setAttribute("width", (width - x));
                shape.setAttribute("height", (height - y));
                break;
            case "line":
                var x = parseInt(shape.getAttribute("x1"));
                var y = parseInt(shape.getAttribute("y1"));
                var x2 = ev.offsetX;
                var y2 = ev.offsetY;
                shape.setAttribute("x2", x2);
                shape.setAttribute("y2", y2);
                break;
        }
        with (shape) {
            setAttribute("stroke-linecap", "round");
            setAttribute("stroke-width", formtools.strokeWidth.value);
            setAttribute("stroke-opacity", formtools.strokeopacity.value);
            setAttribute("stroke", (formtools.strokeFlag.checked) ? formtools.strokecolor.value : "none");
            setAttribute("fill-opacity", formtools.fillopacity.value);
            setAttribute("fill", (formtools.fillFlag.checked) ? formtools.fillcolor.value : "none");
        }
        g.appendChild(shape);
        svg.appendChild(g);
    }
}
function newDocument() {
    if (svg.innerHTML == "")
        return;
    else
        if (confirm("Are You Sure?")) {
            svg.innerHTML = "";
        }
}