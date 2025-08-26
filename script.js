document.addEventListener('DOMContentLoaded', () => {
    const qrForm = document.getElementById('qr-form');
    const qrText = document.getElementById('qr-text');
    const qrSize = document.getElementById('qr-size');
    const qrColor = document.getElementById('qr-color');
    const qrBgColor = document.getElementById('qr-bg-color');
    const qrStyle = document.getElementById('qr-style');
    const qrLogo = document.getElementById('qr-logo');
    const outputSection = document.getElementById('output-section');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeDiv = document.getElementById('qrcode');

    let qrCode;
    let logoUrl;

    qrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = qrText.value.trim();
        if (!text) {
            alert('Please enter some text or URL.');
            return;
        }

        const size = parseInt(qrSize.value);
        const foregroundColor = qrColor.value;
        const backgroundColor = qrBgColor.value;
        const style = qrStyle.value;

        let dotsType = 'square';
        let cornersSquareType = 'square';
        let cornersDotType = 'square';

        if (style === 'rounded') {
            dotsType = 'extra-rounded';
            cornersSquareType = 'extra-rounded';
            cornersDotType = 'square';
        } else if (style === 'dots') {
            dotsType = 'dots';
            cornersSquareType = 'dot';
            cornersDotType = 'dot';
        }

        // Handle logo
        const logoFile = qrLogo.files[0];
        if (logoFile) {
            if (logoUrl) URL.revokeObjectURL(logoUrl);
            logoUrl = URL.createObjectURL(logoFile);
        } else {
            logoUrl = '';
        }

        qrCodeDiv.innerHTML = ''; // Clear previous QR

        qrCode = new QRCodeStyling({
            width: size,
            height: size,
            data: text,
            dotsOptions: {
                color: foregroundColor,
                type: dotsType
            },
            cornersSquareOptions: {
                color: foregroundColor,
                type: cornersSquareType
            },
            cornersDotOptions: {
                color: foregroundColor,
                type: cornersDotType
            },
            backgroundOptions: {
                color: backgroundColor
            },
            image: logoUrl || undefined,
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: 10,
                imageSize: 0.4,
                hideBackgroundDots: true
            },
            qrOptions: {
                errorCorrectionLevel: 'H'
            }
        });

        qrCode.append(qrCodeDiv);

        outputSection.classList.remove('hidden');
        // Scroll to output smoothly
        outputSection.scrollIntoView({ behavior: 'smooth' });
    });

    downloadBtn.addEventListener('click', () => {
        if (qrCode) {
            qrCode.download({ name: 'qrcode', extension: 'png' });
        }
    });
});