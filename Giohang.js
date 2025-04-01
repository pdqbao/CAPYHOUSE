let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsELE = document.querySelector('.Giohang');
let TTbandau = document.querySelector('.TTien');
let Tienapma = document.querySelector('.v539_533');

// Hiển thị giỏ hàng
function renderUI(arr) {
    productsELE.innerHTML = '';
    if (arr.length == 0) {
        productsELE.innerHTML = '<h1>Không có sản phẩm nào trong giỏ hàng.</h1>';
        return;
    }

    arr.forEach(p => {
        productsELE.innerHTML += `
            <div class="KhungGiohang">
                <div class="KhunganhSP"><img src="${p.hinh}" alt=""/>
                </div>
                <span class="TenGH">${p.tensp}</span>
                <span class="Giaban">${convertMoney(p.gia)}</span>
                <div class="Tensl">Số lượng: <span>${p.quantity}</span></div>
                <input type="number" class="quantity" min="1" value="${p.SLuong}" onchange="changeTotalProduct(${p.id}, event)">
                <button onclick="removeItem(${p.id})">Xóa</button>
            </div>
        `;
    });
    updateTotalMoney(arr);
}

// Cập nhật tổng tiền
function updateTotalMoney(arr) {
    let totalMoney = 0;
    arr.forEach(p => {
        totalMoney += p.gia * p.quantity;
    });
    let discount = checkPromotion();
    let discountedTotal = totalMoney - (totalMoney * discount / 100);
    TTbandau.innerText = convertMoney(totalMoney);
    Tienapma.innerText = convertMoney(discountedTotal);
}

// Kiểm tra mã giảm giá
function checkPromotion() {
    const promotionCodes = { A: 10, B: 20, C: 30, D: 40 };
    const inputCode = document.querySelector('#Giamgia').value;
    return promotionCodes[inputCode] || 0;
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderUI(cart);
}

// Thay đổi số lượng sản phẩm
function changeTotalProduct(id, event) {
    let newValue = parseInt(event.target.value);
    if (isNaN(newValue) || newValue <= 0) {
        alert("Số lượng phải là số lớn hơn 0.");
        event.target.value = 1;
        newValue = 1;
    }
    cart.forEach(item => {
        if (item.id === id) {
            item.SLuong = newValue;
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    renderUI(cart);
}

// Chuyển đổi tiền tệ
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// Hiển thị giỏ hàng khi tải trang
window.onload = () => renderUI(cart);
