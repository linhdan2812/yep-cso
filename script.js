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

// Danh sách tên file chuẩn (case-sensitive như tên file thật)
const nameMapping = {
    'akeo': 'Akeo',
    'đức': 'Đức',
    'duc': 'Đức',
    'gun': 'Gun',
    'lee': 'Lee',
    'makoto': 'Makoto',
    'yuri': 'Yuri'
};

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

    // Chuyển về chữ thường để so sánh
    const nameLower = name.toLowerCase();

    // Tìm tên chuẩn từ mapping
    const standardName = nameMapping[nameLower] || name;

    console.log(`Input: "${name}" -> Tên chuẩn: "${standardName}"`);

    // Thử nhiều cách để tạo đường dẫn ảnh với tên chuẩn
    const imagePaths = [
        `images/${standardName}.png`,                    // Thử đường dẫn trực tiếp với tên chuẩn
        `images/${encodeURIComponent(standardName)}.png`, // Thử với encoding
        `./images/${standardName}.png`                   // Thử với ./
    ];

    let currentPathIndex = 0;

    function tryLoadImage() {
        if (currentPathIndex >= imagePaths.length) {
            // Không tìm thấy ảnh với bất kỳ đường dẫn nào
            console.error('Không tìm thấy ảnh với tất cả các đường dẫn đã thử');
            errorName.textContent = name;
            inputSection.classList.add('hidden');
            resultSection.classList.add('hidden');
            errorSection.classList.remove('hidden');
            return;
        }

        const img = new Image();
        const imagePath = imagePaths[currentPathIndex];
        console.log(`Đang thử đường dẫn [${currentPathIndex + 1}/${imagePaths.length}]:`, imagePath);

        img.onload = function() {
            // Ảnh tồn tại - hiển thị kết quả
            console.log('✅ Thành công! Đường dẫn hoạt động:', imagePath);
            resultImage.src = imagePath;
            resultName.textContent = `Trân trọng và biết ơn ${standardName} đã có mặt tại đây`;

            inputSection.classList.add('hidden');
            errorSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        };

        img.onerror = function() {
            // Thử đường dẫn tiếp theo
            console.warn('❌ Thất bại với đường dẫn:', imagePath);
            currentPathIndex++;
            tryLoadImage();
        };

        img.src = imagePath;
    }

    tryLoadImage();
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