
const setdata = (data, imgvid, pos) => {
    const allimage = document.getElementsByClassName("image_title");
    const image = document.getElementsByClassName("image_contenar");
    console.log(image[0]);
    console.log(allimage);




    data.map((value) => {

        const image_contenar = document.createElement("div")
        image_contenar.setAttribute("class", "image_contenar");


        if (imgvid == "img") {
            var img = document.createElement("a");
            img.setAttribute("href", `/${value.link}`);
            var anc = document.createElement("img");
            anc.setAttribute("src", `/${value.link}`);
            img.appendChild(anc);
            console.log(img);
        }
        if (imgvid == "vid") {
            if (value.type != "video/youtube") {
                var img = document.createElement("video")
                img.setAttribute("controls", true)
                var source = document.createElement("source");
                source.setAttribute("src", value.link);
                source.setAttribute("type", value.type)
                img.appendChild(source)
                img.style.width = "160px"
            }
            else if (value.type == "video/youtube") {
                var img = document.createElement("iframe")
                img.style.width = "160px"
                img.style.height = "160px"
                img.setAttribute("src", value.link);
            }


        }






        const h1 = document.createElement("h1")
        const ancer=document.createElement("a");
        ancer.setAttribute("href",`/${value.link}`);
        
        h1.textContent = value.title;
        ancer.appendChild(h1);
       const span=document.createElement("span");
       
        image_contenar.appendChild(img);
        image_contenar.appendChild(ancer);
        span.appendChild(image_contenar)
        console.log(image_contenar)
        allimage[pos].appendChild(span);


    })



}

const getimagedata = async () => {
    const res = await fetch("/image");
    const data = await res.json();

    setdata(data, "img", 0);
    setdata(data, "img", 1);
}
getimagedata();
const getvideodata = async () => {
    const res = await fetch("/video");
    const data = await res.json();
    setdata(data, "vid", 2);

}
getvideodata();

const getyoutubedata = async () => {
    const res = await fetch("/youtubelink");
    const data = await res.json();

    setdata(data, "vid", 3);
}
getyoutubedata();

