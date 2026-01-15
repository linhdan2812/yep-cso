// Lấy các elements
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');

const nameInput = document.getElementById('nameInput');
const searchBtn = document.getElementById('searchBtn');
const backBtn = document.getElementById('backBtn');
const retryBtn = document.getElementById('retryBtn');

const resultImage = document.getElementById('resultImage');
const resultName = document.getElementById('resultName');
const errorName = document.getElementById('errorName');
const errorMessage = document.getElementById('errorMessage');

// Hàm tìm kiếm ảnh
function searchImage() {
    const name = nameInput.value.trim();

    // Ẩn thông báo lỗi trước
    errorMessage.classList.add('hidden');

    if (name === '') {
        errorMessage.classList.remove('hidden');
        nameInput.focus();
        return;
    }

    // Tạo đường dẫn đến ảnh
    const imagePath = `images/${name}.png`;

    // Kiểm tra ảnh có tồn tại không
    const img = new Image();

    img.onload = function() {
        // Ảnh tồn tại - hiển thị kết quả
        resultImage.src = imagePath;
        resultName.textContent = `Trân trọng và biết ơn ${name} đã có mặt tại đây`;

        inputSection.classList.add('hidden');
        errorSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    };

    img.onerror = function() {
        // Ảnh không tồn tại - hiển thị lỗi
        errorName.textContent = name;

        inputSection.classList.add('hidden');
        resultSection.classList.add('hidden');
        errorSection.classList.remove('hidden');
    };

    img.src = imagePath;
}

// Hàm quay lại màn hình tìm kiếm
function backToSearch() {
    nameInput.value = '';
    errorMessage.classList.add('hidden');

    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    inputSection.classList.remove('hidden');

    nameInput.focus();
}

// Event listeners
searchBtn.addEventListener('click', searchImage);
backBtn.addEventListener('click', backToSearch);
retryBtn.addEventListener('click', backToSearch);

// Cho phép nhấn Enter để tìm kiếm
nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchImage();
    }
});

// Ẩn thông báo lỗi khi người dùng bắt đầu nhập
nameInput.addEventListener('input', function() {
    if (nameInput.value.length > 0) {
        errorMessage.classList.add('hidden');
    }
});

// Focus vào input khi trang load
window.addEventListener('load', function() {
    nameInput.focus();
});