
let select_Fillter_array = new Array();

function showHideContent(browse_items = new Array) {

    if(select_Fillter_array.length == 0){
        browse_items.forEach(item => {
            item.classList.remove("hide_menu")
            item.classList.add("show_menu")
        });

        return;
    }

    
    browse_items.forEach(item => {
        let check = 0;
        //게임 장르 추출
        const Genres = item.querySelector(".browse-item-Genres").innerText;
        const Genres_spl = Genres.split(",");

        //등록된 장르와 필터에 선택된 장르가 하나라도 같으면 check = 1
        for (let i = 0; i < Genres_spl.length; i++) {
            const e = Genres_spl[i];
            for (let j = 0; j < select_Fillter_array.length; j++) {
                const e2 = String(select_Fillter_array[j]);

                
                if (e == e2) {
                    
                    check = 1;
                    break;
                }                            
            }

            
        }

            if (check == 1) {
                item.classList.remove("hide_menu")
                item.classList.add("show_menu")
                
            }
            else{
                item.classList.remove("show_menu")
                item.classList.add("hide_menu")
            }
            
    });
                
}


document.addEventListener('DOMContentLoaded',() => {


    const browse_items = document.querySelectorAll(".browse-item");
    const resetEvent = document.getElementById("fillter_reset_btn");    
    const fillter_select = document.querySelectorAll(".fillter_select");
    let count = 0;


    //선택된 필터에 화살표 추가 이벤트
    fillter_select.forEach(element => {

        const createArrow = document.createElement("span")

        element.addEventListener("click", ()=>{
            

            const fillter_property = element.querySelector(".fillter_property").innerText;


            if (element.className == "fillter_select") {
                //바탕 색 추가
                element.classList.add("fillter_select_event");

                //화살표 생성
                let newElement = element.appendChild(createArrow);
                newElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="svg fillter_select_arrow" viewBox="0 0 10 8"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-320.000000, -202.000000)" stroke="currentColor" stroke-width="2"><polyline points="321 205.569101 323.596499 208 329 203"></polyline></g></g></svg>`;
                resetEvent.style.display = "block";
                ++count;
                

                select_Fillter_array.push(fillter_property);

                
                
            }else
            {
                element.removeChild(createArrow)
                element.classList.remove("fillter_select_event");
                --count;
                if (count == 0) {
                    resetEvent.style.display = "none";
                }


                select_Fillter_array = select_Fillter_array.filter((e) => e !== fillter_property);
            }

            showHideContent(browse_items);

            
        });
    });

    //필터 숨기기 보이기 이벤트
    const child = document.querySelectorAll(".fillter_item")
    child.forEach(element => {

        const fillter_btn = element.querySelector(".fillter_btn");
        const fillter_item_child =  element.querySelector(".fillter_item_child");
        const arrow =  element.querySelector(".arrow");

        fillter_item_child.classList.add("hide_menu");

        fillter_btn.addEventListener("click",() =>{
           
            //스타일이 하나만 적용 되어있으면 hide_menu 스타일 적용하고 태그 추가
            if (fillter_item_child.classList == "fillter_item_child") {
                fillter_item_child.classList.add("hide_menu")
                arrow.innerHTML = `<path d="M19.53 8.97a.75.75 0 0 1 0 1.06L12 17.56l-7.53-7.53a.75.75 0 1 1 1.06-1.06L12 15.44l6.47-6.47a.75.75 0 0 1 1.06 0" 
                                clip-rule="evenodd" fill-rule="evenodd">

                                </path>`;
            }else{
                //heide_menu 스타일이 적용되어있으면 스타일 제거
                fillter_item_child.classList.remove("hide_menu")
                arrow.innerHTML = `<path d="m12 6.44 7.53 7.53a.75.75 0 1 1-1.06 1.06L12 8.562l-6.47 6.47a.75.75 0 0 1-1.06-1.06z" 
                                clip-rule="evenodd" fill-rule="evenodd">

                                </path>`;
            }
              
        });

    });


    //필터 리셋버튼 이벤트
    resetEvent.addEventListener("click", () => {

        //화살표 삭제
        fillter_select.forEach(element => {
            const createArrow = element.querySelector(".fillter_select_arrow");
            
            if (createArrow != null) {
                createArrow.remove()
                element.classList.remove("fillter_select_event");
            }
            
        });
        count=0;
        resetEvent.style.display = "none";

    });





    // const slide_box = document.getElementById("slide_box");
    // const slide_left_btn = document.getElementById("slide_left_btn");
    // const slide_right_btn = document.getElementById("slide_right_btn");
    // slide_left_btn.addEventListener("click", ()=> {

    //     slide_box.scrollLeft -= slide_box.offsetWidth;

    // });
    // slide_right_btn.addEventListener("click", ()=> {
       

    //     slide_box.scrollLeft += slide_box.offsetWidth;

    // });

    // slide_box.addEventListener("wheel", (element) =>{
    //     if (slide_box.focus) {
    //         element.preventDefault();
    //         slide_box.scrollLeft += element.deltaY * 10;
    //     }
    // });


    // slide_box.addEventListener("click", (element) =>{

    // })


    // let isDown = false;
    // let startX;
    // let scrollLeft;

    // slide_box.addEventListener("mousedown", (e) => {
    //     isDown = true;
        
    //     startX = e.pageX - slide_box.offsetLeft;
    //     scrollLeft = slide_box.scrollLeft;
        
    // });

    // slide_box.addEventListener("mouseleave", () => {
    //     isDown = false;
       
    // });

    // slide_box.addEventListener("mouseup", () => {
    //     isDown = false;
        
    // });

    // slide_box.addEventListener("mousemove", (e) => {
        
        
    //     if (!isDown) return;
    //     e.preventDefault();
    //     const x = e.pageX - slide_box.offsetLeft;
    //     const walk = (x - startX) * 2; // 이동 거리 조정
    //     slide_box.scrollLeft = scrollLeft - walk;

        
    // });

    
});