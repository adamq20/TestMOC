const registrationForm = document.getElementById('registrationForm');
const phoneInput = document.getElementById('phone');
const otpInput = document.getElementById('otp');
const verificationContainer = document.getElementById('verificationContainer');

validateAndSendOTP()

function validateAndSendOTP() {
    if (validateForm()) {
        const phone = phoneInput.value;
        const token = 'XjhGkWLRp5sqivC0yaT6';

        sendOTPViaAPI(token, phone);
        
        verificationContainer.classList.remove('hidden');
    }
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const password = document.getElementById('password').value;

    // Validasi nama
    if (name.trim() === '') {
        Swal.fire({
            text: "Nama tidak boleh kosong",
            icon: "warning"
          });
        return false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            text: "Email tidak valid",
            icon: "warning"
          });
        return false;
    }

    // Validasi nomor HP
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        Swal.fire({
            text: "Nomor HP tidak valid",
            icon: "warning"
          });
        return false;
    }

    // Validasi provinsi, kota, dan kecamatan
    if (province.trim() === '' || city.trim() === '' || district.trim() === '') {
        Swal.fire({
            text: "Provinsi, Kota, dan Kecamatan harus diisi",
            icon: "warning"
          });
        return false;
    }

    // Validasi password
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        Swal.fire({
            text: "Password harus memiliki minimal 8 karakter, terdiri dari huruf dan angka",
            icon: "warning"
          });
        return false;
    }

    return true;
}

function sendOTPViaAPI(token, phone) {
    const apiUrl = `https://wa.ikutan.my.id/send/${token}/${phone}?text=Your%20OTP%20is:`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        Swal.fire({
            text: data,
            icon: "info"
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function verifyOTP() {
    const enteredOTP = otpInput.value;

    if (verificationSuccess) {
        Swal.fire({
            icon: 'success',
            title: 'Verifikasi Berhasil!',
            text: 'Selamat, registrasi Anda berhasil!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Verifikasi Gagal!',
            text: 'Maaf, OTP yang Anda masukkan salah.'
        });
    }
}