// Xây dựng interface Feedback
interface Feedback {
    id:number;
    name:string;
    score: number;
}

// Xây dựng lớp FeedbackMenu
class FeedbackMenu {
    feedbackList: Feedback[] = [];
    
    constructor(_feedbackList: Feedback[]) {
        this.feedbackList = _feedbackList;
    }


    renderFeedback(): void {
        this.feedbackList.forEach(feedback => {
            const element = document.getElementById(feedback.name) as HTMLElement;
            if (element) {
                element.onclick = () => {
                    // Điều chỉnh hành động khi một phản hồi được chọn
                    console.log(`Selected feedback: ${feedback.name}`);
                    (document.getElementById("content") as HTMLElement).innerHTML = feedback.name;
                }
            }

        });
    }       
    createFeedback(newFeedback: Feedback): void {
        this.feedbackList.push(newFeedback);
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('feedbackList', JSON.stringify(this.feedbackList));
    }

    updateFeedback(updatedFeedback: Feedback): void {
        // Tìm và cập nhật phản hồi trong danh sách
        const index = this.feedbackList.findIndex(feedback => feedback.id === updatedFeedback.id);
        if (index !== -1) {
            this.feedbackList[index] = updatedFeedback;
            // Lưu dữ liệu vào localStorage
            localStorage.setItem('feedbackList', JSON.stringify(this.feedbackList));
        }
    }

    deleteFeedback(id: number): void {
        // Xóa phản hồi khỏi danh sách
        this.feedbackList = this.feedbackList.filter(feedback => feedback.id !== id);
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('feedbackList', JSON.stringify(this.feedbackList));
    }
}

// Khởi tạo 1 mảng rỗng để chứa các nội dung feedback từ localStorage
const localStorageFeedbackList: Feedback[] = JSON.parse(localStorage.getItem('feedbackList') || '[]');

// Khởi tạo đối tượng FeedbackMenu
const feedbackMenu = new FeedbackMenu(localStorageFeedbackList);
feedbackMenu.renderFeedback();

(document.getElementById("submitBtn") as HTMLElement).onclick = function() {
    const newFeedbackName = (document.getElementById("input") as HTMLInputElement).value;
    const newFeedback: Feedback = {
        id: getNewId(),
        name: newFeedbackName,
        score: 0
    };
    feedbackMenu.createFeedback(newFeedback);
    feedbackMenu.renderFeedback();
}



const getNewId = ():number => {
    let maxId = 0
    feedbackMenu.feedbackList.forEach(e => {
        if(e.id > maxId) {
            maxId = e.id
        }

    })
    return maxId + 1;
}


// Hiển thị các ô mức độ đánh giá
let degreeList: Feedback[] = [
    {id: 1, name:"1", score:1},{id: 2, name:"2", score:2},{id: 3, name:"3", score:3},{id: 4, name:"4", score:4},{id: 5, name:"5", score:5},
    {id: 6, name:"6", score:6},{id: 7, name:"7", score:7},{id: 8, name:"8", score:8},{id: 9, name:"9", score:9},{id: 10, name:"10", score:10}
]
const degreeNumber = ():void => {
    let html:string = degreeList.reduce((temp:string,degree:Feedback):string => {
        return temp += `
        <li class="page-item" aria-current="page" id="${degree.id}">
           <span class="page-link">${degree.name}</span>
        </li> `   
    },"");
    (document.getElementById("degree") as HTMLElement).innerHTML = html;
}
degreeNumber(); 



