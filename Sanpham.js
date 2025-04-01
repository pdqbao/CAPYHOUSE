
localStorage.removeItem('cart');
arr = [];
document.getElementById('sosp').innerText = 0;
console.log("Giỏ hàng đã được xóa");
var arr = JSON.parse(localStorage.getItem('cart')) || [];
function themvaogio(id, tensp, gia, hinh) {
    var TTSP = false;
    for (var i = 0; i < arr.length; i++) {
        var sp = arr[i];
        if (sp.id == id) {
            sp.quantity++;
            TTSP = true;
            break;
        }
    }
    if (!TTSP) {
        alert("Đã thêm vào giỏ hàng.");
            arr.push({ 
                id: id,
                tensp: tensp,
                gia: gia,
                hinh: hinh,
                quantity: 1
    });
    }else alert("Giỏ hàng của bạn đã tồn tại sản phẩm này.");
    document.getElementById('sosp').innerText = arr.reduce((total, item) => total + item[4], 0);
    localStorage.setItem('cart', JSON.stringify(arr));
    console.log(arr);
}
