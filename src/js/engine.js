// src/js/engine.js
let hari = 1;
let uang = 0;
let targetSepeda = 100000;
let uangJajanHarian = 20000;
let eventSekarang = {};

function updateTampilan() {
    document.getElementById('txt-hari').innerText = hari;
    document.getElementById('txt-uang').innerText = "Rp " + uang.toLocaleString('id-ID');
}

function mulaiHariBaru() {
    if (hari > 7) {
        selesaiGame();
        return;
    }
    
    // Berikan uang jajan harian terlebih dahulu
    uang += uangJajanHarian;
    updateTampilan();

    // Ambil event acak dari daftar tantangan
    eventSekarang = daftarEvent[hari - 1] || daftarEvent[0];

    // Pasang teks ke layar
    document.getElementById('game-emoji').innerText = eventSekarang.emoji;
    document.getElementById('game-title').innerText = `Hari ${hari}: ${eventSekarang.title}`;
    document.getElementById('game-text').innerText = `Kamu dapat uang jajan harian +Rp 20.000.\n\nTantangan Hari Ini:\n${eventSekarang.text}`;
    
    document.getElementById('btn-opsi1').innerText = eventSekarang.opsi1;
    document.getElementById('btn-opsi2').innerText = eventSekarang.opsi2;
}

function pilihOpsi(nomorOpsi) {
    let biaya = 0;
    if (nomorOpsi === 1) {
        biaya = eventSekarang.biayaOpsi1;
    } else {
        biaya = eventSekarang.biayaOpsi2;
        // Kasus khusus denda jika mengabaikan kebutuhan dasar (Pensil)
        if(eventSekarang.emoji === "✏️" && nomorOpsi === 2) {
            biaya = 5000; 
            alert(eventSekarang.catatanOpsi2);
        }
    }

    uang -= biaya;
    hari++;
    
    updateTampilan();
    mulaiHariBaru();
}

function selesaiGame() {
    // Sembunyikan tombol pilihan
    document.getElementById('btn-opsi1').style.display = 'none';
    document.getElementById('btn-opsi2').style.display = 'none';

    document.getElementById('txt-hari').innerText = "Selesai";

    if (uang >= targetSepeda) {
        document.getElementById('game-emoji').innerText = "🎉🏆🚲";
        document.getElementById('game-title').innerText = "Hebat! Kamu Menang!";
        document.getElementById('game-text').innerHTML = `Sisa uang tabunganmu: <b>Rp ${uang.toLocaleString('id-ID')}</b>.<br><br>Kamu berhasil membeli Sepeda Impian! Kamu pintar membedakan Kebutuhan dan Keinginan.`;
    } else {
        document.getElementById('game-emoji').innerText = "😢🚲❌";
        document.getElementById('game-title').innerText = "Wah, Uangmu Belum Cukup";
        document.getElementById('game-text').innerHTML = `Uangmu hanya terkumpul: <b>Rp ${uang.toLocaleString('id-ID')}</b> dari target Rp 100.000.<br><br>Kamu gagal membeli sepeda karena terlalu banyak membeli <b>Keinginan</b> daripada menghemat <b>Kebutuhan</b>. Yuk coba lagi!`;
    }

    // Tambah tombol reset/main lagi
    const wadahTombol = document.querySelector('.p-4');
    wadahTombol.innerHTML = `<button onclick="window.location.reload()" class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow">🔄 Main Lagi</button>
                             <a href="index.html" class="block text-center text-sm text-blue-500 font-semibold mt-2">Keluar Menu Utama</a>`;
}

// Jalankan game pertama kali saat halaman dimuat
mulaiHariBaru();
