// src/js/engine.js
let hari = 1;
let uang = 0;
const targetSepeda = 100000;
const uangJajanHarian = 20000;
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
    
    uang += uangJajanHarian;
    updateTampilan();

    eventSekarang = daftarEvent[hari - 1] || daftarEvent[0];

    document.getElementById('game-emoji').innerText = eventSekarang.emoji;
    document.getElementById('game-title').innerText = `Hari ${hari}: ${eventSekarang.title}`;
    document.getElementById('game-text').innerText = `Kamu dapat uang jajan harian +Rp 20.000.\n\nTantangan:\n${eventSekarang.text}`;
    
    document.getElementById('btn-opsi1').innerText = eventSekarang.opsi1;
    document.getElementById('btn-opsi2').innerText = eventSekarang.opsi2;
}

function pilihOpsi(nomorOpsi) {
    let biaya = (nomorOpsi === 1) ? eventSekarang.biayaOpsi1 : eventSekarang.biayaOpsi2;

    // Logika khusus denda
    if(eventSekarang.emoji === "✏️" && nomorOpsi === 2) {
        biaya = 5000; 
        alert(eventSekarang.catatanOpsi2);
    }

    uang -= biaya;
    hari++;
    
    updateTampilan();
    mulaiHariBaru();
}

function selesaiGame() {
    document.getElementById('btn-opsi1').style.display = 'none';
    document.getElementById('btn-opsi2').style.display = 'none';
    document.getElementById('txt-hari').innerText = "Selesai";

    if (uang >= targetSepeda) {
        document.getElementById('game-emoji').innerText = "🎉🏆🚲";
        document.getElementById('game-title').innerText = "Hebat! Kamu Menang!";
        document.getElementById('game-text').innerHTML = `Tabungan: <b>Rp ${uang.toLocaleString('id-ID')}</b>.<br><br>Kamu berhasil membeli Sepeda! Kamu pintar mengatur keuangan.`;
    } else {
        document.getElementById('game-emoji').innerText = "😢🚲❌";
        document.getElementById('game-title').innerText = "Wah, Belum Cukup";
        document.getElementById('game-text').innerHTML = `Tabungan: <b>Rp ${uang.toLocaleString('id-ID')}</b>.<br><br>Kamu gagal membeli sepeda. Yuk belajar hemat lagi!`;
    }

    const wadahTombol = document.querySelector('.p-4');
    wadahTombol.innerHTML = `
        <button onclick="location.reload()" class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow mb-2">🔄 Main Lagi</button>
        <a href="index.html" class="block text-center text-sm text-blue-500 font-semibold">Keluar Ke Menu</a>
    `;
}

// Jalankan saat load
window.onload = mulaiHariBaru;
