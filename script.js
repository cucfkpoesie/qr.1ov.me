document.addEventListener('DOMContentLoaded', () => {
    const qrForm = document.getElementById('qr-form');
    const qrText = document.getElementById('qr-text');
    const qrSize = document.getElementById('qr-size');
    const qrColor = document.getElementById('qr-color');
    const qrBgColor = document.getElementById('qr-bg-color');
    const outputSection = document.getElementById('output-section');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeDiv = document.getElementById('qrcode');

    let qrCode;

    qrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = qrText.value.trim();
        if (!text) {
            alert('Please enter some text or URL.');
            return;
        }

        qrCodeDiv.innerHTML = ''; // Clear previous QR
        qrCode = new QRCode(qrCodeDiv, {
            text: text,
            width: parseInt(qrSize.value),
            height: parseInt(qrSize.value),
            colorDark: qrColor.value,
            colorLight: qrBgColor.value,
            correctLevel: QRCode.CorrectLevel.H
        });

        outputSection.classList.remove('hidden');
        // Scroll to output smoothly
        outputSection.scrollIntoView({ behavior: 'smooth' });
    });

    downloadBtn.addEventListener('click', () => {
        const canvas = qrCodeDiv.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'qrcode.png';
            link.click();
        }
    });
});