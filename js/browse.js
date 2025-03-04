function fillter_reset() {
    let all_Fillter_child = document.querySelectorAll(".fillter_item_child")

    all_Fillter_child.forEach(element => {
        element.style.display = "none";
    });
}

document.addEventListener('DOMContentLoaded',() => {

    const fillter_select = document.querySelectorAll(".fillter_select");
    fillter_select.forEach(element => {

        const createArrow = document.createElement("span")

        element.addEventListener("click", ()=>{
            
            if (element.className == "fillter_select") {
                //바탕 색 추가
                element.classList.add("fillter_select_event");

                //화살표 생성
                let newElement = element.appendChild(createArrow);
                newElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="svg fillter_select_arrow" viewBox="0 0 10 8"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-320.000000, -202.000000)" stroke="currentColor" stroke-width="2"><polyline points="321 205.569101 323.596499 208 329 203"></polyline></g></g></svg>`;
            }else
            {
                element.removeChild(createArrow)
                element.classList.remove("fillter_select_event");
            }
        });
    });

    //필터 오브젝트 이벤트 적용
    const child = document.querySelectorAll(".fillter_item")
    child.forEach(element => {

        const fillter_btn = element.querySelector(".fillter_btn");
        const fillter_item_child =  element.querySelector(".fillter_item_child");
        const arrow =  element.querySelector(".arrow");

        fillter_item_child.classList.add("hide_menu");

        fillter_btn.addEventListener("click",() =>{
           
            //조건 점검해야함...
            if (fillter_item_child.classList.length == 1) {
                fillter_item_child.classList.add("hide_menu")
                arrow.innerHTML = `<path d="M19.53 8.97a.75.75 0 0 1 0 1.06L12 17.56l-7.53-7.53a.75.75 0 1 1 1.06-1.06L12 15.44l6.47-6.47a.75.75 0 0 1 1.06 0" 
                                clip-rule="evenodd" fill-rule="evenodd">

                                </path>`;
            }else{
                fillter_item_child.classList.remove("hide_menu")
                arrow.innerHTML = `<path d="m12 6.44 7.53 7.53a.75.75 0 1 1-1.06 1.06L12 8.562l-6.47 6.47a.75.75 0 0 1-1.06-1.06z" 
                                clip-rule="evenodd" fill-rule="evenodd">

                                </path>`;
            }
              
        });

        

    });

    


    // document.getElementById("section_fillter_btn").addEventListener("click",(element) =>{
    //     console.log(element)
        


    // });
    





});